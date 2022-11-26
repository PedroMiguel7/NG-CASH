# TRYBE

Aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.


## RUN PROJECT AND USE

- Run `sudo docker-compose up --build`
- Browse `http://localhost:3050/`

## <a href="https://github.com/PedroMiguel7/NG-CASH/tree/main/service">Backend</a>

  - **Stack Base**
    - Um servidor em Node.js utilizando Typescript;
    - Um ORM de sua preferência;
    - Um bancos de dados PostgreSQL.
  - **Arquitetura** (Veja o diagrama abaixo p/ entender melhor)

    - Tabela **Users:**
      - id —> _PK_
      - username (o @ do usuário)
      - password (_hasheada_)
      - accountId —> _FK_ Accounts[id]
    - Tabela **Accounts:**
      - id —> _PK_
      - balance
    - Tabela **Transactions:**
      - id —> _PK_
      - debitedAccountId —> _FK_ Accounts[id]
      - creditedAccountId —> _FK_ Accounts[id]
      - value
      - createdAt

  - **As seguintes regras de negócio devem ser levadas em consideração durante o processo de estruturação dos _endpoints_:**
    - Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando _username_ e _password_.
    - Deve-se garantir que cada _username_ seja único e composto por, pelo menos, 3 caracteres.
    - Deve-se garantir que a _password_ seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser _hashada_ ao ser armazenada no banco.
    - Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um _balance_ de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela **Accounts** não deverá ser afetada.
    - Todo usuário deverá conseguir logar na aplicação informando _username_ e _password._ Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
    - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio _balance_ atual. Um usuário A não pode visualizar o _balance_ de um usuário B, por exemplo.
    - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um _cash-out_ informando o _username_ do usuário que sofrerá o _cash-in_), caso apresente _balance_ suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
    - Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.
    - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (_cash-out_ e _cash-in_) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
    - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
    - Data de realização da transação e/ou
      - Transações de _cash-out;_
      - Transações de _cash-in._

## <a href="https://github.com/PedroMiguel7/NG-CASH/tree/main/ui">Frontend</a>

- **Stack Base** - React ou Next utilizando Typescript; - CSS3 ou uma biblioteca de estilização de sua preferência;
  - **As seguintes regras de negócio devem ser levadas em consideração durante a estruturação da interface visual:**
    - Página para realizar o cadastro na NG informando _username_ e _password._
    - Página para realizar o login informando _username_ e _password._
    - Com o usuário logado, a página principal deve apresentar:
      - _balance_ atual do usuário;
      - Seção voltada à realização de transferências para outros usuários NG a partir do _username_ de quem sofrerá o _cash-in_;
      - Tabela com os detalhes de todas as transações que o usuário participou;
      - Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo _cash-in_/_cash-out_;
      - Botão para realizar o _log-out._
