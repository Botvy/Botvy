import { PluginLoader } from '../loader/PluginLoader';
import { Plugin } from '../Plugin';
import { ExamplePlugin } from './ExamplePlugin';

export class ExamplePluginLoader extends PluginLoader {
    public async loadPlugins(): Promise<Plugin[]> {
        const examplePlugin = new ExamplePlugin();

        return [examplePlugin];
    }
}
