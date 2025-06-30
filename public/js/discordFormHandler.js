const form = document.getElementById("feedback-form");
const status = document.getElementById("status");

const MAX_SUBMITS_PER_DAY = 5;
const MAX_LENGTHS = {
  nome: 50,
  email: 100,
  mensagem: 500
};

const SECRET_KEY = "VERIFICADOR_@1gQBOT"; // Chave secreta fixa

let tokenTemp = ""; // Token temporário

async function pegarToken() {
  try {
    const res = await fetch("https://eozro0mkz7fraud.m.pipedream.net"); // endpoint que gera o token temporário
    if (!res.ok) throw new Error("Erro ao obter token");
    const data = await res.json();
    tokenTemp = data.token;
  } catch {
    status.textContent = "❌ Erro ao obter token. Atualize a página.";
    status.style.color = "red";
  }
}

function contemLink(texto) {
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
  return urlPattern.test(texto);
}

function podeEnviar() {
  const hoje = new Date().toISOString().slice(0, 10);
  let dados = JSON.parse(localStorage.getItem('enviosFeedback')) || {};
  if (dados.data !== hoje) dados = { data: hoje, count: 0 };
  return dados.count < MAX_SUBMITS_PER_DAY;
}

function registrarEnvio() {
  const hoje = new Date().toISOString().slice(0, 10);
  let dados = JSON.parse(localStorage.getItem('enviosFeedback')) || {};
  dados = dados.data !== hoje ? { data: hoje, count: 1 } : { ...dados, count: dados.count + 1 };
  localStorage.setItem('enviosFeedback', JSON.stringify(dados));
}

window.addEventListener("load", () => {
  pegarToken();
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    status.textContent = "❌ Preencha todos os campos.";
    status.style.color = "red";
    return;
  }

  if (nome.length > MAX_LENGTHS.nome || email.length > MAX_LENGTHS.email || mensagem.length > MAX_LENGTHS.mensagem) {
    status.textContent = "❌ Um ou mais campos excedem o limite de caracteres.";
    status.style.color = "red";
    return;
  }

  if (contemLink(nome) || contemLink(email) || contemLink(mensagem)) {
    status.textContent = "❌ Links não são permitidos nos campos.";
    status.style.color = "red";
    return;
  }

  if (!podeEnviar()) {
    status.textContent = "⚠️ Você atingiu o limite de 5 envios hoje.";
    status.style.color = "orange";
    return;
  }

  if (!tokenTemp) {
    status.textContent = "❌ Token inválido ou expirado. Atualize a página.";
    status.style.color = "red";
    return;
  }

  const webhookURL = "https://eoxyaqhni4imh4a.m.pipedream.net";

  const payload = {
    content: `📬 **Novo Feedback Recebido**\n👤 Nome: ${nome}\n📧 Email: ${email}\n💬 Mensagem: ${mensagem}`
  };

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_KEY,
        "x-temp-token": tokenTemp
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      registrarEnvio();
      status.textContent = "✅ Feedback enviado com sucesso!";
      status.style.color = "green";
      form.reset();
      await pegarToken(); // pega novo token depois do envio
    } else {
      throw new Error("Erro ao enviar.");
    }
  } catch {
    status.textContent = "❌ Erro ao enviar. Tente novamente.";
    status.style.color = "red";
  }
});
