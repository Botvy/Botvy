import { Plugin } from '../Plugin';

export class ExamplePlugin extends Plugin {
    constructor() {
        super('test-plugin', 'Test Plugin', '0.0.0', 'All Botvy contributors');
        this.mainEntrypoint = './dist/ExamplePlugin.js';
    }
}
