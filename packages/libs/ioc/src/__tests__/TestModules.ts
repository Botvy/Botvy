import { AsyncContainerModule, ContainerModule } from 'inversify';

export class TestAsyncModule extends AsyncContainerModule {
    constructor() {
        super(async () => {});
    }
}

export class TestModule extends ContainerModule {
    constructor() {
        super(() => {});
    }
}
