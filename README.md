
  ### 🏁 Pré-requisitos
  Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
  [Git](https://git-scm.com) e o [Docker](https://www.docker.com/).

  ## 🎲 Rodando
  - Clone este repositório <br>
  ```git clone https://github.com/Casmei/emprestimo-letalk.git```

  - Acesse a pasta do projeto no terminal/cmd <br>
  ```cd emprestimo-letalk```
  - Verifique se a porta 3306 e 3000 do seu computador estão livres
  - Inicialize o seu docker e rode o comando <br>```docker compose up --build```
  
  ### Banco de dados
  - Entre dentro do container da api para realizar os comandos do prisma <br> ```docker exec -itu 0 letalk-letalk-api-1 sh```
  - Faça a migração das tabelas <br> ```prisma migrate dev```
  - Popule as tabelas <br> ```npx prisma db seed```
  - Acesse http://localhost:5173 - Aplicação
  - Acesse http://localhost:3000 - Api  
  
  ## Endpoints
  Existem dois endpoint para retorno de dados
  - O primeiro é o retorno de todos os usuários que realizaram emprestimo
  - http://localhost:3000/loan
  - O segundo é todos os estados cadastrados no sistema (a principio somente 4)
  - http://localhost:3000/state
