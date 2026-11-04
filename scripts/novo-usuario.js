// Cria a linha de um novo usuário para colar em USERS (public/index.html).
// Uso: node scripts/novo-usuario.js "Nome do Usuário" "senha"
const crypto = require("crypto");
const [nome, senha] = process.argv.slice(2);
if (!nome || !senha) { console.error('Uso: node scripts/novo-usuario.js "Nome do Usuário" "senha"'); process.exit(1); }
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
const id = norm(nome).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hash = crypto.createHash("sha256").update("ingles-acelerado|" + norm(nome) + "|" + senha).digest("hex");
console.log(` {id:"${id}",name:"${nome}",hash:"${hash}"},`);
