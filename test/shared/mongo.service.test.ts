import { vi, beforeEach, describe, it, expect } from "vitest";

describe("MongoService", () => {
    const dbMock = { collection: vi.fn() };

    const clientMock = { db: vi.fn(() => dbMock), connect: vi.fn(), close: vi.fn() };

    vi.doMock("mongodb", () => ({
        MongoClient: class {
            constructor() {
                return clientMock;
            }
        }
    }));

    beforeEach(() => vi.resetModules());

    const getMongoService = async () => (await import("#src/shared/mongo.service.js")).default;

    it("should open connection", async () => {
        const mongoService = await getMongoService();
        await mongoService.connect();
        expect(clientMock.connect).toHaveBeenCalledTimes(1);
    });

    it("should close connection", async () => {
        const mongoService = await getMongoService();
        await mongoService.connect();
        await mongoService.disconnect();
        expect(clientMock.close).toHaveBeenCalledTimes(1);
    });
});
