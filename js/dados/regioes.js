// Regiões do corpo usadas na aba Exercícios e os tipos de cardio, com o
// passo a passo de cada aparelho (seções "Exercícios" e "Cardio na esteira"
// de docs/treino-hipertrofia-bruno.md).

export const REGIOES = [
  { id: 'inferiores', nome: 'Inferiores', descricao: 'Pernas e glúteos', padroes: ['agachar', 'quadril', 'unilateral'] },
  { id: 'superiores', nome: 'Superiores', descricao: 'Costas, peito, ombros e braços', padroes: ['empurrar-h', 'empurrar-v', 'puxar-h', 'puxar-v'] },
  { id: 'core', nome: 'Core', descricao: 'Abdômen', padroes: ['core'] },
  { id: 'cardio', nome: 'Cardio', descricao: 'Registrado no treino', padroes: [] },
];

export function regiaoDoPadrao(padrao) {
  return REGIOES.find((regiao) => regiao.padroes.includes(padrao))?.id ?? null;
}

export function regiaoDoExercicio(exercicio) {
  return exercicio?.regiao ?? regiaoDoPadrao(exercicio?.padrao);
}

const RITMO = 'Ritmo da conversa: dá para falar frases, mas não para cantar (esforço 5 a 6 de 10).';

// onde: 'fim' = cardio no fim da musculação, 'longo' = dia de caminhada longa.
// status 'testar' e 'fora' não aparecem para escolher. A caminhada inclinada
// vem primeiro porque é o cardio principal do plano.
export const TIPOS_DE_CARDIO = [
  {
    id: 'esteira', nome: 'Caminhada inclinada na esteira', status: 'liberado', intervalado: true, onde: ['fim', 'longo'],
    dicas: [
      ['Ajuste', 'Inclinação de 4 a 6% no começo, subindo 1% por semana se estiver fácil, até 10 ou 12%. Velocidade de 5 a 5,5 km/h.'],
      ['Como fazer', 'Sem segurar no painel: o apoio tira boa parte do esforço. Tronco reto e passada normal.'],
      ['Ritmo', RITMO],
      ['Tiros', 'Da semana 5: 5 min a 5 km/h para aquecer, tiros de 1 min a 8 ou 9 km/h com 1% de inclinação, 2 min caminhando a 5 km/h entre eles e 3 a 5 min para desaquecer.'],
      ['Se pesar no joelho ou no fôlego', 'O tiro vira caminhada rápida em subida: 6 km/h a 10 ou 12% por 1 min.'],
    ],
  },
  {
    id: 'bicicleta', nome: 'Bike', status: 'liberado', intervalado: true, onde: ['fim', 'longo'],
    dicas: [
      ['Ajuste', 'Banco na altura do quadril: com o pedal embaixo, o joelho fica só um pouco dobrado.'],
      ['Como fazer', 'Pedale com a parte da frente do pé e o joelho alinhado com o pé.'],
      ['Ritmo', `Carga leve a moderada, girando solto. ${RITMO}`],
      ['Tiros', 'No tiro, aumente mais a rotação do que a carga; no trecho leve, carga baixa.'],
    ],
  },
  {
    id: 'eliptico', nome: 'Elíptico ou transport', status: 'liberado', intervalado: true, onde: ['fim', 'longo'],
    dicas: [
      ['Ajuste', 'Se o aparelho tiver, comece com inclinação e passada no meio da escala.'],
      ['Como fazer', 'Pé inteiro apoiado no pedal, tronco reto, sem jogar o peso nas alças. Usar os braços junto aumenta o gasto.'],
      ['Ritmo', `Resistência leve a moderada. ${RITMO}`],
      ['Tiros', 'No tiro, acelere as passadas, com a resistência só um pouco mais alta.'],
    ],
  },
  {
    id: 'corrida', nome: 'Corrida alternada com caminhada', status: 'liberado', intervalado: true, onde: ['fim', 'longo'],
    dicas: [
      ['Quando', 'Só da semana 5 em diante: 1 min correndo e 2 andando, aumentando o trecho corrido no máximo uma vez por semana.'],
      ['Como fazer', 'Passada curta e cadência alta. Se o joelho ou a canela reclamar, volte para a caminhada inclinada.'],
      ['Ritmo', 'Esforço 8 de 10 no trecho corrido; no resto, dá para conversar.'],
    ],
  },
  {
    id: 'remo', nome: 'Remo ergométrico', status: 'liberado', intervalado: false, onde: ['fim', 'longo'],
    dicas: [
      ['Quando', 'Da semana 5 em diante, como troca da esteira.'],
      ['Como fazer', 'Na puxada: pernas, depois tronco, depois braços; na volta, a ordem inversa.'],
      ['Ritmo', RITMO],
    ],
  },
  {
    id: 'caminhada', nome: 'Caminhada japonesa', status: 'liberado', intervalado: false, onde: ['longo'],
    dicas: [
      ['Quando', 'Cardio dos dias sem academia, na rua ou na esteira.'],
      ['Como fazer', '3 min rápido e 3 min devagar, por uns 30 min. Começar com 3 ciclos.'],
      ['Ritmo', 'No rápido, esforço 6 a 7 de 10; no devagar, dá para conversar à vontade.'],
    ],
  },
  // Fora do plano: ficam só para o histórico.
  { id: 'bike-horizontal', nome: 'Bike horizontal', status: 'fora', intervalado: false, onde: [], dicas: [] },
  { id: 'hidro', nome: 'Hidroginástica ou natação', status: 'fora', intervalado: false, onde: [], dicas: [] },
  { id: 'escada', nome: 'Escada', status: 'fora', intervalado: false, onde: [], dicas: [] },
];

export function buscarCardio(id) {
  return TIPOS_DE_CARDIO.find((tipo) => tipo.id === id) ?? null;
}

// Tipos que ele pode escolher num treino.
export function tiposDeCardio(onde) {
  return TIPOS_DE_CARDIO.filter((tipo) => tipo.status === 'liberado' && tipo.onde.includes(onde));
}

// Limites dos campos do cardio.
export const MINUTOS_DE_CARDIO = { min: 5, max: 120, passo: 5 };
export const NIVEL_DE_CARDIO = { min: 1, max: 40 };

// Tiros de 1 minuto forte e 2 min caminhando, começando com 6 e subindo até 8.
// Depois de 8, quem sobe é a velocidade do tiro (0,5 km/h por semana).
export const INTERVALADO = { forte: 60, leve: 120, tirosMin: 6, tirosMax: 8 };

export const SINAIS_PARA_PARAR =
  'Pare na hora e procure atendimento se sentir dor ou aperto no peito, no braço ou na mandíbula, falta de ar fora do normal, tontura, desmaio ou palpitação.';
