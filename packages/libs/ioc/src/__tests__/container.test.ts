import { Container } from 'inversify';
import { getContainer } from '../container';
import { TestAsyncModule, TestModule } from './TestModules';

describe('Container', () => {
    let container: Container;

    describe('getContainer', () => {
        it('should create the container without arguments', async () => {
            container = await getContainer();

            expect(container).toBeDefined();
        });

        it('should create the container with additional ContainerModules ', async () => {
            container = await getContainer({
                syncModules: [new TestModule()],
                asyncModules: [],
            });

            expect(container).toBeDefined();
        });

        it('should create the container with additional AsyncContainerModules ', async () => {
            container = await getContainer({
                syncModules: [],
                asyncModules: [new TestAsyncModule()],
            });

            expect(container).toBeDefined();
        });
    });
});
