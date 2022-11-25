# TRYBE

Aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## <a href="https://github.com/PedroMiguel7/NG-CASH/tree/main/service">Backend</a>

- Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um _balance_ de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela **Accounts** não deverá ser afetada.
- Todo usuário deverá conseguir logar na aplicação informando _username_ e _password._ Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio _balance_ atual. Um usuário A não pode visualizar o _balance_ de um usuário B, por exemplo.
- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um _cash-out_ informando o _username_ do usuário que sofrerá o _cash-in_), caso apresente _balance_ suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
- Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.

## <a href="https://github.com/PedroMiguel7/NG-CASH/tree/main/ui">Frontend</a>

- Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um _balance_ de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela **Accounts** não deverá ser afetada.
- Todo usuário deverá conseguir logar na aplicação informando _username_ e _password._ Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio _balance_ atual. Um usuário A não pode visualizar o _balance_ de um usuário B, por exemplo.
- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um _cash-out_ informando o _username_ do usuário que sofrerá o _cash-in_), caso apresente _balance_ suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
- Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.


## TO USE

;...