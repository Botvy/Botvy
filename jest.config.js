module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*).test.tsx?$',
    setupFiles: ['./setup-jest.ts'],
    coverageReporters: ['html', 'lcov'],
    collectCoverageFrom: [
        './packages/**/src/*.{ts,tsx}',
        './packages/**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/index.ts',
        '!**/main.tsx',
    ],
    coveragePathIgnorePatterns: ['/__tests__/', '/node_modules/'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.base.json',
        },
    },
};
