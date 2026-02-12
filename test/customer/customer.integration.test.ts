import request from "supertest";
import application from "../../src/application";
import Data from "../data";

describe("CustomerIntegration", () => {
    describe("List", () => {
        it("should return 404", async () => {
            expect((await request(application).get("/customers")).status).toBe(404);
        });

        it("should return 200", async () => {
            await request(application).post("/customers").send(Data.customerWithoutId);
            const response = await request(application).get("/customers");
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("Get", () => {
        it("should return 404", async () => {
            expect((await request(application).get("/customers/")).status).toBe(404);
        });

        it("should return 404", async () => {
            expect((await request(application).get(`/customers/${Data.id}`)).status).toBe(404);
        });

        it("should return 200", async () => {
            const postResponse = await request(application).post("/customers").send(Data.customerWithoutId);
            const response = await request(application).get(`/customers/${postResponse.body}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        });
    });

    describe("Add", () => {
        it("should return 201", async () => {
            const response = await request(application).post("/customers").send(Data.customerWithoutId);
            expect(response.status).toBe(201);
            expect(response.body).toBeDefined();
        });
    });

    describe("Update", () => {
        it("should return 404", async () => {
            expect((await request(application).put("/customers/")).status).toBe(404);
        });

        it("should return 400", async () => {
            expect((await request(application).put(`/customers/${Data.id}`)).status).toBe(400);
        });

        it("should return 204", async () => {
            const postResponse = await request(application).post("/customers").send(Data.customerWithoutId);
            const response = await request(application).put(`/customers/${postResponse.body}`).send({ id: postResponse.body, name: "Updated" });
            expect(response.status).toBe(204);
        });
    });

    describe("Remove", () => {
        it("should return 404", async () => {
            expect((await request(application).delete("/customers/")).status).toBe(404);
        });

        it("should return 204", async () => {
            expect((await request(application).delete(`/customers/${Data.id}`)).status).toBe(204);
        });

        it("should return 204", async () => {
            const postResponse = await request(application).post("/customers").send(Data.customerWithoutId);
            const response = await request(application).delete(`/customers/${postResponse.body}`);
            expect(response.status).toBe(204);
        });
    });
});
