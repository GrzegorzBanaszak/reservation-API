import request from "supertest";
import app from "../src/server";

describe("Hospitals", () => {
  // closing the server
  afterEach(async () => {
    await app.server.close();
  });

  describe("GET", () => {
    test("Get all hospitals", async () => {
      const res = await request(app.server).get("/api/hospital/");
      expect(res.status).toBe(200);
    });
  });
});
