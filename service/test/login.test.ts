import { server } from "../src/index";
import request from "supertest";
const uuid = require("uuid").v4;

describe("Testes de Login", () => {
  // Cadastrando um usuario e vendo se é possível fazer login com ele
  it("should login", async () => {
    const senha = "Ae2@EEee";
    let user = {
      username: uuid(),
      password: senha,
    };

    const response = await request(server).post("/user").send(user);
    expect(response.status).toBe(201);

    const login = await request(server).post("/login").send(user);
    expect(login.status).toBe(200);
    expect(login.body.auth).toBe(true);
  });

  // Cadastrando um usuario e vendo se é possível fazer login com a senha errada
  it("should not login with a wrong password", async () => {
    const senha = "Ae2@EEee2";
    let user = {
      username: uuid(),
      password: senha,
    };

    const response = await request(server).post("/user").send(user);
    expect(response.status).toBe(201);

    const login = await request(server).post("/login").send({
      username: user.username,
      password: uuid(),
    });
    expect(login.status).toBe(400);
    expect(login.body.auth).toBe(false);
  });

  // Tentando fazer login com um usuário inexistente
  it("should not login with a invalide user", async () => {
    let user = {
      username: uuid(),
      password: uuid(),
    };

    const login = await request(server).post("/login").send(user);
    expect(login.status).toBe(400);
    expect(login.body.auth).toBe(false);
  });
});
