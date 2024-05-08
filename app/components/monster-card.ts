import Component from '@glimmer/component';

interface Monster {
  calories: number;
  health: boolean;
  monsterId: number;
}
export interface MonsterCardSignature {
  // The arguments accepted by the component
  Args: {
    monster: Monster;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class MonsterCardComponent extends Component<MonsterCardSignature> {}
