import type { Config } from '@jest/types'
import * as path from 'path'

const rootDir = path.resolve(__dirname, '.')
const baseTestDir = `${rootDir}/tests/api/services`
const fileDir = '<rootDir>/api/services/*.ts'

const esModules = ['@middy'].join('|')
const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm', //try this  'ts-jest/presets/default-esm', this one worked 'ts-jest'
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  testRunner: 'jest-circus/runner',
  collectCoverageFrom: [
    //`${baseDir}/**/*.ts`
    fileDir,
  ],
  testMatch: [`**/*.test.ts`],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.ts$': '$1',
  },
  transform: {
    '^.+\\.(mt|t|cj|j|ts)s$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
}

export default config
