import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './', // Ensure Jest looks in the right place for your source and tests
  moduleDirectories: ['node_modules', 'src'], // If `src` contains your TypeScript files
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
};

export default config;
