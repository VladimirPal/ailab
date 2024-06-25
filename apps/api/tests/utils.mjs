import supertest from "supertest";
import app from "../app.mjs";

const request = supertest.agent(app);

export async function loginAccount() {
  const result = await request
    .post("/api/auth/signin")
    .send({ email: "testAccount@ailab.internal", password: "password" });

  if (result.body.jwtToken) {
    request.set("Authorization", `Bearer ${result.body.jwtToken}`);
  }
  return result;
}

export { request };
