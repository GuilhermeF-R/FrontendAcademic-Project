# Estrutura do Projeto

Este projeto segue uma estrutura organizada para facilitar o desenvolvimento, manutenção e publicação. Abaixo está a explicação de cada uma das principais pastas:

---

## 📁 src/

> Código-fonte principal do projeto.

Contém todos os arquivos de desenvolvimento, como:

- Componentes (ex: React, Vue)
- Estilos (CSS, SCSS, etc.)
- Scripts (funções, serviços, hooks)
- Configurações de rotas, contexto, etc.

🛠️ Essa é a pasta onde você escreve e mantém o código que será transformado em um aplicativo funcional.

---

## 📁 public/

> Arquivos públicos acessíveis diretamente pelo navegador.

Inclui:

- `index.html` (arquivo base para SPA)
- Imagens e ícones estáticos
- `favicon.ico`, `manifest.json`, fontes, etc.

🚫 Os arquivos aqui **não passam pelo sistema de build**. São servidos como estão.

---

## 📁 docs/

> Documentação ou build estático para hospedagem.

Usado para:

- Documentar o projeto (`README.md`, guias, tutoriais)
- Armazenar a versão de produção para deploy no GitHub Pages, por exemplo

📢 Essa pasta pode ser usada como destino de builds (`npm run build`) quando se usa GitHub Pages.

---

## 📁 build/ (ou dist/)

> Versão final e otimizada do projeto, gerada para produção.

Contém:

- Código minificado e transpilado
- HTML, CSS e JS prontos para deploy
- Arquivos otimizados por ferramentas como Webpack ou Vite

⚙️ Essa pasta é gerada automaticamente ao executar `npm run build` e geralmente está no `.gitignore`.

---

## Observação sobre pastas vazias

O Git não versiona pastas vazias. Para manter a estrutura do projeto, usamos arquivos `.gitkeep` dentro de pastas vazias.

---

#   F r o n t e n d A c a d e m i c - P r o j e c t  
 