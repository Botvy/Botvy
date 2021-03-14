module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*).test.tsx?$',
    setupFiles: ['./setup-jest.ts'],
    // collectCoverage: true,
    coverageReporters: ['html', 'lcov'],
    collectCoverageFrom: [
        './packages/**/src/*.{ts,tsx}',
        './packages/**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/index.ts',
        '!**/main.tsx',
    ],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.base.json',
        },
    },
};
