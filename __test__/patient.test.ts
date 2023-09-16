import request from "supertest";
import app from "../src/server";
import PatientCreateDto from "../src/dto/PatientCreateDto";

const patientData: PatientCreateDto = {
  firstName: "Jan",
  lastName: "Nowak",
  phoneNumber: "123456785",
  pesel: "34721067437",
  password: "password123",
  email: "janusz1@mail.com",
};

let patientId = "";
let token = "";
describe("Test patient routes", () => {
  // closing the server
  afterEach(async () => {
    await app.server.close();
  });

  describe("POST", () => {
    test("Create patient", async () => {
      const res = await request(app.express)
        .post("/api/patient/")
        .send(patientData);
      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe("Jan");
      patientId = res.body.id;
      token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
    });
  });

  describe("GET", () => {
    test("Get all patient", async () => {
      const res = await request(app.server)
        .get("/api/patient/")
        .set("Cookie", [`token=${token}`]);

      expect(res.status).toBe(200);
    });

    test("Get patient by id", async () => {
      const res = await request(app.server).get("/api/patient/id/" + patientId);
      expect(res.status).toBe(200);
    });
  });

  describe("PUT", () => {
    test("Update patient", async () => {
      patientData.firstName = "Janusz";
      const res = await request(app.express)
        .put("/api/patient/" + patientId)
        .send(patientData);
      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe("Janusz");
    });
  });

  describe("DELETE", () => {
    test("Delete patient", async () => {
      const res = await request(app.express).delete(
        "/api/patient/" + patientId
      );
      expect(res.body).toEqual({ message: "Udało się usunąć pacienta" });
    });
  });
});
