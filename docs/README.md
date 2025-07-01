# 📱 DevPhone – Website Responsivo
## **Deploy Vercel:** [Clique aqui ↗](https://devphone.vercel.app/apresentacao.html)
![Screenshot_25](https://github.com/user-attachments/assets/134e0484-20eb-46e1-a9c6-9d08bb6b9237)




## 📌 Sobre o Projeto

O **DevPhone** é um site fictício desenvolvido como vitrine digital para uma linha imaginária de smartphones de alta tecnologia. Recriando o site e a estética da Apple, o projeto busca oferecer uma experiência moderna, fluida e responsiva, com forte apelo visual, interação via JavaScript e boas práticas de SEO e segurança.

Este projeto foi criado como parte da atividade MAPA da disciplina de **Programação Front-End** (Engenharia de Software - Unicesumar) e também serve como item de portfólio pessoal.


## 🎯 Objetivos

* Reproduzir um layout moderno e elegante com base no estilo Apple (semi-flat design).
* Aplicar conceitos aprendidos na disciplina: **HTML5**, **CSS3**, **JavaScript**, responsividade, SEO e interatividade.
* Demonstrar domínio técnico com scripts, carrosséis, animações e formulário funcional.
* Adotar medidas reais de segurança utilizando **Pipedream**.


## 🧱 Estrutura de Pastas

### 📁 /src

> Código-fonte principal do projeto

Contém:

* HTML estruturado por páginas (index.html, produtos.html, etc.)
* CSS modular e responsivo (style.css)
* Scripts JavaScript (productCarousel.js, heroVideoControl.js, formHandler.js, starWarsIntro.js)
* Recursos visuais (SVGs, vídeos e imagens)


### 📁 /public

> Arquivos públicos acessíveis diretamente pelo navegador

Inclui:

* index.html (para redirecionamento SPA, se necessário)
* favicon.ico, ícones, fontes e arquivos estáticos
* Imagens e logos que não requerem build


### 📁 /docs

> Documentação e versão buildada para hospedagem

Utilizada para:

* Armazenar a versão final do projeto para **GitHub Pages** ou documentação estática
* Disponibilizar o **relatório em PDF**, capturas de tela e guias técnicos


### 📁 /build ou /dist

> Saída final para produção

Gerada automaticamente com ferramentas de build como **Vite**, **Webpack** ou similares (opcional neste projeto).

Contém:

* HTML, CSS e JS minificados e otimizados
* Arquivos prontos para deploy


## 🔒 Segurança com Webhooks

Utilizamos **Pipedream** como camada de segurança para o envio de formulários para o Discord. Após incidente com webhook exposto, o novo sistema garante que apenas requisições originadas do site hospedado no Vercel sejam aceitas, via token e chave secreta.


## ✨ Funcionalidades em Destaque

* Layout responsivo e mobile-first
* Menu de navegação funcional
* Formulário de contato com validação, anti-spam e integração com Discord
* Carrossel interativo de produtos
* Animação de introdução estilo Star Wars com **GSAP**
* Scroll suave com **Lenis**
* Efeitos visuais diversos em JavaScript


## 🧪 Scripts

| Script              | Função                                       |
| --------------------| -------------------------------------------- |
| formHandler.js      | Envio de formulário                          |
| productCarousel.js  | Navegação horizontal dos cards               |
| heroVideoControl.js | Controle de vídeo autoplay/pause             |
| starWarsIntro.js    | Animação de introdução e chamada do conteúdo |


## 🌐 SEO e Acessibilidade

* Tags semânticas (header, main, footer)
* Meta tags (description, keywords, viewport)
* Imagens com atributos alt
* Classes utilitárias (.visually-hidden, .nowrap)
* Compatibilidade com diferentes tamanhos de tela (media queries)


## 📸 Prints & PDF

Capturas de tela do projeto e relatório detalhado estão disponíveis na [página de apresentação](#) e na pasta `/docs`.


## 📄 Licenciamento e Créditos

* Imagens: [Flaticon](https://www.flaticon.com/), [SVGRepo](https://www.svgrepo.com/), [Pexels](https://www.pexels.com/)
* Música (introdução): *Star Wars – The Force Theme (Far Out Remix)* – Copyright Free

## 📬 Contato

* [LinkedIn](https://linkedin.com/in/guilhermeferreira)
* [GitHub](https://github.com/GuilhermeF-R)
* Instagram / TikTok: @devgferreira
