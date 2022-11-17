import { server } from "../src/index";
import request from "supertest";
const uuid = require("uuid").v4;

let user_id = 0;
const login = async () => {
  const response = await request(server).post("/").send({
    email: "admin10",
    senha: "ad@Aad2a",
  });
  return response.body.token;
};

describe("Testes de usuário", () => {
  // Cadastrando um usuario.
  it("should create user", async () => {
    const senha = "Ae2@EEee";
    let user = {
      username: uuid(),
      password: senha,
    };

    const response = await request(server).post("/user").send(user);
    expect(response.status).toBe(201);
    user_id = response.body.data.id;
  });

  // Obtendo dados do usuário
  it("should get data people", async () => {
    const token = await login();

    const response = await request(server)
      .get(`/user/${user_id}`)
      .set("Authorization", `bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should update user", async () => {
    const token = await login();
    let username = uuid();

    const response = await request(server).post(`/user/${user_id}`).send(username).set("Authorization", `bearer ${token}`);;
    expect(response.status).toBe(200);
  });

  // Apagando uma pessoa
  it("should delete a pessoa", async () => {
    const token = await login();

    const response = await request(server)
      .delete(`/user/${user_id}`)
      .set("Authorization", `bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
