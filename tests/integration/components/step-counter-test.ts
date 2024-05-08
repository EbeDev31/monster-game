import { module, test } from 'qunit';
import { setupRenderingTest } from 'monster-game/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-counter', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    const steps = 3;
    const disableStepBtn = false;

    this.set('steps', steps);
    this.set('stepAction', () => {});
    this.set('disableStepBtn', disableStepBtn);

    // Template block usage:
    await render(hbs`
      <StepCounter @steps={{this.steps}} @stepAction={{this.stepAction}} @disableStepBtn={{this.disableStepBtn}}/>`);

    assert.dom('[data-test-steps]').hasValue('3');
  });
});
