
  ### 🏁 Pré-requisitos
  Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
  [Git](https://git-scm.com) e o [Docker](https://www.docker.com/).

  ### 🎲 Rodando
  - Clone este repositório <br>
  ```git clone https://github.com/Casmei/emprestimo-letalk.git```

  - Acesse a pasta do projeto no terminal/cmd <br>
  ```cd emprestimo-letalk```
  - Verifique se a porta 3306 do seu computador esta livre
  - Inicialize o seu docker e rode o comando <br>```docker compose up --build```
  - Popule os entrando dentro do container e rodando <br> ```npx prisma db seed```
  - Acesse <http://localhost:5173>

