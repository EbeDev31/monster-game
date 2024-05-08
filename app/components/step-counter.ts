import Component from '@glimmer/component';

export interface StepCounterSignature {
  // The arguments accepted by the component
  Args: {
    steps: number;
    disableStepBtn: boolean;
    stepAction: () => void;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class StepCounterComponent extends Component<StepCounterSignature> { }
