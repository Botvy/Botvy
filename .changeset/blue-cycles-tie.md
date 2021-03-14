---
'@botvy/plugin-system': minor
---

The plugin manager should use plugin loaders

-   Updated the constructor of the plugin manager to include plugin loaders
    -   Updated the documentation to include the logger and pluginLoaders parameter
-   Added the "checkIfPluginIsRegistered" function
    -   Returns true when the given plugin id was found in the managed plugins. Otherwise false will be returned.
-   Added the example plugin loader
    -   Returns an array with an instance of the ExamplePlugin
-   Updated the tests
    -   Bound the ExamplePluginLoader to the container
    -   Added tests for the checkIfPluginIsRegistered function
