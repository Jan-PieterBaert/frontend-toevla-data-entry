import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | route description', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('route-description', {});
    assert.ok(model);
  });
});
