import request from "supertest";
import app from "../src/server";
import DoctorCreateDto from "../src/dto/DoctorCreateDto";

const doctor = new DoctorCreateDto(
  "Mariusz",
  "Nowak",
  "Chirurgia",
  "345213345"
);
let createdId: string;

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

  describe("POST", () => {
    test("Create doctor", async () => {
      const res = await request(app.express).post("/api/doctor/").send(doctor);
      expect(res.status).toBe(201);
      createdId = res.body.id;
    });
  });

  describe("DELETE", () => {
    test("Delete doctor", async () => {
      const res = await request(app.express).delete("/api/doctor/" + createdId);
      expect(res.body).toEqual({ message: "Udało się usunąć doktora" });
    });
  });
});
