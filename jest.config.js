module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|ttf|woff|woff2|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
