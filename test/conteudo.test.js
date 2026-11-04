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

// pega MODULES, SKILLS e starsFor rodando só a parte de dados
const dados = js.slice(js.indexOf("const SKILLS="), js.indexOf("/* shuffle answer options"));
const ctx = { I: new Proxy({}, { get: () => "" }) };
vm.createContext(ctx);
vm.runInContext(dados + ";this.SKILLS=SKILLS;this.MODULES=typeof MODULES!=='undefined'?MODULES:null;this.starsFor=typeof starsFor!=='undefined'?starsFor:null;", ctx);
const { SKILLS, MODULES, starsFor } = ctx;

// ERRO 5: o curso é dividido em módulos; o Módulo 2 tem mais conteúdo (6 blocos e 6 exercícios por fase)
ok(MODULES && MODULES.length >= 2, "o curso tem pelo menos 2 módulos");
const ESPERADO = [{ itens: 5, blocos: 5 }, { itens: 6, blocos: 6 }];
const AMBIENTES = ["Família", "Shopping", "Restaurante", "Lazer", "Trabalho"];
let total = 0;
(MODULES || []).forEach((M, mi) => {
  const esp = ESPERADO[mi] || ESPERADO[ESPERADO.length - 1];
  ok(M.levels.length === 5, `Módulo ${mi + 1}: 5 níveis`);
  ok(M.levels.map(L => L.env).join() === AMBIENTES.join(), `Módulo ${mi + 1}: mesmos ambientes, na ordem ${AMBIENTES.join(", ")}`);
  M.levels.forEach((L, li) => {
    SKILLS.forEach(s => {
      const P = L.phases[s.key], onde = `Módulo ${mi + 1} / Nível ${li + 1} ${L.env} / ${s.name}`;
      ok(P, onde + ": fase existe");
      if (!P) return;
      ok(P.chunks.length === esp.blocos, `${onde}: ${esp.blocos} blocos prontos`);
      ok(P.items.length === esp.itens, `${onde}: ${esp.itens} exercícios`);
      const frases = new Set();
      P.items.forEach((it, i) => {
        total++;
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
        const chave = it.text || it.say || it.en || it.pt;
        ok(!frases.has(chave), e + ": exercício repetido na mesma fase");
        frases.add(chave);
      });
    });
  });
});

// regra das estrelas: com 5 exercícios passa com 3; com 6 passa com 4; acertar tudo = 3 estrelas
ok(typeof starsFor === "function", "existe a regra de estrelas starsFor(acertos, total)");
if (typeof starsFor === "function") {
  ok(starsFor(3, 5) === 1 && starsFor(4, 5) === 2 && starsFor(5, 5) === 3 && starsFor(2, 5) === 0, "Módulo 1: 3/5=1, 4/5=2, 5/5=3 estrelas, 2/5 não passa");
  ok(starsFor(4, 6) === 1 && starsFor(5, 6) === 2 && starsFor(6, 6) === 3 && starsFor(3, 6) === 0, "Módulo 2: 4/6=1, 5/6=2, 6/6=3 estrelas, 3/6 não passa");
}
// progresso do Módulo 2 é guardado separado do Módulo 1 (que mantém as chaves antigas)
ok(/"m"\+\(M\+1\)\+":"/.test(js), "estrelas do Módulo 2 ficam com chave própria (m2:)");
ok(/moduleOpen/.test(js) && /admin/.test(js), "Módulo 2 trancado até concluir o Módulo 1 (administrador entra livre)");

if (falhas) { console.error(`\n${falhas} problema(s). Não publique.`); process.exit(1); }
console.log(`Conteúdo do curso OK: ${MODULES.length} módulos, ${total} exercícios.`);
require("./login.test.js");
