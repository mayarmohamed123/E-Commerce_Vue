module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
};
