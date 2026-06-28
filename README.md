# 🧪 Projeto Pokédex — React Testing Library (RTL)

Este repositório foi desenvolvido para consolidar meus conhecimentos em testes automatizados no ecossistema React. A partir de uma aplicação Pokédex 100% funcional, o principal desafio foi mapear comportamentos, fluxos de navegação e seletores para garantir a resiliência do código contra regressões e refatorações.

---

## 🧠 Aprendizados e Habilidades Desenvolvidas

Ao longo do desenvolvimento dos testes deste projeto, capacitei-me a:

### 1. Dominar Seletores Avançados (Queries)
*   Utilizar de forma semântica e eficiente as queries da **React Testing Library** (como `getByRole`, `getByText`, `getByTestId` e `getByAltText`) priorizando sempre a acessibilidade da aplicação.

### 2. Simulação de Eventos de Usuário
*   Interagir com elementos da interface simulando o comportamento real do usuário em botões de navegação, cliques alternados em caixas de seleção (*checkboxes*) e inputs de formulário.

### 3. Testes de Fluxos Lógicos e Assíncronos
*   Gerenciar o ciclo de vida dos componentes e testar comportamentos dinâmicos que envolvem caminhos e renderizações condicionais na tela.

### 4. Testes de Roteamento com React Router
*   Mapear e testar o comportamento de links de navegação (`Home`, `About`, `Favorite Pokémon`) utilizando funções utilitárias como `renderWithRouter`, garantindo que URLs inválidas sejam redirecionadas corretamente para páginas de erro (*Not Found*).

### 5. Resiliência a Refatorações e Falsos Positivos
*   Escrever testes baseados no comportamento final (o que o usuário vê) e não na implementação interna das funções, permitindo que a estrutura dos componentes seja modificada no futuro sem a necessidade de alterar os testes existentes.
*   Evitar cenários de **falsos positivos**, garantindo que as asserções falhem caso o código original seja modificado incorretamente.

### 6. Testes de Mutação (Stryker Mutator)
*   Trabalhar ativamente com o conceito de **testes de mutação**. Entendi na prática como "matar os mutantes" injetados pelo avaliador automatizado, assegurando 100% de cobertura lógica e garantindo que nenhum caso de uso ficasse desprotegido.

---

## 🛠️ Tecnologias Utilizadas

*   **React** (TypeScript)
*   **Jest** (Test Runner)
*   **React Testing Library (RTL)**
*   **Stryker** (Mutation Testing)
*   **ESLint / StyleLint** (Ferramentas de qualidade de código)

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone git@github.com:seu-usuario/sd-0x-project-react-testing-library.git
   cd sd-0x-project-react-testing-library
2. Instale as dependências:  
    `npm install`
3. Execute os testes localmente:  
    `npm test`
4. Execute os testes de mutação com o stryker (exemplo para o componente app):
    `npx stryker run ./stryker/App.conf.json`
5. Verifique a cobertura total do código:
    `npm run test-coverage`
