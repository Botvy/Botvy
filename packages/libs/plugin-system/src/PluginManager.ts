import { injectable } from 'inversify';

import { IPlugin } from './IPlugin';

@injectable()
export class PluginManager {
    /**
     * Contains all plugins which are managed by the PluginManager
     *
     * @type {IPlugin[]}
     * @memberof PluginManager
     */
    public plugins: IPlugin[] = [];

    /**
     * Creates an instance of PluginManager.
     *
     * TODO: Implement Plugin Loaders
     *
     * @memberof PluginManager
     */
    constructor() {}

    /**
     * Loads all plugins through PluginLoaders
     *
     * @return {IPlugin[]}
     * @memberof PluginManager
     */
    public loadPlugins(): IPlugin[] {
        return this.plugins;
    }
}
