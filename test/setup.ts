import { GenericContainer, StartedTestContainer } from "testcontainers";
import mongoose from "mongoose";
import { mongodb } from "../src/shared/mongodb";

let mongoContainer: StartedTestContainer;

const hasMongoContainer = (expect.getState().testPath ?? "").endsWith("repository.test.ts");

beforeAll(async () => {
    if (hasMongoContainer) {
        mongoContainer = await new GenericContainer("mongo").withExposedPorts(27017).start();
        process.env.MONGODB_URL = `mongodb://localhost:${mongoContainer.getFirstMappedPort()}`;
        mongodb();
    }
});

afterEach(async () => {
    if (hasMongoContainer) {
        await mongoose.connection.db?.dropDatabase();
    }
});

afterAll(async () => {
    if (hasMongoContainer) {
        await mongoose.disconnect();
        await mongoContainer.stop();
    }
});
