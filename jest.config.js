// eslint-disable-next-line no-undef
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!(@lezer/markdown/test)/)"],
};
