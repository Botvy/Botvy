import { inject, injectable, multiInject } from 'inversify';
import { Logger } from 'tslog';

import { PluginLoader } from './loader/PluginLoader';
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
     * @param {Logger} logger The logger which should be used to log messages
     * @param {PluginLoader[]} pluginLoaders The plugin loaders which will be injected by the dependency injection container.
     *                                       They will be used to load plugins from different sources.
     * @memberof PluginManager
     */
    constructor(
        @inject(Logger.name) private logger: Logger,
        @multiInject(PluginLoader.name)
        private pluginLoaders: PluginLoader[],
    ) {}

    /**
     * Loads all plugins using pluging loaders
     *
     * @return {Promise<Plugin[]>} The loaded plugins
     * @memberof PluginManager
     */
    public async loadPlugins(): Promise<Plugin[]> {
        for (const pluginLoader of this.pluginLoaders) {
            const loadedPlugins = await pluginLoader.loadPlugins();

            for (const loadedPlugin of loadedPlugins) {
                await this.addPlugin(loadedPlugin);
            }
        }

        return this.plugins;
    }

    /**
     * Adds the given plugin to the managed plugins
     * It also checks if the plugin is already registered
     * Also triggers the lifecycle hooks
     *
     * @param {Plugin} plugin The plugin which should be added
     * @memberof PluginManager
     */
    public async addPlugin(plugin: Plugin) {
        if (this.checkIfPluginIsRegistered(plugin.id)) {
            return;
        }

        this.logger.debug(`Plugin is not registered: ${plugin.id}`);

        // Check if the plugin is not initialized
        if (plugin.isInitialized === false) {
            // Trigger the lifecycle hook
            await plugin.onLoad();

            // Set the isInitialized property to true
            plugin.isInitialized = true;
        }

        this.plugins.push(plugin);
    }

    /**
     * Removes the plugin by the given plugin id
     * Also triggers the lifecycle hooks
     *
     * @param {string} pluginId The id of the plugin which should be removed
     * @memberof PluginManager
     */
    public async removePlugin(pluginId: string) {
        this.logger.debug(`Removing plugin: ${pluginId}`);

        const newPlugins: Plugin[] = [];

        for (const plugin of this.plugins) {
            if (plugin.id !== pluginId) {
                newPlugins.push(plugin);
                continue;
            }

            this.logger.debug(`Unloading plugin: ${plugin.id}`);

            if (plugin.isInitialized) {
                // Call the plugin lifecycle method
                await plugin.onUnload();
            }

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

    /**
     * Checks if the given plugin id is already managed by the plugin manager
     *
     * @private
     * @param {string} pluginId The id of the plugin which should be found
     * @return {boolean} Returns true when the given plugin id was found in the managed plugins. Otherwise false will be returned.
     * @memberof PluginManager
     */
    public checkIfPluginIsRegistered(pluginId: string): boolean {
        this.logger.debug(`Checking if plugin is registered: ${pluginId}`);

        return this.plugins.some((plugin) => pluginId === plugin.id);
    }
}
