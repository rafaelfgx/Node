import { GenericContainer, StartedTestContainer } from "testcontainers";
import mongoose from "mongoose";
import { connectMongo } from "../src/shared/database";

let mongoContainer: StartedTestContainer;

const hasMongoContainer = expect.getState().testPath!.endsWith("repository.test.ts");

beforeAll(async () => {
    if (hasMongoContainer) {
        mongoContainer = await new GenericContainer("mongo").withExposedPorts(27017).start();
        process.env.mongo = `mongodb://localhost:${mongoContainer.getFirstMappedPort()}`;
        connectMongo();
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

export default async () => {};
