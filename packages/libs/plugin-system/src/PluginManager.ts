import { inject, injectable } from 'inversify';
import { Logger } from 'tslog';

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
    constructor(@inject(Logger) private logger: Logger) {}

    /**
     * Loads all plugins using pluging loaders
     *
     * @return {Promise<Plugin[]>} The loaded plugins
     * @memberof PluginManager
     */
    public async loadPlugins(): Promise<Plugin[]> {
        return this.plugins;
    }

    public async addPlugin(plugin: Plugin) {
        this.logger.debug(
            `Checking if plugin is already registered: ${plugin.id}`,
        );

        if (
            this.plugins.find(
                (existingPlugin) => existingPlugin.id === plugin.id,
            ) !== undefined
        ) {
            return;
        }

        this.logger.debug(`Plugin is not registered: ${plugin.id}`);

        if (plugin.isInitialized === false) {
            await plugin.onLoad();
            plugin.isInitialized = true;
        }

        this.plugins.push(plugin);
    }

    public async removePlugin(pluginId: string) {
        this.logger.debug(`Removing plugin: ${pluginId}`);

        const newPlugins: Plugin[] = [];

        for (const plugin of this.plugins) {
            if (plugin.id !== pluginId) {
                newPlugins.push(plugin);
                continue;
            }

            this.logger.debug(`Unloading plugin: ${plugin.id}`);

            // Call the plugin lifecycle method
            await plugin.onUnload();

            this.logger.debug(`Unloaded plugin: ${plugin.id}`);
        }

        this.plugins = newPlugins;
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
