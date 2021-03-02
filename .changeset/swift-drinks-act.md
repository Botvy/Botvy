---
"@botvy/plugin-system": minor
---

Added the plugin class and refactored the IPlugin interface

- Moved the mainEntrypoint to the plugin class
- Added the basic definition of a plugin
  - Added the lifecycle hooks "onLoad" and "onUnload"
  - Added the required properties from the IPlugin interface
    as the constructor properties
