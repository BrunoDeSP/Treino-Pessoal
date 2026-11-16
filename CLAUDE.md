# Central de Treino

Site pessoal de treino, dieta e hábitos, usado no celular durante a academia. Hoje tem o plano da Talita (emagrecimento); este passo adiciona o plano do Bruno (hipertrofia e definição), com a mesma lógica de funcionamento.

## Stack

- HTML, CSS e JavaScript puro, sem framework e sem build.
- Hospedado no GitHub Pages.
- Dados salvos no próprio celular (localStorage). O Google Planilhas (via Apps Script) é só cópia de leitura e backup: o app não lê de volta da planilha.
- Sem login obrigatório.
- Mobile-first: todo layout precisa funcionar bem no celular antes do desktop.

## Onde está o conteúdo

- `docs/treino-hipertrofia-bruno.md` — plano completo do Bruno: exercícios com alternativas, divisões de 1 a 6 dias, regra de progressão de carga, fases de 12 semanas, cardio e métricas.
- O `.md` é a fonte da verdade para o plano. Não ler o PDF original; se o plano mudar, atualizar o `.md`.

## Regras do plano que o site aplica

Detalhes em `docs/treino-hipertrofia-bruno.md`, seção "Regras do plano". Resumo:

- **Dias por semana escolhem a divisão:** 1–3 dias corpo inteiro, 4 inferior/superior, 5 superior/inferior + empurrar/puxar/pernas, 6 empurrar/puxar/pernas 2x. A sequência roda; treino perdido é o próximo (não pula).
- **Fase pela semana do ciclo:** semanas 1–4 (2 séries, esforço 7), 5–8 (3 séries, esforço 8), 9–12 (3–4 séries, esforço 8–9), semana 13 de alívio (metade das séries).
- **Exercícios por semana de entrada:** alguns só liberam a partir da semana 5 (ex.: agachamento livre, supino com barra, búlgaro, barra fixa).
- **Progressão:** bateu o topo da faixa em todas as séries → sobe a carga no treino seguinte (1–2 kg braço/ombro, 2,5–5 kg compostos de perna). Não atingiu o mínimo 2 sessões seguidas → mantém; na 3ª → baixa ~10%.
- **Faixas:** compostos 8–12, isolados 10–15; da semana 9, os 4 principais podem ir a 6–10.
- **Descanso sugerido:** 2 min compostos, 90 s isolados (ajustável nas Configurações).
- **Dor articular > 3/10:** encerra o exercício no dia e volta com 10–20% menos carga.
- **Aquecimento** (detalhes na seção "Aquecimento" do `.md`): séries extras antes das séries válidas, que continuam com 100% da carga.
  - Só no 1º composto de cada região (inferior e superior) do treino do dia. Muda conforme o treino, a fase e o número de dias (tabela no `.md`). Isolados não aquecem.
  - Semanas 1–4 e 13: 1 série a ~50% × 8. Semanas 5–12: ~50% × 8 e ~80% × 5.
  - Carga = % × carga de trabalho do dia, arredondada para baixo. Sem carga registrada → só orienta aquecer subindo aos poucos.
  - Peso do corpo ou barra assistida: 1 série fácil de 5–6 repetições (na barra, com mais assistência). Se trocar pela alternativa, o aquecimento vai para ela.
  - Marcadas como "aquecimento". Não contam para volume, constância nem progressão, e não alteram a carga registrada.
- Cada exercício tem uma alternativa para quando o aparelho estiver ocupado.
- Carga registrada por exercício vale para qualquer ciclo e treino.

## Convenções

- Textos da interface em português do Brasil.
- Não quebrar o plano da Talita ao mexer no do Bruno: a lógica é compartilhada, os dados de cada plano são separados.
- Ao terminar uma alteração, entregar o projeto completo organizado nas pastas (zip), não só os arquivos alterados.
