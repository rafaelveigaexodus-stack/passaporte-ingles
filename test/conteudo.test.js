// Confere o conteúdo do curso antes de publicar. Roda com: node test/conteudo.test.js
// Cada erro corrigido no futuro ganha um teste aqui (ERRO N) e uma linha em ERROS.md.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "public", "index.html"), "utf8");
const js = (html.match(/<script>([\s\S]*?)<\/script>/) || [])[1];
let falhas = 0;
const ok = (cond, msg) => { if (!cond) { falhas++; console.error("FALHOU: " + msg); } };

ok(js, "a página precisa ter o script do curso");
new vm.Script(js); // erro de sintaxe derruba o teste aqui

// pega LEVELS e SKILLS rodando só a parte de dados
const dados = js.slice(js.indexOf("const SKILLS="), js.indexOf("/* shuffle answer options"));
const ctx = { I: new Proxy({}, { get: () => "" }) };
vm.createContext(ctx);
vm.runInContext(dados + ";this.LEVELS=LEVELS;this.SKILLS=SKILLS;", ctx);
const { LEVELS, SKILLS } = ctx;

ok(LEVELS.length === 5, "o curso tem 5 níveis (Família, Shopping, Restaurante, Lazer, Trabalho)");
LEVELS.forEach((L, li) => {
  SKILLS.forEach(s => {
    const P = L.phases[s.key], onde = `Nível ${li + 1} ${L.env} / ${s.name}`;
    ok(P, onde + ": fase existe");
    if (!P) return;
    ok(P.chunks.length >= 4, onde + ": pelo menos 4 blocos prontos");
    ok(P.items.length === 5, onde + ": exatamente 5 exercícios (a regra é 3 de 5 para passar)");
    P.items.forEach((it, i) => {
      const e = `${onde} #${i + 1}`;
      if (it.o) {
        ok(it.a >= 0 && it.a < it.o.length, e + ": resposta certa está entre as opções");
        ok(new Set(it.o).size === it.o.length, e + ": opções sem repetição");
      }
      if (it.ans) {
        const low = it.ans.map(w => w.toLowerCase().replace(/[^a-z']/g, ""));
        it.x.forEach(x => ok(!low.includes(x.toLowerCase()), e + `: peça extra "${x}" não pode ser palavra da resposta`));
      }
      if (it.t === "type") ok(it.acc.length && it.show, e + ": escrita livre tem respostas aceitas e resposta mostrada");
      if (it.t === "read") ok(it.text && it.pt && it.q, e + ": leitura tem texto, tradução e pergunta");
      if (it.t === "speak") ok(it.en && it.pt && it.pr, e + ": fala tem frase, tradução e pronúncia");
      if (it.t === "listen" || it.t === "lbuild") ok(it.say, e + ": audição tem frase para tocar");
    });
  });
});

if (falhas) { console.error(`\n${falhas} problema(s). Não publique.`); process.exit(1); }
console.log("Conteúdo do curso OK: " + LEVELS.length + " níveis, " + LEVELS.length * 20 + " exercícios.");
