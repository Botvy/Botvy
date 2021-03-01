/**
 * Defines the filter type for plugins
 *
 * They can be filtered by their active state or returning all plugins
 *
 * @export
 * @enum {number}
 */
export enum PluginFilterType {
    /**
     * Used when all plugins should be returned
     */
    ALL = 'All',

    /**
     * Used when only the active plugins should be returned
     */
    ACTIVE = 'Active',

    /**
     * Used when only the inactive plugins should be returned
     */
    INACTIVE = 'Inactive',
}
