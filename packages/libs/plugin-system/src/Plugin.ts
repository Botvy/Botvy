import { injectable, unmanaged } from 'inversify';

import { IPlugin } from './IPlugin';

/**
 * The abstract defintion of a plugin
 * which extends the Botvy ecosystem
 *
 * @export
 * @abstract
 * @class Plugin
 * @implements {IPlugin}
 */
@injectable()
export abstract class Plugin implements IPlugin {
    /**
     *
     * The file path to the class which implements the IPlugin
     * and provides the basic functionality of the plugin class.
     *
     * @type {string}
     * @memberof IPlugin
     */
    mainEntrypoint?: string;

    /**
     * When set to true this plugin will be loaded
     *
     * @type {boolean}
     * @memberof IPlugin
     */
    active: boolean = false;

    /**
     * Creates an instance of Plugin.
     * @param {string} id The id of the plugin
     * @param {string} name The name of the plugin
     * @param {string} version The version of the plugin
     * @param {string} author The author of the plugin
     * @memberof Plugin
     */
    constructor(
        @unmanaged() public readonly id: string,
        @unmanaged() public readonly name: string,
        @unmanaged() public readonly version: string,
        @unmanaged() public readonly author: string,
    ) {}

    /**
     * Plugin lifecycle hook
     * Gets called when the plugin is loaded
     *
     * @memberof Plugin
     */
    public onLoad() {}

    /**
     * Plugin lifecycle hook
     * Gets called when the plugin is going to be unloaded
     *
     * @memberof Plugin
     */
    public onUnload() {}
}
