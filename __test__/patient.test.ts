import request from "supertest";
import App from "../src/modules/App";

const appMain = new App();

describe("Test patient routes", () => {
  test("Get all patient", async () => {
    const res = await request(appMain.app).get("/patient/getAll");
    expect(res.body).toEqual({ name: "test" });
  });
});
