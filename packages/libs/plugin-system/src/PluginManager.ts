import { injectable } from 'inversify';

import { Plugin } from './Plugin';
import { PluginFilterType } from './PluginFilterType';

@injectable()
export class PluginManager {
    /**
     * Contains all plugins which are managed by the PluginManager
     *
     * @type {Plugin[]}
     * @memberof PluginManager
     */
    public plugins: Plugin[] = [];

    /**
     * Creates an instance of PluginManager.
     *
     * TODO: Implement Plugin Loaders
     *
     * @memberof PluginManager
     */
    constructor() {}

    /**
     * Loads all plugins using pluging loaders
     *
     * @return {Plugin[]} The loaded plugins
     * @memberof PluginManager
     */
    public loadPlugins(): Plugin[] {
        return this.plugins;
    }

    public addPlugin(plugin: Plugin) {
        if (
            this.plugins.find(
                (existingPlugin) => existingPlugin.id === plugin.id,
            ) !== undefined
        ) {
            return;
        }

        this.plugins.push(plugin);
    }

    public removePlugin(pluginId: string) {
        this.plugins = this.plugins.filter((plugin) => {
            if (plugin.id !== pluginId) {
                return true;
            }

            // TODO: Do lifecycle hooks for the plugin

            return false;
        });
    }

    /**
     * Returns all plugins based on the given filter
     *
     * @return {Plugin[]}
     * @memberof PluginManager
     */
    public getPlugins(
        pluginFilterType: PluginFilterType = PluginFilterType.ALL,
    ): Plugin[] {
        switch (pluginFilterType) {
            case PluginFilterType.ALL:
                return this.plugins;
            case PluginFilterType.ACTIVE:
                return this.plugins.filter((plugin) => plugin.active === true);
            case PluginFilterType.INACTIVE:
                return this.plugins.filter((plugin) => plugin.active === false);
        }
    }
}
