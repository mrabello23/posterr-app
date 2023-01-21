export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/envs/"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/envs/"],
};
