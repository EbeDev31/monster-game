import { module, test } from 'qunit';
import { setupRenderingTest } from 'monster-game/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | control-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    const displayedUserInput = {
      calories: 5,
      numMonsters: 3,
      totalFood: 60,
      foodValue: 0,
      poisonChance: 0,
    };
    const step = 3;
    const isSetBtnDisable = false;
    const disableStepBtn = true;

    this.set('displayedUserInput', displayedUserInput);
    this.set('step', step);
    this.set('stisSetBtnDisableep', isSetBtnDisable);
    this.set('disableStepBtn', disableStepBtn);
    this.set('createMonsters', () => {});
    this.set('getSetDetails', () => {});
    this.set('stepAction', () => {});
    this.set('getSetDetails', () => {});

    await render(hbs`<ControlPanel @displayedUserInput={{this.displayedUserInput}} @getSetDetails={{this.getSetDetails}}
    @createMonsters={{this.createMonsters}} @steps={{this.steps}} @stepAction={{this.stepAction}}
    @isSetBtnDisable={{this.isSetBtnDisable}} @disableStepBtn={{this.disableStepBtn}} />`);

    assert.dom('[data-test-control-panel-total-food]').hasValue('60');
  });
});
