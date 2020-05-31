import { shallow } from 'enzyme';
import React from 'react';
import Stepper from './ShowIdeaStepper';

describe('Right', () => {
  let stepper;
  let activeStep;

  context('when rendering right element', () => {
    before(() => {
      activeStep = 1;
      stepper = shallow(<Stepper activeStep={activeStep} />);
    });

    it('should render stepper', () => {
      stepper.exists().should.equal(true);
    });

    it('should render corret steps', () => {
      stepper
        .prop('steps')
        .should.deep.equals([
          { title: 'Crear idea' },
          { title: 'Idea en revisión' },
          { title: 'Pendiente de propuesta' },
          { title: 'Propuesta en revisión' },
          { title: 'Pendiente de presentación' },
          { title: 'Pendiente de publicación' },
          { title: 'Propuesta publicada' }
        ]);
    });

    it('should render corrects props', () => {
      stepper.prop('activeStep').should.equals(activeStep);
      stepper.prop('defaultTitleOpacity').should.equals('0.5');
      stepper.prop('completeTitleOpacity').should.equals('0.75');
      stepper.prop('activeColor').should.equals('#468847');
    });
  });
});
