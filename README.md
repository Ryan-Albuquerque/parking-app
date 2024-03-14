# Projeto Parking System

Bem-vindo ao projeto Parking System! Este projeto é uma aplicação construída com Next.js e utiliza a variável de ambiente `NEXT_PUBLIC_API_URL` para configurar a URL da API.

## Configuração da Variável de Ambiente

Para configurar a URL da API, siga as etapas abaixo:

1. Crie um arquivo `.env.local` na raiz do projeto.

2. Adicione a seguinte linha ao arquivo `.env.local`:

   ```plaintext
   NEXT_PUBLIC_API_URL=https://localhost:7014
   ```

   Certifique-se de substituir `https://localhost:7014` pela URL da sua API.

## Execução do Projeto

Siga as instruções abaixo para executar o projeto:

1. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   Isso iniciará o projeto Next.js. A variável de ambiente `NEXT_PUBLIC_API_URL` estará disponível para uso durante o desenvolvimento.

## Contribuindo

Se desejar contribuir com este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade (`git checkout -b feature/minha-funcionalidade`).
3. Faça commit das suas alterações (`git commit -am 'Adicionando nova funcionalidade'`).
4. Faça push para a branch (`git push origin feature/minha-funcionalidade`).
5. Crie um novo pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
