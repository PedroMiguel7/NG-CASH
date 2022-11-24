import { server } from "../src/index";
import request from "supertest";
const uuid = require("uuid").v4;

let user_id_A = 0;
const login = async () => {
  const senha = "Ae2@EEee";
  let user = {
    username: uuid(),
    password: senha,
  };
  const response = await request(server).post("/user").send(user);
  user_id_A = response.body.data.id;

  const responselogin = await request(server)
    .post("/login")
    .send({
      email: `${user.username}`,
      senha: `${user.password}`,
    });
  return responselogin.body.token;
};

describe("Testes de transferências", () => {
  // Transferindo um usuario A para B.
  it("should transfer between users", async () => {
    const token = await login();
    //criando um novo usuario
    const senha = "Ae2@EEee";
    let userB = {
      username: uuid(),
      password: senha,
    };
    const responseuser = await request(server).post("/user").send(userB);

    let transaction = {
      account: `${user_id_A}`,
      usernameIN: `${responseuser.body.username}`,
      value: 2,
    };

    const response = await request(server)
      .post(`/transaction/${transaction.account}`)
      .send(transaction)
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // Obtendo dados das transações de um usuário
  it("should get transactions a user", async () => {
    const token = await login();

    const response = await request(server)
      .get(`/transaction/${user_id_A}`)
      .set("Authorization", `bearer ${token}`);

    expect(response.status).toBe(200);
  });

  // Obtendo dados das transações de um usuário com filtros
  it("should get filtered transactions a user", async () => {
    const token = await login();

    const response = await request(server)
      .get(
        `/transaction/${user_id_A}?filter=cash-out&order=createdAt&desc=false`
      )
      .set("Authorization", `bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
