"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const patientData = {
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
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server_1.default.server.close();
    }));
    describe("POST", () => {
        test("Create patient", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default.express)
                .post("/api/patient/")
                .send(patientData);
            expect(res.status).toBe(201);
            expect(res.body.firstName).toBe("Jan");
            patientId = res.body.id;
            token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
        }));
    });
    describe("GET", () => {
        test("Get all patient", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default.server)
                .get("/api/patient/")
                .set("Cookie", [`token=${token}`]);
            expect(res.status).toBe(200);
        }));
        test("Get patient by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default.server).get("/api/patient/id/" + patientId);
            expect(res.status).toBe(200);
        }));
    });
    describe("PUT", () => {
        test("Update patient", () => __awaiter(void 0, void 0, void 0, function* () {
            patientData.firstName = "Janusz";
            const res = yield (0, supertest_1.default)(server_1.default.express)
                .put("/api/patient/" + patientId)
                .send(patientData);
            expect(res.status).toBe(201);
            expect(res.body.firstName).toBe("Janusz");
        }));
    });
    describe("DELETE", () => {
        test("Delete patient", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default.express).delete("/api/patient/" + patientId);
            expect(res.body).toEqual({ message: "Udało się usunąć pacienta" });
        }));
    });
});
