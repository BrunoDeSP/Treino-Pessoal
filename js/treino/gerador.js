import { buscarExercicio } from '../dados/exercicios.js';
import { indicesComAquecimento, quantasDeAquecimento } from './aquecimento.js';
import {
  OPCOES,
  DIAS_DE_CARDIO,
  DESCANSO,
  DIAS_A_MAIS,
  GRUPOS_A_MAIS,
  buscarModelo,
  linhasDoTreino,
  focoDoTreino,
  nomeDoModelo,
} from '../dados/modelos.js';

// Monta os treinos de um ciclo a partir dos dias por semana e da fase.
//
// As tabelas de modelos.js trazem as séries da Construção (semanas 5 a 8).
// Aqui elas viram as da fase: Readaptação = 2 séries em tudo; Hipertrofia =
// +1 nos 3 primeiros compostos (até 4); semana de alívio = metade das séries
// da Hipertrofia. Os exercícios que entram na semana 5 (agachamento livre com
// barra, supino reto com barra, afundo búlgaro e barra fixa) só aparecem a
// partir da Construção; antes disso vale o exercício da linha.

// Cada treino da semana leva a cor de uma anilha olímpica, na ordem em que
// aparece: A vermelha, B azul, C amarela, D verde, E branca, F preta. Os dias
// a mais continuam a sequência, por isso a semana nunca repete uma cor.
const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];

const letraDaPosicao = (posicao) => LETRAS[Math.min(posicao, LETRAS.length - 1)];

// Tiros de 1 minuto: só da semana 5 em diante, e nunca na semana de alívio.
const aceitaTiros = (fase) => fase === 'construcao' || fase === 'consolidacao';

export function montarTreinos({ diasPorSemana, fase = 'construcao' }) {
  const opcao = OPCOES[diasPorSemana];
  if (!opcao) throw new Error(`Não existe plano para ${diasPorSemana} dia(s) por semana.`);
  return opcao.sequencia.map((chave, posicao) => ({
    id: letraDaPosicao(posicao),
    letra: letraDaPosicao(posicao),
    nome: nomeDoModelo(chave),
    foco: focoDoTreino(chave),
    modelo: chave,
    ...montarConteudo(chave, {
      dias: diasPorSemana,
      fase,
      intervalado: intervaladoDoTreino(chave, opcao, fase),
      maisSeries: opcao.maisSeries ?? 0,
    }),
  }));
}

// Treino de um dia a mais na semana (botão "Adicionar treino").
//
// - posicao: quantos dias a mais ele já adicionou nesta semana (0 = o primeiro).
// - vezesDoGrupo: quantos Inferiores (ou Superiores) a mais ele já fez no
//   ciclo; decide se agora é o A ou o B.
// - intervaladoLivre: a semana ainda não tem tiros (acontece de 1 a 3 dias,
//   em que todo treino tem perna e os tiros ficam para a caminhada longa).
//
// Ele é montado como se ele tivesse escolhido o novo total de dias desde o
// começo: aquecimento e séries a mais seguem esse total.
export function montarExtra({ diasPorSemana, fase = 'construcao', posicao, semana, vezesDoGrupo = 0, intervaladoLivre = false, id }) {
  const item = (DIAS_A_MAIS[diasPorSemana] ?? [])[posicao];
  if (!item) return null;
  const total = diasPorSemana + posicao + 1;
  const grupo = item.grupo ?? null;
  const chave = grupo ? GRUPOS_A_MAIS[grupo].chaves[vezesDoGrupo % 2] : item.chave;
  const opcaoDoTotal = OPCOES[total];
  // A caminhada longa é o melhor dia para os tiros: não tem perna nenhuma.
  const naCaminhada = intervaladoLivre && Boolean(DIAS_DE_CARDIO[chave]);
  const intervalado = aceitaTiros(fase)
    && (naCaminhada || (intervaladoLivre && opcaoDoTotal?.intervalado === chave) || intervaladoDoTreino(chave, opcaoDoTotal, fase));

  return {
    id,
    letra: letraDaPosicao(diasPorSemana + posicao),
    nome: nomeDoModelo(chave),
    foco: focoDoTreino(chave),
    modelo: chave,
    ...montarConteudo(chave, { dias: total, fase, intervalado, maisSeries: opcaoDoTotal?.maisSeries ?? 0 }),
    extra: { semana, posicao, grupo, origem: chave },
  };
}

// Nomes da ordem dos dias a mais, para mostrar na tela do ciclo.
export function ordemDosDiasAMais(diasPorSemana) {
  return (DIAS_A_MAIS[diasPorSemana] ?? [])
    .map((item) => (item.grupo ? GRUPOS_A_MAIS[item.grupo].nome : nomeDoModelo(item.chave)));
}

// Na fase de Hipertrofia o plano aceita um 2º dia de tiros na semana.
function intervaladoDoTreino(chave, opcao, fase) {
  if (!opcao || !aceitaTiros(fase)) return false;
  return chave === opcao.intervalado || (fase === 'consolidacao' && chave === opcao.intervaladoExtra);
}

// Exercícios, séries, aquecimento e cardio de um treino.
// - dias: dias por semana, que decidem o aquecimento geral (o dos minutos).
// - maisSeries: quantos exercícios do começo levam 1 série a mais.
function montarConteudo(chave, { dias, fase, intervalado, maisSeries = 0 }) {
  const modelo = buscarModelo(chave);
  const diaDeCardio = DIAS_DE_CARDIO[chave] ?? null;
  const linhas = linhasDoTreino(chave);
  let compostos = 0;
  const exercicios = linhas.map((linha, ordem) => {
    const exercicioId = fase !== 'adaptacao' && linha.semana5 ? linha.semana5 : linha.id;
    const exercicio = buscarExercicio(exercicioId);
    const ehComposto = exercicio?.tipo === 'composto';
    const principal = ehComposto && compostos < 3;
    if (ehComposto) compostos += 1;
    return {
      exercicioId,
      series: seriesDaFase(linha.series, fase, { principal, reforco: ordem < maisSeries }),
      alvo: { min: linha.min, max: linha.max, medida: exercicio?.medida === 'segundos' ? 'segundos' : 'reps' },
    };
  });

  // Séries de aquecimento no 1º composto de cada região (regra em
  // aquecimento.js). O número vale para quem já tem carga registrada; sem
  // carga, é sempre 1 série fácil.
  const aquece = new Set(indicesComAquecimento(exercicios.map((item) => item.exercicioId)));
  exercicios.forEach((item, i) => {
    if (aquece.has(i)) item.aquecer = quantasDeAquecimento(fase);
  });

  return {
    tipo: diaDeCardio && exercicios.length === 0 ? 'cardio' : 'musculacao',
    formato: 'series',
    voltas: null,
    descanso: DESCANSO,
    aquecimento: diaDeCardio ? null : dias <= 3 ? 10 : 5,
    cardio: {
      chave: diaDeCardio?.chave ?? 'fim',
      minutos: modelo?.cardio ?? OPCOES[dias]?.cardio ?? [10, 20],
      ritmo: modelo?.ritmo ?? 'moderado',
      intervalado,
      primeiro: Boolean(diaDeCardio?.primeiro),
      como: diaDeCardio?.como ?? null,
    },
    exercicios,
  };
}

function seriesDaFase(base, fase, { principal, reforco }) {
  if (fase === 'adaptacao') return 2;
  const comReforco = reforco ? Math.min(4, base + 1) : base;
  const hipertrofia = principal ? Math.min(4, comReforco + 1) : comReforco;
  if (fase === 'consolidacao') return hipertrofia;
  if (fase === 'leve') return Math.max(1, Math.ceil(hipertrofia / 2));
  return comReforco;
}

// Prévia usada na tela de novo ciclo.
export function resumoDoModelo(diasPorSemana) {
  const opcao = OPCOES[diasPorSemana];
  if (!opcao) return null;
  return {
    nome: opcao.nome,
    descricao: opcao.descricao,
    tempo: opcao.tempo,
    cardio: opcao.cardio,
    treinos: opcao.sequencia.map((chave, posicao) => ({
      id: letraDaPosicao(posicao),
      nome: nomeDoModelo(chave),
      foco: focoDoTreino(chave),
    })),
  };
}
