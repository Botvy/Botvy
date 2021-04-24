import { Container, AsyncContainerModule, ContainerModule } from 'inversify';
import { PluginModule } from './modules/PluginModule';

interface ICoreModules {
    syncModules: ContainerModule[];
    asyncModules: AsyncContainerModule[];
}

const coreModules: ICoreModules = {
    syncModules: [new PluginModule()],
    asyncModules: [],
};

export async function getContainer(
    otherModules?: ICoreModules,
): Promise<Container> {
    let container = new Container();

    otherModules = otherModules ?? {
        syncModules: [],
        asyncModules: [],
    };

    container = await loadContainerModules(container, otherModules);

    return container;
}

async function loadContainerModules(
    container: Container,
    otherModules: ICoreModules,
): Promise<Container> {
    const modulesToLoad: ICoreModules = {
        syncModules: coreModules.syncModules.concat(otherModules.syncModules),
        asyncModules: coreModules.asyncModules.concat(
            otherModules.asyncModules,
        ),
    };

    // Bind the ContainerModules to the container
    modulesToLoad.syncModules.forEach((containerModule) =>
        container.load(containerModule),
    );

    // Bind the AsyncContainerModules to the container
    for (const containerModule of modulesToLoad.asyncModules) {
        await container.loadAsync(containerModule);
    }

    return container;
}
