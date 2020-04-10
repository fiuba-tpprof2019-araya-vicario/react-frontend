import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Dialogue from '../../../Dialogue';
import Field from '../../../forms/Field';
import { myProjectMessages } from '../../../messages.js';

export default class AcceptProposalModal extends React.Component {
  static propTypes = {
    reprobateProposal: PropTypes.func,
    projectId: PropTypes.number,
    options: PropTypes.array
  };

  constructor(props) {
    super(props);
    const { options } = props;

    this.state = {
      option: options && options.length === 1 ? options[0] : null,
      careerMessage: null,
      reason: '',
      reasonMessage: null
    };
  }

  showModal = () => {
    this.modal.showModal();
  };

  updateCareerSelect = (value) => {
    this.setState({ option: value, careerMessage: null });
  };

  updateReason = ({ target }) => {
    this.setState({
      reason: target.value,
      reasonMessage: null
    });
  };

  updateInvalidMessages = (option, reason) => {
    this.setState({
      careerMessage: option
        ? null
        : 'Tenés que ingresar la carrera con la cúal aprobar la propuesta',
      reasonMessage: reason
        ? null
        : 'Tenés que ingresar el motivo por el cúal vas a rechazar la propuesta'
    });
  };

  getModalBody(options) {
    return (
      <Row key="body">
        <Col md={12} lg={12}>
          <Field
            key="careerField"
            bsSize="small"
            controlId="careerSelect"
            label="Carrera"
            required
            validationState={!!this.state.careerMessage}
            validationMessage={this.state.careerMessage}
            inputComponent={
              <Select
                key="careerSelect"
                name="careerelect"
                value={this.state.option}
                options={options}
                isClearable={false}
                id="careerSelect"
                onChange={this.updateCareerSelect}
                placeholder="seleccioná un carrera para aprobar este proyecto"
              />
            }
          />
          <Field
            controlId="reasonInput"
            label="Motivo de rechazo"
            required
            validationState={!!this.state.reasonMessage}
            validationMessage={this.state.reasonMessage}
            inputComponent={
              <textarea
                value={this.state.reason}
                onChange={this.updateReason}
                className="form-control"
                style={{ resize: 'vertical' }}
                rows="5"
                placeholder="Ingrese una motivo de rechazo de la propuesta..."
              />
            }
          />
          {myProjectMessages.REPROBATE_PROPOSAL}
        </Col>
      </Row>
    );
  }

  getModalButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="reprobateButton"
        bsSize="small"
        bsStyle="danger"
        onClick={() => {
          const { projectId } = this.props;
          const { option, reason } = this.state;

          if (!option || !reason) {
            this.updateInvalidMessages(option, reason);
          } else {
            this.props.reprobateProposal(projectId, option.value, reason);
            this.modal.hideModal();
          }
        }}
      >
        Reprobar propuesta
      </Button>
    );

    return buttons;
  };

  render() {
    const { options } = this.props;

    return (
      <Dialogue
        key="reprobateProposal"
        title="Reprobar la propuesta"
        body={this.getModalBody(options)}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
