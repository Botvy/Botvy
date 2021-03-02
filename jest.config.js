module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./packages/apps/ui/src/', './packages/libs/plugin-system/src/'],
    testRegex: '(/__tests__/.*).test.[jt]sx?$',
    setupFiles: ['./setup-jest.ts'],
};
