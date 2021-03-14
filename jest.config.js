module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./packages/apps/ui/src/', './packages/libs/plugin-system/src/'],
    testRegex: '(/__tests__/.*).test.tsx?$',
    setupFiles: ['./setup-jest.ts'],
    coverageReporters: ['html', 'lcov'],
    collectCoverageFrom: [
        './packages/**/src/**/*.{ts,tsx}',
        '!./packages/**/src/**/*.test.{ts,tsx}',
        '!./packages/**/src/**/*.{ts,tsx}',
    ],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.base.json',
        },
    },
};
