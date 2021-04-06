import { Container, AsyncContainerModule } from 'inversify';
import { PluginModule } from './modules/PluginModule';

const coreModules = {
    sync: [new PluginModule()],
    async: [],
};

export async function getContainer(): Promise<Container> {
    let container = new Container();

    container = await loadContainerModules(container);

    return container;
}

async function loadContainerModules(container: Container): Promise<Container> {
    // Bind the ContainerModules to the container
    coreModules.sync.forEach((containerModule) =>
        container.load(containerModule),
    );

    // Bind the AsyncContainerModules to the container
    for (const containerModule of coreModules.async) {
        await container.loadAsync(containerModule);
    }

    return container;
}
