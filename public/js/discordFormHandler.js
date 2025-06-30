const form = document.getElementById("feedback-form");
const status = document.getElementById("status");

const MAX_SUBMITS_PER_DAY = 5;
const MAX_LENGTHS = {
  nome: 50,
  email: 100,
  mensagem: 500
};

// Função para verificar links simples no texto
function contemLink(texto) {
  // Regex para detectar urls (http, https, www)
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
  return urlPattern.test(texto);
}

// Função para contar envios no dia atual (usa localStorage)
function podeEnviar() {
  const hoje = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  let dados = JSON.parse(localStorage.getItem('enviosFeedback')) || {};

  if (dados.data !== hoje) {
    // Resetar contagem se for outro dia
    dados = { data: hoje, count: 0 };
  }

  if (dados.count >= MAX_SUBMITS_PER_DAY) {
    return false;
  }
  return true;
}

function registrarEnvio() {
  const hoje = new Date().toISOString().slice(0, 10);
  let dados = JSON.parse(localStorage.getItem('enviosFeedback')) || {};

  if (dados.data !== hoje) {
    dados = { data: hoje, count: 1 };
  } else {
    dados.count++;
  }

  localStorage.setItem('enviosFeedback', JSON.stringify(dados));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Validação campos obrigatórios
  if (!nome || !email || !mensagem) {
    status.textContent = "❌ Preencha todos os campos.";
    status.style.color = "red";
    return;
  }

  // Limite de caracteres
  if (nome.length > MAX_LENGTHS.nome) {
    status.textContent = `❌ Nome deve ter até ${MAX_LENGTHS.nome} caracteres.`;
    status.style.color = "red";
    return;
  }
  if (email.length > MAX_LENGTHS.email) {
    status.textContent = `❌ Email deve ter até ${MAX_LENGTHS.email} caracteres.`;
    status.style.color = "red";
    return;
  }
  if (mensagem.length > MAX_LENGTHS.mensagem) {
    status.textContent = `❌ Mensagem deve ter até ${MAX_LENGTHS.mensagem} caracteres.`;
    status.style.color = "red";
    return;
  }

  // Verificar presença de links
  if (contemLink(nome) || contemLink(email) || contemLink(mensagem)) {
    status.textContent = "❌ Links não são permitidos nos campos.";
    status.style.color = "red";
    return;
  }

  // Verificar limite diário de envios
  if (!podeEnviar()) {
    status.textContent = "⚠️ Você atingiu o limite de 5 envios hoje. Por favor, tente novamente amanhã.";
    status.style.color = "orange";
    return;
  }

  const webhookURL = "https://eoxyaqhni4imh4a.m.pipedream.net";//////////////////////////////////////////////////////////// ⚠️

  const payload = {
    content: `📬 **Novo Feedback Recebido**\n👤 Nome: ${nome}\n📧 Email: ${email}\n💬 Mensagem: ${mensagem}`
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      registrarEnvio();
      status.textContent = "✅ Feedback enviado com sucesso!";
      status.style.color = "green";
      form.reset();
    } else {
      throw new Error("Erro ao enviar para o Discord.");
    }
  })
  .catch(error => {
    status.textContent = "❌ Erro ao enviar. Tente novamente.";
    status.style.color = "red";
  });
});
