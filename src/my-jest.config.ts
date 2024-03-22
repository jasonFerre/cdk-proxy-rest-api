import type { Config } from '@jest/types'

const baseDir = '<rootDir>/api/handlers/budget/post'
const baseTestDir = '<rootDir>tests'

const esModules = ['@middy'].join('|')
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  testRunner: 'jest-circus/runner',
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*test.ts`],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@middy/core$': '<rootDir>/node_modules/@middy/core',
    '^@middy/util$': '<rootDir>/node_modules/@middy/util',
    '^@middy/http-error-handler$': '<rootDir>/node_modules/@middy/http-error-handler',
    '^@middy/validator$': '<rootDir>/node_modules/@middy/validator',
    '^@middy/validator/transpile$': '<rootDir>/node_modules/@middy/validator/transpile',
  },
  // transform:  {
  //   '^.+\\.ts?$': [
  //     'ts-jest',
  //     {
  //       useESM: true
  //     }
  //   ]
  // },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(@middy/core|@middy/http-error-handler|@middy/util|@middy/validator||@middy/validator/transpile/))',
  // ]
}

export default config
