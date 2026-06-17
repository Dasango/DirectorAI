import type { Config } from 'jest';

const config: Config = {
  // jest-preset-angular provides Angular-aware transforms (handles Angular ESM packages)
  preset: 'jest-preset-angular',

  testEnvironment: 'jsdom',

  // Only pick up *.spec.ts files
  testMatch: ['**/*.spec.ts'],

  // Override the preset transform to point at our jest-specific tsconfig
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        // Disable type-checking for faster transforms
        diagnostics: false,
      },
    ],
  },

  // Map path aliases defined in tsconfig.json
  moduleNameMapper: {
    '^@/core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@/shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@/features/(.*)$': '<rootDir>/src/app/features/$1',
  },

  // File extensions Jest should resolve (html added for Angular templates)
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

  // Collect coverage from source files (exclude spec files and entry points)
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
  ],

  // Ignore dist artefacts
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Initialise Angular TestBed after the test framework is set up (zoneless Angular 21)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
