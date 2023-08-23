import request from "supertest";
import app from "../src/server";
import HospitalCreateDto from "../src/dto/HospitalCreateDto";

const hospitalCreatedData = new HospitalCreateDto(
  "Wiosenny",
  "Wrocław",
  "Sosnowa",
  "1"
);
let createdId: string;
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

  describe("POST", () => {
    test("Create hospital", async () => {
      const res = await request(app.express)
        .post("/api/hospital/")
        .send(hospitalCreatedData);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Wiosenny");
      createdId = res.body.id;
    });
  });

  describe("PUT", () => {
    test("Create hospital", async () => {
      hospitalCreatedData.name = "Wojskowy";
      const res = await request(app.express)
        .put("/api/hospital/" + createdId)
        .send(hospitalCreatedData);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Wojskowy");
    });
  });

  describe("DELETE", () => {
    test("Delete hospital", async () => {
      const res = await request(app.express).delete(
        "/api/hospital/" + createdId
      );
      expect(res.body).toEqual({ message: "Udało się usunąć szpital" });
    });
  });
});
