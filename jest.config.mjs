export default {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["./test/setup.ts"],
    testPathIgnorePatterns: [
        "application.ts",
        "mongo.service.ts"
    ],
    coveragePathIgnorePatterns: [
        "application.ts",
        "mongo.service.ts"
    ]
};
