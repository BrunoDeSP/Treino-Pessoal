# Central de Treino

Site para acompanhar treinos e hábitos pelo celular. Você escolhe quantos
dias por semana quer treinar, o app monta a divisão e organiza a semana.
Durante o treino, o app mostra uma série por vez com a carga sugerida,
registra o que você fez e cuida da pausa. No Início ficam o botão do treino e
o rastreador de hábitos.

## O que o app faz

- **Início:** a data, a semana atual com os dias de treino pintados e o
  contador da meta (ex.: 2/3), o botão "Começar treino" (ou "Criar ciclo",
  que monta o ciclo e já abre o primeiro treino) e os hábitos com o
  calendário do mês. Quando os treinos da semana do ciclo estão feitos, o
  botão vira "Adicionar treino" (ver Dias a mais, abaixo).
- **Configurações:** abertas pela engrenagem no canto do Início.
- **Rastreador de hábitos (Início):** um cartão por hábito com o calendário
  do mês, troca de mês e o contador da meta (vezes por semana ou por mês, você
  escolhe em cada um). O check no canto marca o dia de hoje, e tocar num dia
  do calendário marca um dia anterior. Os treinos entram sozinhos como um
  hábito, com meta própria, separada da programação do ciclo.
- **Ciclo e divisão:** você escolhe a fase do plano, de 1 a 6 dias por semana
  e de 1 a 5 semanas. Os exercícios ficam fixos durante o ciclo e os treinos
  andam em fila. A tela Ciclo mostra também a ordem dos dias a mais.
- **Treino em andamento:** uma série por vez, com carga e repetições já
  preenchidas (ajustáveis no + e − ou digitando) e o botão "Concluir série".
  Tudo é salvo a cada toque: fechar o app no meio não perde nada.
- **Pausa:** botão que dispara um cronômetro, com +15, −15 e pular. Pode
  começar sozinho ao concluir a série, tocar um bipe, vibrar e manter a tela
  ligada (cada item liga e desliga em Configurações).
- **Progressão de carga:** guardada por exercício, vale para qualquer treino
  e ciclo. A tela Ciclo mostra a carga atual e a melhor marca de cada um.
- **Hábitos (aba):** criar, editar e excluir hábitos, com nome, meta e cor.
  Abaixo, 4 meses de cada hábito em quadradinhos, como no GitHub (cada coluna
  é uma semana, as linhas vão de segunda a domingo), com os dias feitos em
  verde e troca de mês.
- **Exercícios (aba):** os exercícios já feitos, separados em Inferiores,
  Superiores, Core e Cardio, com a carga atual e quantas vezes você fez cada
  um. A página de cada exercício tem o gráfico da evolução, quantas vezes você
  fez com cada carga e o histórico com as séries.
- **Cardio:** registrado no fim do treino (tipo e minutos). É opcional e não
  conta nas séries.
- **Configurações (engrenagem):** tempo de pausa, comportamento durante o
  treino, cópia na planilha e apagar os dados.

## Hábitos: incentivar sem destacar as falhas

- Os dias feitos ficam cheios, na cor do hábito. Os outros ficam neutros,
  sem X nem vermelho.
- Não existe contagem de dias seguidos: ela zera na primeira falha e
  desanima em hábitos que não são diários. O app só soma o que foi feito.
- No Início, as semanas com a meta batida ficam douradas (nas metas por mês,
  o mês inteiro), e os dias feitos continuam na cor do hábito. O dourado
  aparece só no Início.
- O resumo só mostra conquistas: em quantas semanas ou meses a meta foi batida.
- Quando a meta é batida, aparece o selo "Meta batida" e um aviso na hora.
- As semanas começam na segunda-feira.

## O plano dentro do app

O plano de `docs/treino-hipertrofia-bruno.md` está em `js/dados/`:

- **Exercícios** (`exercicios.js`): os 36 do plano, cada um com a dica de
  execução e uma alternativa para quando o aparelho estiver ocupado. O
  `status` decide o que entra: `liberado` vai para os treinos, `alternativa`
  só aparece pela troca, `testar` e `fora` não entram. Os exercícios do plano
  anterior ficaram como `fora`, para o histórico não sumir. Os degraus de
  carga seguem a regra do plano: 1 a 2 kg em braço e ombro, 2,5 a 5 kg nos
  compostos de perna.
- **Treinos por dias** (`modelos.js`): 1 dia = Treino único; 2 e 3 dias =
  corpo inteiro (A, B e C); 4 dias = Inferior A, Superior A, Inferior B e
  Superior B; 5 dias = Superior A, Inferior A, Empurrar B, Puxar B e Pernas B;
  6 dias = Empurrar, Puxar e Pernas, A e B. Cada treino da semana leva a cor
  de uma anilha pela ordem em que aparece (A vermelha a F preta), e os dias a
  mais continuam a sequência, então a semana nunca repete uma cor.
- **Exercícios que entram na semana 5**: agachamento livre com barra, supino
  reto com barra, afundo búlgaro e barra fixa. Na Readaptação, a linha do
  treino usa a versão de entrada (goblet, supino com halteres, agachamento no
  smith e puxada frente) e a troca acontece sozinha da Construção em diante
  (campo `semana5` nas tabelas).
- **Séries de aquecimento** (`js/treino/aquecimento.js`): séries **extras**,
  antes das válidas do mesmo exercício. As válidas continuam com 100% da carga.
  - **Quem aquece:** o 1º composto de cada região (inferior e superior) do
    treino do dia. Não é exercício fixo: como os treinos giram e a fase troca
    alguns na semana 5, o exercício aquecido muda junto. Isolados e core não
    aquecem — o composto anterior já aqueceu a região.
  - **Quantas:** 1 série a ~50% × 8 na Readaptação e na semana de alívio;
    2 séries, a ~50% × 8 e ~80% × 5, na Construção e na Hipertrofia.
  - **Carga:** percentual × carga de trabalho do dia, arredondada para baixo no
    degrau do aparelho. Abaixo do menor peso, usa o menor. Mudar a carga de
    trabalho antes de aquecer refaz o aquecimento; depois de aquecer, não.
  - **Sem carga registrada ou peso do corpo:** 1 série fácil de 5 a 6
    repetições, sem carga calculada, com a orientação de subir aos poucos. Na
    barra fixa assistida, com mais assistência que nas válidas.
  - **Trocou pela alternativa:** o aquecimento vai com ela, pela carga
    registrada dela.
  - **Na tela:** entram na fila de séries, marcadas como "aquecimento", com
    pausa de 1 min entre elas e a pausa normal até a 1ª válida. Ficam fora da
    contagem "X de Y séries feitas", não entram no histórico nem na planilha e
    não mexem na carga registrada. A ficha do treino marca o exercício com
    "+ N séries de aquecimento".
  - **Aquecimento geral** (os minutos no topo do treino): 5 min leves de
    esteira ou bike, opcionais.
- **Cardio por treino:** 10 a 20 min moderado no corpo inteiro, 15 a 20 min
  moderado nos treinos de tronco e 10 a 15 min leve nos de perna. A caminhada
  longa (dia a mais) tem 30 a 40 min.
- **Dias a mais na semana** (`DIAS_A_MAIS` em `modelos.js`): depois que você
  faz os treinos da semana do ciclo, o botão "Adicionar treino" traz o
  próximo de uma ordem fixa, sem escolher nada:

  | Dias do ciclo | Dias a mais, na ordem                      |
  | ------------- | ------------------------------------------ |
  | 1             | B, C, A, B e Caminhada longa               |
  | 2             | C, A, B e Caminhada longa                  |
  | 3             | Inferior, Superior e Caminhada longa       |
  | 4             | Empurrar B e Caminhada longa               |
  | 5             | Caminhada longa                            |
  | 6             | nenhum: o 7º dia é descanso                |

  O treino adicionado vale só para aquela semana do ciclo e não mexe na fila.
  Ele é montado como se você tivesse escolhido o novo total de dias desde o
  começo. Com 3 dias, o Inferior e o Superior alternam A e B a cada vez que
  você faz um. Um por vez: o próximo só aparece depois que você fizer o
  anterior. Se adicionar e não fizer, ele some quando a semana vira. O botão
  para no 6º treino da semana.
- **Tempo por treino:** cerca de 1h45 com 1 dia, 1h30 com 2, 1h20 com 3,
  1h15 com 4, 1h05 com 5 e 1h com 6. O aquecimento é de 10 min até 3 dias e
  de 5 min depois.
- **Fases** (escolhidas ao montar o ciclo): Readaptação (semanas 1 a 4: 2
  séries em tudo, 3 repetições sobrando), Construção (5 a 8: séries do plano,
  2 sobrando), Hipertrofia (9 a 12: 1 série a mais nos 3 primeiros compostos,
  até 4, com 1 a 2 sobrando) e Semana de alívio (13: metade das séries,
  mesmas cargas). O app sugere a fase pela regra do plano: com 80% ou mais
  dos treinos feitos no ciclo anterior (cada dia a mais feito conta como
  planejado e feito), a próxima; abaixo disso, repetir por 2 semanas; mais de
  2 semanas parado, 2 semanas de Readaptação. Depois da semana de alívio, a
  sugestão volta para a Construção.
- **Cardio** (`regioes.js`): caminhada inclinada na esteira (o principal),
  bike, elíptico, corrida alternada com caminhada e remo no fim do treino;
  a caminhada japonesa entra no dia de caminhada longa. Cada aparelho tem o
  passo a passo (ajuste, como fazer, ritmo e tiros). Os minutos começam no
  mínimo da faixa do treino e sobem 5 min por semana quando você completa. O
  nível do aparelho é opcional.
- **Tiros de 1 minuto:** da semana 5 em diante, 1 vez por semana no treino de
  tronco do fim da sequência (Superior B com 4 dias, Puxar B com 5 e 6) e, na
  Hipertrofia, também num segundo dia de tronco. Nunca em dia de perna: com 1
  a 3 dias, em que todo treino tem perna, eles vão para a caminhada longa.
  Ainda dependem do check-up médico marcado em Configurações. Tiros de 1 min
  forte e 2 min caminhando, começando com 6 e subindo até 8, com cronômetro
  que bipa e vibra a cada troca.

## Progressão de carga

- Cada exercício tem uma meta de repetições (ex.: 10 a 12).
- **Sobe:** fez **todas** as séries no topo da meta com a mesma carga; no
  próximo treino a carga sobe o `incremento` do exercício.
- **Segura:** a maioria das séries ficou abaixo do mínimo. Em 2 treinos
  seguidos a carga se mantém; no 3º, baixa uns 10%.
- **Joelho incomodou** (exercícios de perna): encerra o exercício no dia, e ele
  volta no treino seguinte com uns 15% menos carga. É a regra de dor
  articular do plano (acima de 3 de 10 encerra o exercício).
- **Alternativa:** tem carga própria; voltar ao exercício principal retoma a
  carga dele.
- **Semana de alívio:** nenhuma carga muda.
- **Séries de aquecimento:** ficam fora de tudo — volume, constância,
  progressão e histórico.
- Exercícios sem carga (prancha, barra fixa assistida): ao bater o topo da
  meta, o app avisa que dá para dificultar — na barra fixa, tirando
  assistência.
- As repetições de cada série começam com o que você fez da última vez com a
  mesma carga. Se a carga subiu, começam no mínimo da meta.
- "Já fiz, só marcar como feito" conta o treino sem mexer nas cargas.

## Estrutura de pastas

```
central-de-treino/
├── index.html                  página única do app
├── manifest.webmanifest        permite instalar na tela inicial
├── sw.js                       funciona offline e busca atualizações
├── README.md
├── apps-script/Codigo.gs       vai dentro da planilha (ver Cópia na planilha)
├── css/estilos.css             visual (cores e tamanhos no topo do arquivo)
├── fontes/                     fonte Archivo + licença
├── icones/                     ícones do app
└── js/
    ├── app.js                  inicia o app, rotas (#/hoje, #/sessao...) e eventos
    ├── config.js               dias, semanas, limites e valores iniciais das configurações
    ├── estado.js               carrega, altera, salva e migra os dados
    ├── armazenamento/
    │   ├── index.js            armazenamento local usado pelo app
    │   ├── local.js            salva no navegador do celular
    │   ├── sincronizacao.js    quando e o que mandar para a planilha
    │   ├── planilha.js         conversa com o Apps Script
    │   └── tabelas.js          monta as abas para ver na planilha
    ├── dados/
    │   ├── exercicios.js       exercícios do plano e alternativas
    │   ├── modelos.js          fases e treinos de 1 a 6 dias
    │   └── regioes.js          regiões do corpo e tipos de cardio
    ├── habitos/
    │   └── regras-dos-habitos.js  metas, contagens e resumo do mês
    ├── treino/
    │   ├── gerador.js          monta os treinos do ciclo
    │   ├── aquecimento.js      quem aquece, quantas séries e com qual carga
    │   ├── regras-do-ciclo.js  ciclo, fila, semanas e histórico
    │   ├── sessao.js           treino em andamento (séries, cardio, pausa, finalizar)
    │   ├── historico.js        histórico de cada exercício, para a aba Exercícios
    │   └── progressao.js       regras da progressão de carga
    ├── telas/
    │   ├── hoje.js             Início: botão do treino + hábitos (rota #/hoje)
    │   ├── habitos.js          lista de hábitos
    │   ├── habito.js           criar e editar um hábito
    │   ├── sessao.js           treino em andamento
    │   ├── novo-ciclo.js       escolher dias e semanas
    │   ├── ciclo.js            treinos, histórico, cargas atuais
    │   ├── treino.js           ficha de qualquer treino do ciclo
    │   ├── configuracoes.js    pausa, opções do treino e dados
    │   ├── exercicios.js       aba Exercícios, por região do corpo
    │   ├── exercicio.js        página de um exercício (gráfico, cargas, histórico)
    │   └── comum.js            partes usadas por mais de uma tela
    ├── ui/
    │   ├── componentes.js      anilha, barra, ficha
    │   ├── calendario.js       semana do treino, calendário do mês e quadradinhos
    │   ├── grafico.js          gráfico de linha em SVG
    │   ├── cronometro.js       relógio da pausa, bipe, vibração e tela ligada
    │   ├── avisos.js           aviso com "Desfazer" e confirmação
    │   └── html.js             templates com escape automático
    └── util/
        ├── datas.js
        └── texto.js            plural, kg, tempo e duração
```

## Como testar no computador

O JavaScript está dividido em módulos, e o navegador não carrega módulos
abrindo o `index.html` com dois cliques. Rode um servidor simples dentro da
pasta do projeto:

```
python -m http.server 8000
```

e abra `http://localhost:8000`.

## Publicar e atualizar no GitHub Pages

- **Primeira vez:** envie os arquivos mantendo as pastas, com o `index.html`
  na raiz. Em **Settings → Pages**, escolha **Deploy from a branch**, branch
  `main`, pasta `/ (root)`.
- **Atualizações:** cada entrega vem num zip completo, já nas pastas certas,
  com a lista dos arquivos alterados na conversa. Extraia por cima do projeto
  e envie os arquivos.
- Se o celular ainda mostrar a versão antiga depois de publicar, feche e abra
  o app de novo.

## Limites do navegador

- O bipe e a vibração só funcionam com o app aberto na tela. Com a opção
  "Manter a tela ligada", o celular não bloqueia durante o treino.
- O iPhone não vibra pelo navegador, então lá o aviso é só o bipe.
- O cronômetro usa o horário de término: se a tela apagar, o tempo continua
  certo quando ela voltar.

## Onde mexer

| Quero mudar...                                       | Arquivo                    |
| ---------------------------------------------------- | -------------------------- |
| Exercícios, alternativas, dicas e status             | `js/dados/exercicios.js`   |
| Treinos por dias, fases, séries e minutos de cardio  | `js/dados/modelos.js`      |
| Regra das séries de aquecimento                      | `js/treino/aquecimento.js` |
| Ordem dos dias a mais na semana                      | `js/dados/modelos.js`      |
| Aparelhos de cardio, passo a passo e intervalado     | `js/dados/regioes.js`      |
| Regras da progressão                                 | `js/treino/progressao.js`  |
| Cores e sugestões de hábitos                         | `js/habitos/regras-dos-habitos.js` |
| Valores iniciais e limites das configurações         | `js/config.js`             |
| Tempos da cópia na planilha                          | `js/config.js`             |
| Colunas das abas da planilha                         | `js/armazenamento/tabelas.js` |
| Cores, fonte, espaçamentos                           | `css/estilos.css`          |

Ao criar um arquivo novo, adicione o caminho dele na lista `ARQUIVOS` do
`sw.js` para ele também funcionar offline.

## Onde ficam os dados

No navegador do celular (`localStorage`, chave `central-de-treino`), que
é o dono dos dados. Com a planilha conectada, uma cópia vai para o Google
Planilhas (seção abaixo), e é por ela que os dados voltam se o navegador for
limpo ou se você trocar de celular. Os dados da versão anterior são convertidos
sozinhos na primeira abertura.

Formato salvo (versão 5): `revisao` (sobe a cada mudança; a cópia na
planilha compara por ele), `ciclos` (com o histórico e as séries de cada
treino, e em `extras` os dias a mais adicionados em cada semana),
`progressao` (carga atual, última vez e melhor marca por exercício),
`habitos` (nome, cor, meta e dias feitos), `habitoTreinos` (a meta dos
treinos), `configuracoes` e `sessaoEmAndamento`.

## Cópia na planilha

O app salva tudo no celular primeiro, o que é rápido e funciona sem sinal, e
manda uma cópia para uma planilha do Google:

- 8 segundos depois da última mudança;
- durante um treino em andamento, só quando o app sai da tela, para não
  gastar internet a cada série;
- sem internet, ele tenta de novo em 1, 5 e 15 minutos e quando a conexão
  volta. Configurações mostra quando foi o último envio.

### Instalar (uma vez, na conta Google)

1. Crie uma planilha nova no Google Planilhas, por exemplo "Central de Treino".
2. Na planilha, abra **Extensões → Apps Script**. Apague o código de exemplo,
   cole todo o conteúdo de `apps-script/Codigo.gs` e salve.
3. No seletor de funções, escolha **configurar** e clique em **Executar**. O
   Google pede autorização: escolha a conta, clique em **Avançado** e em
   **Acessar** (o aviso de app não verificado é normal em script pessoal).
   No registro de execução aparece a **chave do app**.
4. Clique em **Implantar → Nova implantação**. Em tipo, escolha **App da Web**,
   com **Executar como: eu** e **Quem pode acessar: qualquer pessoa**.
   Implante e copie o endereço, que termina em `/exec`.
5. No celular, abra o app, vá em **Configurações → Cópia na planilha**,
   cole o endereço e a chave e toque em **Conectar planilha**.

"Qualquer pessoa" só deixa o endereço responder. Sem a chave, a planilha
recusa tudo. O endereço e a chave ficam só no celular, fora dos dados e do
GitHub. Se a chave vazar, rode **trocarChave** no Apps Script e conecte o app
de novo com a chave nova.

Para atualizar o `Codigo.gs` no futuro: cole o código novo, salve e use
**Implantar → Gerenciar implantações → editar (lápis) → Versão: nova versão**.
Assim o endereço continua o mesmo.

### O que fica na planilha

| Aba        | O que tem                                                         |
| ---------- | ----------------------------------------------------------------- |
| Treinos    | Um treino por linha: data, nome, fase, dia a mais, séries e cardio |
| Séries     | Cada série: exercício, carga, repetições (ou segundos) e meta      |
| Cargas     | Carga atual de cada exercício, o que acontece na próxima vez e a melhor marca |
| Hábitos    | Cada dia feito de cada hábito                                     |
| Ciclos     | Cada ciclo: fase, dias por semana, treinos feitos e constância    |
| Backup     | Escondida: a cópia completa que o app usa para restaurar. Não edite. |

As abas são só para ver: elas são reescritas a cada envio, então o que for
mudado nelas se perde. Os mais recentes ficam em cima.

### Regras de segurança

- **Só um aparelho salva na planilha.** Se outro tentar (um celular de teste ou
  o antigo), a planilha recusa e o app pergunta o que fazer, sem apagar nada.
- **Celular novo ou navegador limpo:** é só conectar de novo. Se o celular
  estiver vazio, o app traz os dados da planilha sozinho. Se os dois lados
  tiverem dados, ele pergunta qual manter.
- **Apagar todos os dados** (Configurações) apaga só o celular e desconecta a
  planilha, que continua com a cópia.
- O Google Planilhas também guarda o histórico de versões (**Arquivo →
  Histórico de versões**), mais uma rede de segurança.

## Próximos passos

1. Dados separados por plano, para o do Bruno e o da Talita conviverem no
   mesmo app.
2. Pergunta de local de treino (academia ou casa) na tela de novo ciclo.
3. Avaliações (bioimpedância, cintura) e dieta.
4. Faixa de 6 a 10 repetições nos quatro principais a partir da semana 9
   (o plano deixa opcional).

---

Fonte: Archivo, licença SIL Open Font License (`fontes/OFL.txt`).
