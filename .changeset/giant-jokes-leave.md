---
"@botvy/plugin-system": minor
---

Added the plugin loader

- Added the basic concept of a plugin loader which loads plugins from any data source (MySQL, File based, Database file based)
  - The plugin loader define the async "loadPlugins" method which should load the plugins from the data source. You can use this to load your own plugins aswell!
