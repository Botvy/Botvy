import { ContainerModule } from 'inversify';
import { PluginManager } from '@botvy/plugin-system';

export class PluginModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(PluginManager.name).to(PluginManager).inSingletonScope();
        });
    }
}
