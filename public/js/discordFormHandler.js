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

form.addEventListener("submit", function (e) {
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

  const webhookURL = "https://eoxyaqhni4imh4a.m.pipedream.net"; // Seu webhook do Pipedream
  const SECRET_KEY = "VERIFICADOR_@1gQBT"; // Substitua por sua chave real

  const payload = {
    content: `📬 **Novo Feedback Recebido**\n👤 Nome: ${nome}\n📧 Email: ${email}\n💬 Mensagem: ${mensagem}`
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": SECRET_KEY
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
        throw new Error("Erro ao enviar.");
      }
    })
    .catch(error => {
      status.textContent = "❌ Erro ao enviar. Tente novamente.";
      status.style.color = "red";
    });
});
