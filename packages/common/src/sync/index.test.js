import { storeForSyncTest } from './test-util';

describe('sync', () => {
  it('does not sync actions in skip-list', () => {
    const actionTypeToSkip = 'SKIP';
    const publish = jest.fn();
    const store = storeForSyncTest(
      publish, undefined, {}, {},
      [actionTypeToSkip],
    );
    store.dispatch({ type: 'SKIP' });
    expect(publish).not.toHaveBeenCalled();
    store.dispatch({ type: 'DO NOT SKIP' });
    expect(publish).toHaveBeenCalled();
  });
});
