import request from "supertest";
import app from "../src/server";

describe("Doctors", () => {
  // closing the server
  afterEach(async () => {
    await app.server.close();
  });

  describe("GET", () => {
    test("Get all doctors", async () => {
      const res = await request(app.server).get("/api/doctor/");
      expect(res.status).toBe(200);
    });
  });
});
