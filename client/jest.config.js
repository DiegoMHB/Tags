export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', 
      },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/__mocks__/svgMock.ts'
    }
  };
  