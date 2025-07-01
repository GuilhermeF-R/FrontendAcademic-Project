const form = document.getElementById("feedback-form");
const status = document.getElementById("status");

const MAX_SUBMITS_PER_DAY = 5;
const MAX_LENGTHS = {
  nome: 50,
  email: 100,
  mensagem: 500
};

const SECRET_KEY = "VERIFICADOR_@1gQBOT"; // Chave secreta fixa
const TOKEN_STORE_ENDPOINT = "https://eor4diyw5i2dc5r.m.pipedream.net"; // workflow que armazena token
const WEBHOOK_ENDPOINT = "https://eoxyaqhni4imh4a.m.pipedream.net"; // workflow que recebe o feedback

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

// Gera token simples no frontend
function gerarTokenSimples() {
  return Math.random().toString(36).substring(2, 18);
}

// Envia token + validade para o workflow armazenar no data store
async function salvarTokenNoWorkflow(token) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos

  const payload = { token, expiresAt };

  const res = await fetch(TOKEN_STORE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar token no workflow.");
  }
}

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

  let tokenTemp = gerarTokenSimples();

  try {
    // Salva o token + validade no workflow
    await salvarTokenNoWorkflow(tokenTemp);
  } catch (err) {
    status.textContent = err.message;
    status.style.color = "red";
    return;
  }

  const payload = {
    content: `📬 **Novo Feedback Recebido**\n👤 Nome: ${nome}\n📧 Email: ${email}\n💬 Mensagem: ${mensagem}`
  };

  try {
    const response = await fetch(WEBHOOK_ENDPOINT, {
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
    } else {
      const errRes = await response.text();
      throw new Error("Erro ao enviar: " + errRes);
    }
  } catch (error) {
    console.error(error);
    status.textContent = "❌ Erro ao enviar. Tente novamente.";
    status.style.color = "red";
  }
});
