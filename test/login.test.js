// ERRO 3: o curso precisa de login (usuário e senha) e de uma área de progresso por pessoa.
// Roda junto com test/conteudo.test.js.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const html = fs.readFileSync(path.join(__dirname, "..", "public", "index.html"), "utf8");
let falhas = 0;
const ok = (cond, msg) => { if (!cond) { falhas++; console.error("FALHOU (login): " + msg); } };

// mesma regra da página: sem acento, minúsculas, espaços simples
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
const hash = (u, p) => crypto.createHash("sha256").update("ingles-acelerado|" + norm(u) + "|" + p).digest("hex");

const bloco = (html.match(/const USERS=\[([\s\S]*?)\];/) || [])[1];
ok(bloco, "a página tem a lista de usuários (const USERS=[...])");
if (bloco) {
  ok(bloco.includes(hash("Rafael Veiga", "1234")), "Rafael Veiga entra com a senha 1234");
  ok(bloco.includes(hash("  rafael   VEIGA ", "1234")), "o usuário funciona com maiúsculas, minúsculas e espaços a mais");
  ok(!bloco.includes(hash("Rafael Veiga", "12345")), "senha errada não entra");
  ok(!/1234/.test(bloco), "a senha não aparece escrita no código, só o código embaralhado");
}
ok(/KEY\+":"\+/.test(html), "o progresso é salvo separado para cada usuário");
ok(html.includes('id="login"'), "existe a tela de entrada");
ok(/id="logout"/.test(html), "existe o botão Sair");

if (falhas) { console.error(`\n${falhas} problema(s) no login. Não publique.`); process.exit(1); }
console.log("Login OK: usuário Rafael Veiga, área separada por pessoa.");
