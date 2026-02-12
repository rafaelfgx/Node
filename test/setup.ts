import { GenericContainer, StartedTestContainer } from "testcontainers";
import MongoService from "../src/shared/mongo.service";
let mongoContainer: StartedTestContainer;

beforeAll(async () => {
    const suffixes = ["repository.test.ts", "integration.test.ts"];
    if (!suffixes.some(suffix => expect.getState().testPath?.endsWith(suffix) ?? false)) return;
    await mongo();
});

beforeEach(() => jest.clearAllMocks());

afterEach(async () => {
    if (mongoContainer) {
        await MongoService.dropDatabase();
    }
});

afterAll(async () => {
    if (mongoContainer) {
        await MongoService.disconnect();
        await mongoContainer.stop();
    }
});

const mongo = async () => {
    mongoContainer = await new GenericContainer("mongo").withExposedPorts(27017).start();
    process.env.MONGODB_URL = `mongodb://localhost:${mongoContainer.getFirstMappedPort()}`;
    await MongoService.connect();
}
