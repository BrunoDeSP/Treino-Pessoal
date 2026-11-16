import { buscarExercicio } from '../dados/exercicios.js';

// Séries de aquecimento (seção "Aquecimento" de docs/treino-hipertrofia-bruno.md).
//
// São séries **extras**: vêm antes das séries válidas do mesmo exercício e não
// substituem nenhuma delas. As válidas continuam com 100% da carga de
// trabalho. Não contam para volume, constância nem progressão, e não alteram a
// carga registrada do exercício — por isso ficam em `item.aquecimento`, fora de
// `item.series`, que é o que a progressão lê.
//
// Quem aquece: o primeiro composto de cada região (inferior e superior) do
// treino do dia. Não é um exercício fixo: como os treinos giram e a fase troca
// alguns exercícios na semana 5, o exercício aquecido muda junto.

// Séries por fase: 1 a ~50% nas semanas 1–4 e na 13; 2 (~50% e ~80%) nas 5–12.
const POR_FASE = {
  adaptacao: [{ percentual: 50, reps: 8 }],
  construcao: [{ percentual: 50, reps: 8 }, { percentual: 80, reps: 5 }],
  consolidacao: [{ percentual: 50, reps: 8 }, { percentual: 80, reps: 5 }],
  leve: [{ percentual: 50, reps: 8 }],
};

// Sem carga para calcular (peso do corpo, barra assistida ou primeira vez no
// exercício): 1 série fácil de 5 a 6 repetições.
export const REPS_SEM_CARGA = { min: 5, max: 6 };

// Entre as séries de aquecimento, cerca de 1 min. Da última até a 1ª válida
// vale a pausa normal das Configurações.
export const PAUSA_DO_AQUECIMENTO = 60;

// O exercício tem carga de trabalho registrada para calcular o percentual.
export function temCargaDeTrabalho(exercicio, carga) {
  return Boolean(exercicio) && exercicio.incremento > 0 && Number.isFinite(carga) && carga > 0;
}

export function quantasDeAquecimento(fase, comCarga = true) {
  return comCarga ? (POR_FASE[fase] ?? POR_FASE.construcao).length : 1;
}

// Índices dos exercícios que recebem aquecimento: o 1º composto de inferiores
// e o 1º de superiores. Isolados e core não aquecem — o composto anterior já
// aqueceu a região.
export function indicesComAquecimento(exercicioIds) {
  const regioes = new Set(['inferiores', 'superiores']);
  const indices = [];
  exercicioIds.forEach((id, i) => {
    const exercicio = buscarExercicio(id);
    if (exercicio?.tipo !== 'composto' || !regioes.has(exercicio.regiao)) return;
    regioes.delete(exercicio.regiao);
    indices.push(i);
  });
  return indices;
}

// Carga da série: percentual × carga de trabalho, arredondada para baixo no
// degrau do aparelho. Se ficar abaixo do menor peso, usa o menor.
export function cargaDeAquecimento(carga, percentual, incremento) {
  const degrau = incremento > 0 ? incremento : 1;
  const descida = Math.floor(((carga * percentual) / 100) / degrau) * degrau;
  return Math.round(Math.max(degrau, descida) * 100) / 100;
}

// As séries de aquecimento de um exercício na fase do ciclo.
export function seriesDeAquecimento({ exercicio, carga, fase }) {
  if (!exercicio) return [];
  if (!temCargaDeTrabalho(exercicio, carga)) {
    return [{ carga: null, reps: REPS_SEM_CARGA.min, feita: false, percentual: null }];
  }
  return (POR_FASE[fase] ?? POR_FASE.construcao).map(({ percentual, reps }) => ({
    carga: cargaDeAquecimento(carga, percentual, exercicio.incremento),
    reps,
    feita: false,
    percentual,
  }));
}
