import { Container } from 'inversify';

import { getContainer } from '../container';

describe('Dependency Injection Container', () => {
    let container: Container;

    beforeEach(async () => {
        container = await getContainer();
    });

    it('should bound the container to the own instance', () => {
        const boundContainer = container.get(Container);

        expect(boundContainer).toBeInstanceOf(Container);
        expect(boundContainer).toBe(container);
    });
});
