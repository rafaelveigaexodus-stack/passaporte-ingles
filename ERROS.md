# Erros conhecidos

| Nº | Erro | Causa | Como evitar |
|----|------|-------|-------------|
| 1 | Microfone não funciona dentro do Claude | A página do Claude bloqueia o microfone | O curso roda no Render; lá o navegador pede permissão |
| 2 | Reconhecimento de voz não funciona no iPhone/Firefox | Navegador não tem o recurso | Aviso na tela + autoavaliação ("Falei bem / Preciso treinar") |
| 3 | Sem login, todo mundo no mesmo aparelho dividia o progresso | Não havia usuários | Tela de entrada + área por usuário; teste em `test/login.test.js` |
| 4 | Link do site com nome antigo (passaporte-ingles) | Site criado antes da troca de nome do curso | Site no Render chamado `ingles-acelerado`; o repositório continua `passaporte-ingles` |
