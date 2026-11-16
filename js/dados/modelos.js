// O plano do Bruno dentro do app: fases, treinos por dias da semana e cardio.
// Fonte: docs/treino-hipertrofia-bruno.md (seções "Regras do plano",
// "Opções por dias na semana" e "Primeiras 12 semanas").
//
// As tabelas abaixo trazem as séries da fase 2 (Construção, semanas 5 a 8).
// O gerador ajusta para a fase: Readaptação = 2 séries em tudo; Hipertrofia =
// +1 série nos 3 primeiros compostos (até 4); semana de alívio = metade.

export const FASES = [
  { id: 'adaptacao', nome: 'Readaptação', semanas: 4, sobrando: 3, foco: 'Técnica e hábito', resumo: '2 séries por exercício, 3 repetições sobrando' },
  { id: 'construcao', nome: 'Construção', semanas: 4, sobrando: 2, foco: 'Volume e cargas', resumo: 'Séries do plano, 2 repetições sobrando' },
  { id: 'consolidacao', nome: 'Hipertrofia', semanas: 4, sobrando: 1, foco: 'Volume alto e esforço', resumo: 'Uma série a mais nos 3 primeiros compostos, 1 a 2 sobrando' },
  { id: 'leve', nome: 'Semana de alívio', semanas: 1, sobrando: 2, foco: 'Respiro antes da próxima rodada', resumo: 'Mesmas cargas, metade das séries, sem tiros' },
];

export function buscarFase(id) {
  return FASES.find((fase) => fase.id === id) ?? FASES[1];
}

// Semana 13 de alívio e, depois dela, uma nova rodada começa pela Construção.
export const PROXIMA_FASE = { adaptacao: 'construcao', construcao: 'consolidacao', consolidacao: 'leve', leve: 'construcao' };

// Atalho: x('supino-halteres', 3, 8, 12). Exercícios em segundos usam min e
// max em segundos. O extra "semana5" é o exercício que entra no lugar deste a
// partir da semana 5 (fases Construção, Hipertrofia e alívio): agachamento
// livre com barra, supino reto com barra, afundo búlgaro e barra fixa só
// liberam depois da readaptação.
const x = (id, series, min, max, extras = {}) => ({ id, series, min, max, ...extras });

// Treinos do plano, cada um com o nome, o foco, o cardio do dia e os
// exercícios na ordem. A letra da anilha não vem daqui: ela sai da posição do
// treino na semana (ver LETRAS em gerador.js).
const TREINOS = {
  // Corpo inteiro (1 a 3 dias).
  'inteiro-a': {
    nome: 'Treino A', foco: 'Corpo inteiro: agachamento, supino e puxada', cardio: [10, 20], ritmo: 'moderado',
    linhas: [
      x('agachamento-goblet', 3, 8, 12, { semana5: 'agachamento-livre' }),
      x('supino-halteres', 3, 8, 12),
      x('puxada-frente', 3, 8, 12),
      x('mesa-flexora', 3, 10, 15),
      x('elevacao-lateral', 3, 12, 15),
      x('triceps-polia', 2, 10, 15),
      x('rosca-direta', 2, 10, 15),
      x('prancha', 3, 30, 45),
    ],
  },
  'inteiro-b': {
    nome: 'Treino B', foco: 'Corpo inteiro: stiff, desenvolvimento e remada', cardio: [10, 20], ritmo: 'moderado',
    linhas: [
      x('stiff', 3, 8, 12),
      x('desenvolvimento-halteres', 3, 8, 12),
      x('remada-baixa', 3, 8, 12),
      x('leg-press', 3, 8, 12),
      x('crucifixo-maquina', 2, 10, 15),
      x('rosca-martelo', 2, 10, 15),
      x('panturrilha-pe', 3, 10, 15),
      x('pallof', 2, 10, 12),
    ],
  },
  'inteiro-c': {
    nome: 'Treino C', foco: 'Corpo inteiro: pernas, inclinado e remada unilateral', cardio: [10, 20], ritmo: 'moderado',
    linhas: [
      x('agachamento-smith', 3, 8, 12, { semana5: 'agachamento-bulgaro' }),
      x('supino-inclinado-halteres', 3, 8, 12),
      x('remada-unilateral', 3, 8, 12),
      x('elevacao-pelvica', 3, 8, 12),
      x('cadeira-extensora', 2, 10, 15),
      x('face-pull', 2, 12, 15),
      x('triceps-frances', 2, 10, 15),
      x('abdominal-polia', 2, 10, 15),
    ],
  },
  // Treino único da semana de exceção (1 dia): o corpo todo de uma vez.
  'inteiro-unico': {
    nome: 'Treino único', foco: 'Corpo inteiro em um dia', cardio: [10, 20], ritmo: 'moderado',
    linhas: [
      x('agachamento-goblet', 3, 8, 12, { semana5: 'agachamento-livre' }),
      x('supino-halteres', 3, 8, 12),
      x('remada-baixa', 3, 8, 12),
      x('stiff', 3, 8, 12),
      x('desenvolvimento-halteres', 3, 8, 12),
      x('puxada-frente', 3, 8, 12),
      x('leg-press', 3, 8, 12),
      x('elevacao-lateral', 3, 12, 15),
      x('rosca-direta', 2, 10, 15),
      x('triceps-polia', 2, 10, 15),
    ],
  },

  // Inferior e superior (4 dias).
  'inferior-a': {
    nome: 'Inferior A', foco: 'Pernas: agachamento, stiff e quadríceps', cardio: [10, 15], ritmo: 'leve',
    linhas: [
      x('agachamento-goblet', 3, 8, 12, { semana5: 'agachamento-livre' }),
      x('stiff', 3, 8, 12),
      x('hack-machine', 3, 8, 12),
      x('mesa-flexora', 3, 10, 15),
      x('cadeira-extensora', 2, 10, 15),
      x('panturrilha-pe', 3, 10, 15),
      x('prancha', 3, 30, 45),
    ],
  },
  'superior-a': {
    nome: 'Superior A', foco: 'Peito, costas, ombro e braço', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('supino-halteres', 3, 8, 12, { semana5: 'supino-barra' }),
      x('puxada-frente', 3, 8, 12),
      x('desenvolvimento-halteres', 3, 8, 12),
      x('remada-baixa', 3, 8, 12),
      x('elevacao-lateral', 3, 12, 15),
      x('triceps-polia', 3, 10, 15),
      x('rosca-direta', 3, 10, 15),
    ],
  },
  'inferior-b': {
    nome: 'Inferior B', foco: 'Pernas: leg press, glúteo e posterior', cardio: [10, 15], ritmo: 'leve',
    linhas: [
      x('leg-press', 3, 8, 12),
      x('agachamento-smith', 3, 8, 12, { semana5: 'agachamento-bulgaro' }),
      x('elevacao-pelvica', 3, 8, 12),
      x('cadeira-flexora', 3, 10, 15),
      x('cadeira-extensora', 3, 10, 15),
      x('panturrilha-sentada', 3, 12, 15),
      x('pallof', 2, 10, 12),
    ],
  },
  'superior-b': {
    nome: 'Superior B', foco: 'Peito inclinado, costas e braço', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('supino-inclinado-halteres', 3, 8, 12),
      x('puxada-frente', 3, 8, 12, { semana5: 'barra-fixa' }),
      x('remada-unilateral', 3, 8, 12),
      x('crucifixo-maquina', 3, 10, 15),
      x('elevacao-lateral', 3, 12, 15),
      x('face-pull', 2, 12, 15),
      x('rosca-martelo', 2, 10, 15),
      x('triceps-frances', 2, 10, 15),
    ],
  },

  // Empurrar, puxar e pernas (5 e 6 dias).
  'empurrar-a': {
    nome: 'Empurrar A', foco: 'Peito, ombro e tríceps', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('supino-halteres', 3, 8, 12, { semana5: 'supino-barra' }),
      x('desenvolvimento-halteres', 3, 8, 12),
      x('supino-inclinado-halteres', 3, 8, 12),
      x('elevacao-lateral', 3, 12, 15),
      x('triceps-polia', 3, 10, 15),
      x('prancha', 2, 30, 45),
    ],
  },
  'puxar-a': {
    nome: 'Puxar A', foco: 'Costas e bíceps', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('puxada-frente', 3, 8, 12),
      x('remada-baixa', 3, 8, 12),
      x('remada-unilateral', 3, 8, 12),
      x('face-pull', 3, 12, 15),
      x('rosca-direta', 3, 10, 15),
      x('rosca-martelo', 2, 10, 15),
    ],
  },
  'pernas-a': {
    nome: 'Pernas A', foco: 'Pernas e glúteo', cardio: [10, 15], ritmo: 'leve',
    linhas: [
      x('agachamento-goblet', 3, 8, 12, { semana5: 'agachamento-livre' }),
      x('stiff', 3, 8, 12),
      x('leg-press', 3, 8, 12),
      x('mesa-flexora', 3, 10, 15),
      x('panturrilha-pe', 3, 10, 15),
      x('abdominal-polia', 2, 10, 15),
    ],
  },
  'empurrar-b': {
    nome: 'Empurrar B', foco: 'Peito, ombro e tríceps', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('supino-halteres', 3, 8, 12),
      x('supino-inclinado-maquina', 3, 8, 12),
      x('crucifixo-maquina', 3, 10, 15),
      x('elevacao-lateral-polia', 3, 12, 15),
      x('triceps-frances', 3, 10, 15),
      x('pallof', 2, 10, 12),
    ],
  },
  'puxar-b': {
    nome: 'Puxar B', foco: 'Costas e bíceps', cardio: [15, 20], ritmo: 'moderado',
    linhas: [
      x('puxada-frente', 3, 8, 12, { semana5: 'barra-fixa' }),
      x('remada-maquina', 3, 8, 12),
      x('crucifixo-inverso', 3, 12, 15),
      x('rosca-polia', 3, 10, 15),
      x('rosca-martelo', 2, 10, 15),
    ],
  },
  'pernas-b': {
    nome: 'Pernas B', foco: 'Pernas e glúteo', cardio: [10, 15], ritmo: 'leve',
    linhas: [
      x('agachamento-smith', 3, 8, 12, { semana5: 'agachamento-bulgaro' }),
      x('elevacao-pelvica', 3, 8, 12),
      x('hack-machine', 3, 8, 12),
      x('cadeira-extensora', 3, 10, 15),
      x('cadeira-flexora', 3, 10, 15),
      x('panturrilha-sentada', 3, 12, 15),
    ],
  },

  // Dia a mais só de cardio: a caminhada dos dias sem academia.
  'caminhada-longa': {
    nome: 'Caminhada longa', foco: 'Cardio do dia sem academia', cardio: [30, 40], ritmo: 'moderado', linhas: [],
  },
};

// Opções por dias na semana (tabela "Opções por dias na semana" do plano).
//
// - intervalado: treino que leva os tiros de 1 minuto, 1 vez por semana, da
//   semana 5 em diante. Nunca num dia de pernas. Com 1 a 3 dias todo treino
//   tem perna, então os tiros ficam para um dia sem academia.
// - intervaladoExtra: o 2º intervalado da semana, só na fase de Hipertrofia.
// - maisSeries: quantos exercícios do começo levam 1 série a mais (a opção de
//   2 dias compensa o volume da semana nos 4 primeiros).
export const OPCOES = {
  1: {
    sequencia: ['inteiro-unico'], tempo: '1h45', cardio: [10, 20], intervalado: null, intervaladoExtra: null, maisSeries: 0,
    nome: 'Corpo inteiro, 1 treino', descricao: 'Semana de exceção: segura o ritmo, mas rende pouco. Cada músculo 1x na semana.',
  },
  2: {
    sequencia: ['inteiro-a', 'inteiro-b'], tempo: '1h30', cardio: [10, 20], intervalado: null, intervaladoExtra: null, maisSeries: 4,
    nome: 'Corpo inteiro em 2 treinos', descricao: 'Para semanas corridas: A e B trabalham o corpo todo, com 1 série a mais nos 4 primeiros exercícios.',
  },
  3: {
    sequencia: ['inteiro-a', 'inteiro-b', 'inteiro-c'], tempo: '1h20', cardio: [10, 20], intervalado: null, intervaladoExtra: null, maisSeries: 0,
    nome: 'Corpo inteiro em 3 treinos', descricao: 'É o jeito de começar: A, B e C trabalham o corpo todo, cada músculo 3x na semana.',
  },
  4: {
    sequencia: ['inferior-a', 'superior-a', 'inferior-b', 'superior-b'], tempo: '1h15', cardio: [10, 20], intervalado: 'superior-b', intervaladoExtra: 'superior-a', maisSeries: 0,
    nome: 'Inferior e superior', descricao: 'A partir da semana 5: dois treinos de perna e dois de tronco, alternados. Cada músculo 2x na semana.',
  },
  5: {
    sequencia: ['superior-a', 'inferior-a', 'empurrar-b', 'puxar-b', 'pernas-b'], tempo: '1h05', cardio: [10, 20], intervalado: 'puxar-b', intervaladoExtra: 'empurrar-b', maisSeries: 0,
    nome: 'Superior, inferior e empurrar, puxar e pernas', descricao: 'Da semana 9 em diante, se a recuperação estiver boa. Cada músculo 2x na semana.',
  },
  6: {
    sequencia: ['empurrar-a', 'puxar-a', 'pernas-a', 'empurrar-b', 'puxar-b', 'pernas-b'], tempo: '1h', cardio: [10, 20], intervalado: 'puxar-b', intervaladoExtra: 'empurrar-a', maisSeries: 0,
    nome: 'Empurrar, puxar e pernas 2x', descricao: 'Só com sono e recuperação em dia, e sempre com 1 dia de descanso.',
  },
};

// Dias a mais na semana. Depois que ele faz os treinos da semana, o botão
// "Adicionar treino" do Início traz o próximo desta ordem, conforme os dias
// do ciclo: o treino que o plano acrescentaria ao subir um dia. Com 3 dias,
// entram um Inferior e um Superior (A e B se alternam a cada vez que ele
// adiciona). A última opção de cada lista é sempre a caminhada longa, o
// cardio dos dias sem academia. O 7º dia é descanso, e o treino adicionado
// vale só para aquela semana.
const treino = (chave) => ({ chave });
const grupo = (id) => ({ grupo: id });

export const DIAS_A_MAIS = {
  1: [treino('inteiro-b'), treino('inteiro-c'), treino('inteiro-a'), treino('inteiro-b'), treino('caminhada-longa')],
  2: [treino('inteiro-c'), treino('inteiro-a'), treino('inteiro-b'), treino('caminhada-longa')],
  3: [grupo('inferior'), grupo('superior'), treino('caminhada-longa')],
  4: [treino('empurrar-b'), treino('caminhada-longa')],
  5: [treino('caminhada-longa')],
  6: [],
};

export const MAXIMO_DE_TREINOS_NA_SEMANA = 6;

// Inferior e Superior que entram como dia a mais numa semana de corpo
// inteiro: alternam A e B a cada vez que ele faz um.
export const GRUPOS_A_MAIS = {
  inferior: { nome: 'Inferior', chaves: ['inferior-a', 'inferior-b'] },
  superior: { nome: 'Superior', chaves: ['superior-a', 'superior-b'] },
};

// Dias só de cardio: não têm exercício de musculação, e o cardio vem primeiro.
export const DIAS_DE_CARDIO = {
  'caminhada-longa': {
    chave: 'longo',
    primeiro: true,
    como: 'Caminhada inclinada na esteira: 5 a 5,5 km/h com 4 a 6% de inclinação, subindo 1% por semana se estiver fácil. Sem segurar no painel.',
  },
};

// Descanso sugerido pelo plano: 2 min nos compostos e 90 s nos isolados.
export const DESCANSO = { segundos: [90, 120] };

export function buscarModelo(chave) {
  return TREINOS[chave] ?? null;
}

export function linhasDoTreino(chave) {
  return TREINOS[chave]?.linhas ?? [];
}

export function focoDoTreino(chave) {
  return TREINOS[chave]?.foco ?? '';
}

export function nomeDoModelo(chave) {
  return TREINOS[chave]?.nome ?? '';
}
