import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { request } from "./utils.mjs";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

chai.should();

describe("POST /api/auth/signup", () => {
  const timestamp = +new Date();
  const newUser = {
    email: `${timestamp}@example.com`,
    password: "password123",
  };

  it("should create a new user and return a JWT token", async () => {
    const result = await request.post("/api/auth/signup").send(newUser);

    expect(result).to.have.status(201);
    expect(result.body).to.have.property("jwtToken");
    expect(result.body.jwtToken).to.be.a("string");
  });

  it("should not allow signup with an existing email", async () => {
    const existingUser = newUser;
    const result = await request.post("/api/auth/signup").send(existingUser);

    expect(result).to.have.status(409);
    expect(result.body).to.have.property("error");
  });

  it("should validate the required fields", async () => {
    const incompleteUser = {
      email: "newuser@example.com",
      // Missing password
    };
    const result = await request.post("/api/auth/signup").send(incompleteUser);

    expect(result).to.have.status(400);
    expect(result.body).to.have.property("error");
  });
});
