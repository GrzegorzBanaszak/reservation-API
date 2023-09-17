import request from "supertest";
import app from "../src/server";
import DoctorCreateDto from "../src/dto/DoctorCreateDto";

const doctorData: DoctorCreateDto = {
  firstName: "Jan",
  lastName: "Nowak",
  phoneNumber: "123456785",
  password: "password123",
  email: "janusz1@mail.com",
  specialization: "Ogólna",
};

let doctorId = "";
let token = "";

describe("Test doctor routes", () => {
  afterEach(async () => {
    app.server.close();
  });

  describe("POST", () => {
    test("Create doctor", async () => {
      const res = await request(app.express)
        .post("/api/doctor")
        .send(doctorData);
      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe(doctorData.firstName);
      doctorId = res.body.id;
      token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
    });
  });

  describe("GET", () => {});

  describe("DELETE", () => {
    test("Delete doctor", async () => {
      const res = await request(app.express).delete(`/api/doctor/${doctorId}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Udało się usunąć doktora" });
    });
  });
});
