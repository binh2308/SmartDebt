module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|react-clone-referenced-element|@react-navigation|expo(nent)?|@expo(nent)?/.*))",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  coverageReporters: ["html", "text", "lcov"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
