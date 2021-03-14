module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./packages/apps/ui/src/', './packages/libs/plugin-system/src/'],
    testRegex: '(/__tests__/.*).test.tsx?$',
    setupFiles: ['./setup-jest.ts'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.base.json',
        },
    },
};
