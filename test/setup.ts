import { GenericContainer, StartedTestContainer } from "testcontainers";
import MongoService from "../src/shared/mongo.service";

let mongoContainer: StartedTestContainer;
const path = expect.getState().testPath ?? "";
const isRepository = path.endsWith("repository.test.ts");
const isIntegration = path.endsWith("integration.test.ts");

beforeAll(async () => {
    if (isRepository || isIntegration) {
        mongoContainer = await new GenericContainer("mongo").withExposedPorts(27017).start();
        process.env.MONGODB_URL = `mongodb://localhost:${mongoContainer.getFirstMappedPort()}`;
        await MongoService.connect();
    }
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
