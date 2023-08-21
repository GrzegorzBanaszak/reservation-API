import request from "supertest";
import app from "../src/server";

const patientData = {
  id: "",
  firstName: "Jan",
  lastName: "Nowak",
  phoneNumber: "123456785",
  pesel: "34721067437",
};

describe("Test patient routes", () => {
  // closing the server
  afterEach(async () => {
    await app.server.close();
  });

  describe("GET", () => {
    test("Get all patient", async () => {
      const res = await request(app.server).get("/api/patient/");
      expect(res.status).toBe(200);
    });
  });

  // test("Create patient", async () => {
  //   const res = await request(app.express)
  //     .post("/api/patient/")
  //     .send(patientData);
  //   expect(res.status).toBe(201);
  //   patientData.id = res.body.id;
  // });

  // test("Delete patient", async () => {
  //   const res = await request(app.express).delete(
  //     "/api/patient/" + patientData.id
  //   );
  //   expect(res.body).toEqual({ message: "Udało się usunąć pacienta" });
  // });
});
