/**
 * The plugin can be used to extend the functionality of Botvy.
 * It can be used in the Electron client, in the UI and on the server aswell!
 *
 * @export
 * @interface IPlugin
 */
export interface IPlugin {
    /**
     * The id of the plugin
     *
     * @type {string}
     * @memberof IPlugin
     */
    id: string;

    /**
     * The name of the plugin
     *
     * @type {string}
     * @memberof IPlugin
     */
    name: string;

    /**
     * The version of the plugin
     * ATTENTION: This needs to be semver compatible!
     *
     * @type {string}
     * @memberof IPlugin
     */
    version: string;

    /**
     * The author of the plugin
     *
     * @type {string}
     * @memberof IPlugin
     */
    author: string;

    /**
     *
     * The file path to the class which implements the IPlugin
     * and provides the basic functionality of the plugin class.
     *
     * @type {string}
     * @memberof IPlugin
     */
    mainEntrypoint?: string;
}
