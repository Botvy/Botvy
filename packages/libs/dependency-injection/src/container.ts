import { AsyncContainerModule, Container } from 'inversify';

const containerModules: any[] = [];

export async function getContainer(): Promise<Container> {
    const container = new Container();

    for (const ContainerModule of containerModules) {
        const containerModule = new ContainerModule();

        if (containerModule instanceof AsyncContainerModule) {
            await container.loadAsync(containerModule);
        } else {
            container.load(containerModule);
        }
    }

    container.bind<Container>(Container).toConstantValue(container);

    return container;
}
