import PropTypes from 'prop-types';
import React from 'react';
import Stepper from 'react-stepper-horizontal';

export default class ShowIdeaStepper extends React.Component {
  static propTypes = {
    activeStep: PropTypes.number
  };

  render() {
    const steps = [
      { title: 'Crear idea' },
      { title: 'Idea en revisión' },
      { title: 'Pendiente de propuesta' },
      { title: 'Propuesta en revisión' },
      { title: 'Pendiente de presentación' },
      { title: 'Pendiente de publicación' },
      { title: 'Propuesta publicada' }
    ];

    return (
      <div className="step-progress">
        <Stepper
          steps={steps}
          activeStep={this.props.activeStep}
          defaultTitleOpacity="0.5"
          completeTitleOpacity="0.75"
          activeColor="#468847"
        />
      </div>
    );
  }
}
