import { vi, beforeAll, beforeEach, afterAll, afterEach, expect } from "vitest";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import MongoService from "#src/shared/mongo.service.js";

let mongoContainer: StartedTestContainer | undefined;

beforeAll(async () => {
    const testPath = expect.getState().testPath;
    const suffixes = ["repository.test.ts", "integration.test.ts"];
    if (!testPath || !suffixes.some((suffix) => testPath.endsWith(suffix))) return;
    await startMongo();
}, 60000);

beforeEach(() => vi.clearAllMocks());

afterEach(async () => {
    if (mongoContainer) {
        await MongoService.db.dropDatabase();
    }
});

afterAll(async () => {
    if (mongoContainer) {
        await MongoService.disconnect();
        await mongoContainer.stop();
    }
}, 10000);

const startMongo = async () => {
    mongoContainer = await new GenericContainer("mongo").withExposedPorts(27017).start();
    const port = mongoContainer.getMappedPort(27017);
    process.env.MONGODB_URL = `mongodb://localhost:${port}`;
    await MongoService.connect();
};
