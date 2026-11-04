# Inglês Acelerado (repositório passaporte-ingles)

Curso de inglês para adultos brasileiros com noção básica (verbo to be e algumas palavras), em formato de jogo.

## Mapa do projeto
- `public/index.html`: o site inteiro (HTML, CSS e JavaScript num arquivo só).
  - Conteúdo: `LEVELS` (Módulo 1) e `LEVELS2` (Módulo 2), reunidos em `MODULES`.
  - Regra de estrelas: `starsFor(acertos, total)` e `passFor(total)`.
  - Usuários: `USERS`.
- `test/conteudo.test.js`: confere conteúdo, sintaxe, regra de estrelas e trava de módulos. Roda antes de toda publicação (é o comando de build do Render) e chama `test/login.test.js`.
- `scripts/novo-usuario.js`: gera a linha de um usuário novo para a lista `USERS`.
- `ERROS.md`: erros conhecidos e como foram resolvidos.

## Estrutura do curso
- Módulos, como temporadas. Cada módulo repete os mesmos 5 ambientes, na ordem: 1 Família, 2 Shopping, 3 Restaurante, 4 Lazer, 5 Trabalho (escritório).
- Cada nível tem 4 fases em ordem: Leitura, Escrita, Audição, Fala. Cada fase: blocos prontos (chunks) + exercícios.
- **Módulo 1 (Base):** to be, presente, pedidos simples. 5 blocos e 5 exercícios por fase. Passa com 3 de 5.
- **Módulo 2 (Avançando):** passado, futuro (going to / will), comparações, diálogos de 4 a 6 falas. 6 blocos e 6 exercícios por fase. Passa com 4 de 6.
- Estrelas: acertar tudo = 3, um erro = 2, dois erros = 1, mais que isso não passa.
- O Módulo 2 fica trancado até a pessoa concluir todas as fases do Módulo 1. Usuário com `admin:true` (o Rafael) entra livre para conferir. Dentro do módulo, a ordem das fases vale para todos.
- Próximos módulos (3, 4, 5): criar `LEVELS3` etc. no mesmo formato, um passo acima, e incluir em `MODULES` e em `ESPERADO` no teste.
- Pontos: 10 por acerto, 6 se usou ajuda (tradução, legenda, início da frase), +5 a partir de 3 acertos seguidos, +15 por estrela nova. Pontos, títulos e dias seguidos valem para o curso todo.

## Login e áreas
- Tela de entrada com usuário e senha. Cada usuário tem sua área: progresso salvo em `ingles-acelerado-v1:<id>`.
- Estrelas do Módulo 1 usam as chaves antigas (`0-1`); as do Módulo 2 usam `m2:0-1`. O módulo aberto fica em `S.mod`.
- A lista `USERS` guarda só o código embaralhado da senha (SHA-256 de `ingles-acelerado|usuario-normalizado|senha`), nunca a senha.
- Usuário não diferencia maiúsculas, acentos nem espaços a mais. Senha diferencia.
- Usuário atual: Rafael Veiga (id `rafael`, administrador).
- Novo usuário: `node scripts/novo-usuario.js "Nome" "senha"`, cole a linha em `USERS`, rode o teste, publique.
- Limite: é um site sem servidor. O login separa as áreas, mas não é um cofre: quem entende de código consegue ver a página. O progresso fica no aparelho, não sincroniza entre celular e computador. Para sincronizar, o próximo passo seria um servidor com banco de dados.

## Regras
- Método: abordagem lexical (blocos prontos) + entrada compreensível (entender 70 a 80%; tradução e legenda escondidas).
- Linguagem de adulto, situações reais. Nada de tema de aeroporto ou viagem (o Rafael não gostou).
- Visual colorido: cada fase tem sua cor (Leitura azul, Escrita roxo, Audição laranja, Fala verde) e cada nível seu degradê.
- Fala usa reconhecimento de voz do navegador (funciona no Chrome e Edge). Sem microfone, o aluno se autoavalia.
- Peças extras dos exercícios de montar frase nunca podem repetir palavras da resposta, nem formar outra frase correta.
- Método Akita: todo erro corrigido ganha teste em `test/` (ERRO N) e linha em `ERROS.md`, escrito antes da correção e visto falhando.

## Publicar
- GitHub: `rafaelveigaexodus-stack/passaporte-ingles`, branch `main`.
- Render: site estático `ingles-acelerado` (`srv-dbl7o956e07s739b7iug`), endereço https://ingles-acelerado.onrender.com, build `node test/conteudo.test.js`, pasta publicada `public`. O deploy automático por push NÃO dispara: depois do push, dispare com `trigger_deploy`.
- O site antigo `passaporte-ingles` (`srv-dbl7hoff3r2c73dqqil0`) ficou sobrando: pode ser apagado no painel do Render.
- Depois do push, confira o deploy no Render (`list_deploys`) e peça para testar com Ctrl+F5.
