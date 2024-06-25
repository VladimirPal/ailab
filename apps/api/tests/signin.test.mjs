import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { request } from "./utils.mjs";

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

chai.should();

describe("POST /api/auth/signin", () => {
  const email = "testAccount@ailab.internal";
  const notExistingEmail = "testAccountNotExisting@ailab.internal";

  it("should sign in a user with valid credentials", async () => {
    const password = "password";

    const result = await request.post("/api/auth/signin").send({
      email,
      password,
    });

    expect(result.status).to.equal(200);
    expect(result.body.jwtToken).to.be.a("string");
  });

  it("should reject signin with incorrect password", async () => {
    const password = "wrongpassword";

    const result = await request.post("/api/auth/signin").send({
      email,
      password,
    });

    expect(result).to.have.status(401);
    expect(result.body).to.have.property("error");
  });

  it("should reject signin for a not existent email", async () => {
    const result = await request.post("/api/auth/signin").send({
      email: notExistingEmail,
      password: "nomatter",
    });

    expect(result).to.have.status(401);
    expect(result.body).to.have.property("error");
  });
});
