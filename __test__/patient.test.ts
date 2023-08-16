import request from "supertest";
import App from "../src/modules/App";

const app = new App();

describe("Test patient routes", () => {
  test("Get all patient", async () => {
    const res = await request(app.express).get("/patient/getAll");
    expect(res.body).toBe(Array);
  });
});
