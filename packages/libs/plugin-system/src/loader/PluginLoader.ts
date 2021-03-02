import { injectable } from 'inversify';

import { Plugin } from '../Plugin';

/**
 * The basic definition of a plugin loader which loads plugins from any data source
 * This could be:
 * - MySQL
 * - File based
 * - Database file based
 *
 * @export
 * @abstract
 * @class PluginLoader
 */
@injectable()
export abstract class PluginLoader {
    /**
     * Loads plugins from a data source
     *
     * @abstract
     * @return {Promise<Plugin[]>} The loaded plugins which were returned by the data source
     * @memberof PluginLoader
     */
    public abstract loadPlugins(): Promise<Plugin[]>;
}
