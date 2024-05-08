import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Monster {
  calories: number;
  health: boolean;
  monsterId: number;
}
export interface ControlPanelSignature {
  // The arguments accepted by the component
  Args: {
    displayedUserInput: {
      calories: number;
      numMonsters: number;
      totalFood: number;
      foodValue: number;
      poisonChance: number;
      monsterlist: Monster[];
    };
    steps: number;
    isSetBtnDisable: boolean;
    disableStepBtn: boolean;
    getSetDetails: () => void;
    createMonsters: () => void;
    stepAction: () => void;
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class ControlPanelComponent extends Component<ControlPanelSignature> {}
