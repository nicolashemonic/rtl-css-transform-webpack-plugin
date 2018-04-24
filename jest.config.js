module.exports = {
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testRegex: ".test.ts",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.test.json"
        }
    },
    coveragePathIgnorePatterns: ["node_modules", "tests/bundle.ts"]
};
