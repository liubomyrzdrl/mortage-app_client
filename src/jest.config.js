module.exports = {
   "verbose": true,
   "clearMocks": true,
   "collectCoverage": true,
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
  }