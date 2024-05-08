import { module, test } from 'qunit';
import { setupRenderingTest } from 'monster-game/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | monster-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('monster', {
      monsterId: 1,
      calories: 5,
      health: true,
    });

    await render(hbs`<MonsterCard  @monster={{this.monster}} />`);
    assert.dom('[data-test-monster-health]').containsText('Alive');
  });
});
