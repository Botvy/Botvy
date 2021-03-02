import { Container } from 'inversify';
import { Logger } from 'tslog';

import { PluginFilterType } from '../PluginFilterType';
import { PluginManager } from '../PluginManager';
import { ExamplePlugin } from './ExamplePlugin';

describe('PluginManager', () => {
    let container: Container;
    let pluginManager: PluginManager;
    let examplePlugin: ExamplePlugin;

    beforeEach(() => {
        examplePlugin = new ExamplePlugin();
        container = new Container();

        container.bind(PluginManager).toSelf();
        container.bind(Logger).toConstantValue(
            new Logger({
                colorizePrettyLogs: true,
                displayDateTime: true,
                minLevel: 'fatal',
            }),
        );

        pluginManager = container.get(PluginManager);
    });

    afterEach(() => {
        pluginManager.removePlugin(examplePlugin.id);
        container.unbindAll();
    });

    it('should be defined', () => {
        expect(PluginManager).toBeDefined();
        expect(pluginManager).toBeDefined();
    });

    describe('Plugin Management', () => {
        it('should load plugins', async () => {
            const plugins = await pluginManager.loadPlugins();

            expect(plugins).toHaveLength(0);
        });

        describe('Plugin Filter', () => {
            it('should return the current plugin array when the filter type is undefined', async () => {
                let plugins = pluginManager.getPlugins(undefined);

                expect(plugins).toHaveLength(0);

                await pluginManager.addPlugin(examplePlugin);
                plugins = pluginManager.getPlugins(undefined);

                expect(plugins).toHaveLength(1);
            });

            it('should return the current plugin array when the filter type is set to PluginFilterType.All ', () => {
                const plugins = pluginManager.getPlugins(PluginFilterType.ALL);

                expect(plugins).toHaveLength(0);
            });
            it('should return all active plugins when the filter type is set to PluginFilterType.Active ', async () => {
                examplePlugin.active = true;

                await pluginManager.addPlugin(examplePlugin);

                const plugins = pluginManager.getPlugins(
                    PluginFilterType.ACTIVE,
                );

                expect(plugins).toHaveLength(1);
            });

            it('should return all inactive plugins when the filter type is set to PluginFilterType.Inactive ', async () => {
                examplePlugin.active = false;
                await pluginManager.addPlugin(examplePlugin);

                const plugins = pluginManager.getPlugins(
                    PluginFilterType.INACTIVE,
                );

                expect(plugins).toHaveLength(1);
            });
        });

        describe('Repository functions', () => {
            describe('Adding plugins', () => {
                it('should be able to add new plugins', async () => {
                    await pluginManager.addPlugin(examplePlugin);

                    const plugins = pluginManager.getPlugins(
                        PluginFilterType.ALL,
                    );

                    expect(plugins).toHaveLength(1);
                });

                it('should call the lifecycle method', async () => {
                    examplePlugin.onLoad = jest.fn();
                    await pluginManager.addPlugin(examplePlugin);

                    expect(examplePlugin.onLoad).toHaveBeenCalled();
                });

                it('should load the additional container modules', () => {});

                it('should not be able to add plugins twice', async () => {
                    await pluginManager.addPlugin(examplePlugin);
                    await pluginManager.addPlugin(examplePlugin);

                    const plugins = pluginManager.getPlugins(
                        PluginFilterType.ALL,
                    );

                    expect(plugins).toHaveLength(1);
                });
            });

            it('should be able to remove plugins', async () => {
                await pluginManager.addPlugin(examplePlugin);

                let plugins = pluginManager.getPlugins(PluginFilterType.ALL);

                expect(plugins).toHaveLength(1);

                examplePlugin.onUnload = jest.fn();

                await pluginManager.removePlugin(examplePlugin.id);

                expect(examplePlugin.onUnload).toBeCalled();

                plugins = pluginManager.getPlugins(PluginFilterType.ALL);

                expect(plugins).toHaveLength(0);
            });
        });
    });
});
