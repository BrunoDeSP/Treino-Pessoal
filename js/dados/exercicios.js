// Banco de exercícios do plano (docs/treino-hipertrofia-bruno.md, seção "Exercícios").
//
//   id           identificador fixo: a carga fica guardada por ele, em qualquer treino e ciclo
//   nome         como aparece na tela
//   grupo        região trabalhada, em linguagem simples
//   regiao       'inferiores' | 'superiores' | 'core' (aba Exercícios e botão do joelho)
//   tipo         'composto' | 'isolado' | 'core' (na Hipertrofia, os 3 primeiros compostos ganham 1 série)
//   status       'liberado' (entra nos treinos) | 'alternativa' (só pela troca) | 'testar' | 'fora'
//   medida       'reps' ou 'segundos'
//   porLado      true quando é feito um lado de cada vez
//   incremento   quanto a carga sobe por vez, em kg (0 = sem carga: peso do corpo ou barra assistida)
//   requer       equipamentos ([] = só o peso do corpo)
//   dica         como fazer, mostrada durante o treino
//   alternativa  id do exercício para quando o aparelho estiver ocupado (tem carga própria)
//   alvo         só nas alternativas medidas de outro jeito que o exercício principal
//
// Os degraus de carga seguem a regra do plano: 1 a 2 kg em braço e ombro,
// 2,5 a 5 kg nos compostos de perna.
//
// Os exercícios que entram na semana 5 (agachamento livre com barra, supino
// reto com barra, afundo búlgaro e barra fixa) ficam 'liberado': quem decide
// quando eles aparecem é a fase, nas tabelas de modelos.js.
//
// Para liberar ou tirar um exercício, mude o status. Os que saíram ficam como
// 'fora' para o histórico não sumir.

const e = (id, nome, grupo, regiao, tipo, incremento, requer, dica, extras = {}) => ({
  id, nome, grupo, regiao, tipo, incremento, requer, dica, status: 'liberado', medida: 'reps', porLado: false, ...extras,
});
const alt = (id, nome, grupo, regiao, tipo, incremento, requer, dica, extras = {}) =>
  e(id, nome, grupo, regiao, tipo, incremento, requer, dica, { status: 'alternativa', ...extras });

export const EXERCICIOS = [
  // --- Pernas e glúteo ---
  e('agachamento-goblet', 'Agachamento goblet', 'Pernas e glúteo', 'inferiores', 'composto', 2, ['halter'],
    'Halter no peito, cotovelos para baixo. Base para reaprender o agachamento: descer até onde a coluna fica neutra.',
    { alternativa: 'agachamento-smith' }),
  e('agachamento-livre', 'Agachamento livre com barra', 'Pernas e glúteo', 'inferiores', 'composto', 5, ['barra'],
    'Entra quando o goblet estiver firme com halter pesado. Barra nas costas, peito alto e descida até a coluna ficar neutra.',
    { alternativa: 'agachamento-smith' }),
  e('agachamento-smith', 'Agachamento no smith', 'Pernas e glúteo', 'inferiores', 'composto', 5, ['barra'],
    'Pés um pouco à frente da barra e amplitude confortável. As travas servem de limite.',
    { alternativa: 'agachamento-goblet' }),
  e('leg-press', 'Leg press 45°', 'Quadríceps e glúteo', 'inferiores', 'composto', 5, ['maquina'],
    'Não deixar o quadril sair do encosto embaixo. Pés na largura do ombro.',
    { alternativa: 'hack-machine' }),
  e('hack-machine', 'Hack machine', 'Quadríceps e glúteo', 'inferiores', 'composto', 5, ['maquina'],
    'Pés no meio da plataforma, descida controlada.', { alternativa: 'leg-press' }),
  e('stiff', 'Stiff (terra romeno)', 'Posterior e glúteo', 'inferiores', 'composto', 2.5, ['halter'],
    'Joelhos levemente dobrados e parados; o quadril vai para trás. Halteres no começo, barra quando a técnica firmar.',
    { alternativa: 'mesa-flexora' }),
  e('agachamento-bulgaro', 'Afundo búlgaro', 'Pernas e glúteo', 'inferiores', 'composto', 2, ['halter'],
    'Pé de trás no banco, tronco levemente à frente. Começar só com o peso do corpo e só depois pegar halteres.',
    { alternativa: 'afundo-smith', porLado: true }),
  e('elevacao-pelvica', 'Elevação pélvica', 'Glúteo', 'inferiores', 'composto', 5, ['maquina'],
    'Máquina ou barra com proteção; pausa de 1 s em cima, sem arquear a lombar.', { alternativa: 'gluteo-polia' }),
  e('cadeira-extensora', 'Cadeira extensora', 'Quadríceps', 'inferiores', 'isolado', 5, ['maquina'],
    'Sem tranco no final; descer devagar.', { alternativa: 'leg-press-baixo' }),
  e('mesa-flexora', 'Mesa flexora', 'Posterior de coxa', 'inferiores', 'isolado', 5, ['maquina'],
    'Descer devagar, sem tirar o quadril do apoio.', { alternativa: 'cadeira-flexora' }),
  e('cadeira-flexora', 'Cadeira flexora', 'Posterior de coxa', 'inferiores', 'isolado', 5, ['maquina'],
    'Quadril colado no banco.', { alternativa: 'mesa-flexora' }),
  e('panturrilha-pe', 'Panturrilha em pé', 'Panturrilha', 'inferiores', 'isolado', 5, ['maquina'],
    'Pausa curta em cima e embaixo.', { alternativa: 'panturrilha-leg-press' }),
  e('panturrilha-sentada', 'Panturrilha sentada', 'Panturrilha', 'inferiores', 'isolado', 5, ['maquina'],
    'Amplitude completa: descer o calcanhar até o fim e subir até o topo.', { alternativa: 'panturrilha-pe' }),

  // --- Peito, costas, ombros e braços ---
  e('supino-halteres', 'Supino reto com halteres', 'Peito', 'superiores', 'composto', 2, ['halter'],
    'Descer até os halteres ficarem na linha do peito, cotovelos um pouco abaixo dos ombros.',
    { alternativa: 'supino-maquina' }),
  e('supino-barra', 'Supino reto com barra', 'Peito', 'superiores', 'composto', 5, ['barra'],
    'Sempre com alguém por perto ou com as travas do smith. Barra na linha do peito.',
    { alternativa: 'supino-smith' }),
  e('supino-inclinado-halteres', 'Supino inclinado com halteres', 'Peito', 'superiores', 'composto', 2, ['halter'],
    'Banco a 30–45°, sem jogar os ombros para a frente.', { alternativa: 'supino-inclinado-maquina' }),
  e('supino-inclinado-maquina', 'Supino inclinado na máquina', 'Peito', 'superiores', 'composto', 5, ['maquina'],
    'Costas apoiadas; empurrar sem travar os cotovelos.', { alternativa: 'supino-inclinado-halteres' }),
  e('crucifixo-maquina', 'Crucifixo na máquina', 'Peito', 'superiores', 'isolado', 2.5, ['maquina'],
    'Cotovelos levemente dobrados, sem bater as mãos.', { alternativa: 'crucifixo-halteres' }),
  e('puxada-frente', 'Puxada frente', 'Costas', 'superiores', 'composto', 2.5, ['polia'],
    'Puxar até o queixo, cotovelos para baixo e peito alto.', { alternativa: 'barra-fixa' }),
  e('barra-fixa', 'Barra fixa assistida', 'Costas', 'superiores', 'composto', 0, ['maquina'],
    'Graviton ou elástico, com assistência suficiente para fechar a série. Quando sair do topo da faixa, tire assistência.',
    { alternativa: 'puxada-frente' }),
  e('remada-baixa', 'Remada baixa', 'Costas', 'superiores', 'composto', 2.5, ['polia'],
    'Peito alto, sem jogar o tronco; puxar até a barriga.', { alternativa: 'remada-maquina' }),
  e('remada-maquina', 'Remada na máquina', 'Costas', 'superiores', 'composto', 5, ['maquina'],
    'Peito apoiado quando a máquina permitir.', { alternativa: 'remada-baixa' }),
  e('remada-unilateral', 'Remada unilateral com halter', 'Costas', 'superiores', 'composto', 2, ['halter'],
    'Joelho e mão apoiados no banco; puxar o cotovelo para trás, sem girar o tronco.',
    { alternativa: 'remada-articulada', porLado: true }),
  e('desenvolvimento-halteres', 'Desenvolvimento com halteres sentado', 'Ombros', 'superiores', 'composto', 2, ['halter'],
    'Encosto alto, sem arquear a lombar.', { alternativa: 'desenvolvimento-maquina' }),
  e('elevacao-lateral', 'Elevação lateral', 'Ombros', 'superiores', 'isolado', 1, ['halter'],
    'Carga leve, sem balançar o corpo; subir até a altura do ombro.', { alternativa: 'elevacao-lateral-polia' }),
  e('elevacao-lateral-polia', 'Elevação lateral na polia', 'Ombros', 'superiores', 'isolado', 2.5, ['polia'],
    'Um braço por vez, puxando de baixo até a altura do ombro.', { alternativa: 'elevacao-lateral', porLado: true }),
  e('face-pull', 'Face pull', 'Ombros e postura', 'superiores', 'isolado', 2.5, ['polia'],
    'Puxar a corda em direção ao rosto, cotovelos altos e escápulas juntas.', { alternativa: 'crucifixo-inverso' }),
  e('crucifixo-inverso', 'Crucifixo inverso na máquina', 'Ombros e postura', 'superiores', 'isolado', 2.5, ['maquina'],
    'Abrir os braços para trás juntando as escápulas, sem encolher o ombro.', { alternativa: 'face-pull' }),
  e('rosca-direta', 'Rosca direta', 'Bíceps', 'superiores', 'isolado', 1, ['halter'],
    'Cotovelos parados ao lado do corpo.', { alternativa: 'rosca-polia' }),
  e('rosca-polia', 'Rosca na polia', 'Bíceps', 'superiores', 'isolado', 2.5, ['polia'],
    'Cotovelos parados ao lado do corpo, sem balançar.', { alternativa: 'rosca-direta' }),
  e('rosca-martelo', 'Rosca martelo', 'Bíceps e antebraço', 'superiores', 'isolado', 1, ['halter'],
    'Pegada neutra, sem balançar.', { alternativa: 'rosca-corda' }),
  e('triceps-polia', 'Tríceps na polia', 'Tríceps', 'superiores', 'isolado', 2.5, ['polia'],
    'Cotovelos colados ao corpo.', { alternativa: 'triceps-corda' }),
  e('triceps-frances', 'Tríceps francês com halter', 'Tríceps', 'superiores', 'isolado', 1, ['halter'],
    'Cotovelos apontando para cima; o halter desce atrás da cabeça.', { alternativa: 'triceps-testa' }),

  // --- Core ---
  e('prancha', 'Prancha', 'Abdômen', 'core', 'core', 0, [],
    'Quadril alinhado com o tronco, sem deixar a lombar cair. Começar com 20 s.',
    { alternativa: 'dead-bug', medida: 'segundos' }),
  e('abdominal-polia', 'Abdominal na polia', 'Abdômen', 'core', 'core', 2.5, ['polia'],
    'Para força de core, não para “secar barriga”. Enrolar a coluna, sem puxar com o braço.',
    { alternativa: 'abdominal-maquina' }),
  e('pallof', 'Pallof press', 'Abdômen', 'core', 'core', 2.5, ['polia'],
    'Segurar a polia à frente resistindo à rotação.', { alternativa: 'prancha-lateral', porLado: true }),

  // --- Alternativas (aparelho ocupado) ---
  alt('afundo-smith', 'Afundo no smith', 'Pernas e glúteo', 'inferiores', 'composto', 5, ['barra'],
    'Um pé à frente e outro atrás, barra nas costas; descer o joelho de trás em direção ao chão.',
    { porLado: true }),
  alt('gluteo-polia', 'Glúteo na polia', 'Glúteo', 'inferiores', 'isolado', 2.5, ['polia'],
    'Em pé, com apoio firme; levar a perna para trás sem arquear a lombar.', { porLado: true }),
  alt('leg-press-baixo', 'Leg press com os pés mais baixos', 'Quadríceps', 'inferiores', 'isolado', 5, ['maquina'],
    'Pés na parte de baixo da plataforma, para puxar mais o quadríceps.'),
  alt('panturrilha-leg-press', 'Panturrilha no leg press', 'Panturrilha', 'inferiores', 'isolado', 5, ['maquina'],
    'Pontas dos pés na plataforma, joelhos quase estendidos; pausa curta em cima.'),
  alt('supino-maquina', 'Supino na máquina', 'Peito', 'superiores', 'composto', 5, ['maquina'],
    'Costas bem apoiadas; empurrar sem travar os cotovelos.'),
  alt('supino-smith', 'Supino no smith', 'Peito', 'superiores', 'composto', 5, ['barra'],
    'Banco embaixo da barra, travas ajustadas na altura do peito.'),
  alt('crucifixo-halteres', 'Crucifixo com halteres', 'Peito', 'superiores', 'isolado', 2, ['halter'],
    'Banco reto, cotovelos levemente dobrados; abrir até sentir o peito alongar.'),
  alt('remada-articulada', 'Remada articulada', 'Costas', 'superiores', 'composto', 5, ['maquina'],
    'Peito apoiado; puxar os cotovelos para trás sem jogar o tronco.'),
  alt('desenvolvimento-maquina', 'Desenvolvimento na máquina', 'Ombros', 'superiores', 'composto', 5, ['maquina'],
    'Encosto alto; empurrar sem arquear a lombar.'),
  alt('rosca-corda', 'Rosca com corda na polia', 'Bíceps e antebraço', 'superiores', 'isolado', 2.5, ['polia'],
    'Pegada neutra na corda, cotovelos parados ao lado do corpo.'),
  alt('triceps-corda', 'Tríceps na polia com corda', 'Tríceps', 'superiores', 'isolado', 2.5, ['polia'],
    'Cotovelos colados ao corpo; abrir a corda no fim do movimento.'),
  alt('triceps-testa', 'Tríceps testa', 'Tríceps', 'superiores', 'isolado', 2, ['barra'],
    'Deitado no banco; a barra desce até a testa com os cotovelos apontando para cima.'),
  alt('dead-bug', 'Dead bug no colchonete', 'Abdômen', 'core', 'core', 0, [],
    'De costas, descer braço e perna opostos devagar, com a lombar colada no chão.',
    { porLado: true, alvo: { min: 8, max: 12, medida: 'reps' } }),
  alt('abdominal-maquina', 'Abdominal na máquina', 'Abdômen', 'core', 'core', 2.5, ['maquina'],
    'Para força de core, não para “secar barriga”.'),
  alt('prancha-lateral', 'Prancha lateral', 'Abdômen', 'core', 'core', 0, [],
    'Apoio no antebraço e no pé, quadril alinhado; um lado de cada vez.',
    { porLado: true, medida: 'segundos', alvo: { min: 20, max: 30, medida: 'segundos' } }),

  // --- Fora do plano atual (ficam só para o histórico não sumir) ---
  ...[
    ['agachamento-banco', 'Agachamento no banco', 'inferiores', 2],
    ['stiff-halteres', 'Stiff com halteres', 'inferiores', 2],
    ['stiff-barra', 'Stiff com barra ou kettlebell', 'inferiores', 2],
    ['cadeira-abdutora', 'Cadeira abdutora', 'inferiores', 5],
    ['cadeira-adutora', 'Cadeira adutora', 'inferiores', 5],
    ['panturrilha', 'Panturrilha sentada ou no aparelho', 'inferiores', 5],
    ['panturrilha-halter', 'Panturrilha sentada com halter', 'inferiores', 2],
    ['extensao-caneleira', 'Extensão de joelho com caneleira', 'inferiores', 1],
    ['flexao-caneleira', 'Flexão de joelho com caneleira', 'inferiores', 1],
    ['pull-through', 'Pull-through na polia baixa', 'inferiores', 2.5],
    ['abducao-miniband', 'Abdução sentada com miniband', 'inferiores', 0],
    ['aducao-polia', 'Adução na polia baixa, em pé', 'inferiores', 2.5, { porLado: true }],
    ['coice-caneleira', 'Coice com caneleira, em pé', 'inferiores', 1, { porLado: true }],
    ['agachamento-corpo', 'Agachamento com o peso do corpo', 'inferiores', 0],
    ['ponte-gluteo', 'Ponte de glúteo', 'inferiores', 0],
    ['afundo-halteres', 'Afundo com halteres', 'inferiores', 2],
    ['passada', 'Passada caminhando', 'inferiores', 0],
    ['subida-banco', 'Subida no banco', 'inferiores', 0],
    ['desenvolvimento-sentada', 'Desenvolvimento sentada', 'superiores', 2],
    ['desenvolvimento-smith', 'Desenvolvimento no smith, sentada', 'superiores', 2.5],
    ['rosca', 'Rosca direta ou alternada', 'superiores', 1],
    ['pullover-polia', 'Pullover na polia alta, em pé', 'superiores', 2.5],
    ['remada-halteres-apoiada', 'Remada com halteres, peito apoiado', 'superiores', 2],
    ['voador-invertido', 'Voador invertido', 'superiores', 2.5],
    ['flexao', 'Flexão de braço', 'superiores', 0],
    ['remada-elastico', 'Remada com elástico', 'superiores', 0],
    ['puxada-supinada', 'Puxada supinada', 'superiores', 5],
    ['puxada-elastico', 'Puxada com elástico', 'superiores', 0],
    ['prancha-inclinada', 'Prancha inclinada', 'core', 0, { medida: 'segundos' }],
    ['pallof-elastico', 'Pallof com elástico', 'core', 0, { porLado: true }],
    ['abdominal-colchonete', 'Abdominal curto no colchonete', 'core', 0],
  ].map(([id, nome, regiao, incremento, extras = {}]) =>
    e(id, nome, 'Fora do plano atual', regiao, 'isolado', incremento, incremento ? ['halter'] : [], '', { status: 'fora', ...extras })),
];

const porId = new Map(EXERCICIOS.map((exercicio) => [exercicio.id, exercicio]));

export function buscarExercicio(id) {
  return porId.get(id) ?? null;
}

// Joelho: o botão "Joelho incomodou" aparece nos exercícios de perna.
export function ehDePerna(exercicio) {
  return exercicio?.regiao === 'inferiores';
}
