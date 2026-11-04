# Inglês Acelerado (repositório passaporte-ingles)

Curso de inglês para adultos brasileiros com noção básica (verbo to be e algumas palavras), em formato de jogo.

## Mapa do projeto
- `public/index.html`: o site inteiro (HTML, CSS e JavaScript num arquivo só). O conteúdo do curso fica na constante `LEVELS`.
- `test/conteudo.test.js`: confere o conteúdo e a sintaxe. Roda antes de toda publicação (é o comando de build do Render).
- `ERROS.md`: erros conhecidos e como foram resolvidos.

## Estrutura do curso
- 5 níveis, um ambiente cada: 1 Família, 2 Shopping, 3 Restaurante, 4 Lazer, 5 Trabalho (escritório).
- Cada nível tem 4 fases em ordem: Leitura, Escrita, Audição, Fala. Cada fase: blocos prontos (chunks) + 5 exercícios.
- Passa de fase com 3 acertos em 5. Estrelas: 3 acertos = 1, 4 = 2, 5 = 3.
- Pontos: 10 por acerto, 6 se usou ajuda (tradução, legenda, início da frase), +5 a partir de 3 acertos seguidos, +15 por estrela nova.
- Progresso salvo no navegador (localStorage, chave `ingles-acelerado-v1`).

## Regras
- Método: abordagem lexical (blocos prontos) + entrada compreensível (entender 70 a 80%; tradução e legenda escondidas).
- Linguagem de adulto, situações reais. Nada de tema de aeroporto ou viagem (o Rafael não gostou).
- Visual colorido: cada fase tem sua cor (Leitura azul, Escrita roxo, Audição laranja, Fala verde) e cada nível seu degradê.
- Fala usa reconhecimento de voz do navegador (funciona no Chrome e Edge). Sem microfone, o aluno se autoavalia.
- Peças extras dos exercícios de montar frase nunca podem repetir palavras da resposta.
- Método Akita: todo erro corrigido ganha teste em `test/conteudo.test.js` (ERRO N) e linha em `ERROS.md`.

## Publicar
- GitHub: `rafaelveigaexodus-stack/passaporte-ingles`, branch `main`.
- Render: site estático, build `node test/conteudo.test.js`, pasta publicada `public`.
- Depois do push, confira o deploy no Render (`list_deploys`) e peça para testar com Ctrl+F5.
