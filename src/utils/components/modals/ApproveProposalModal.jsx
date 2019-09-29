import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Dialogue from '../../Dialogue';
import Field from '../../forms/Field';
import { myProjectMessages } from '../../messages.js';

export default class ApproveProposalModal extends React.Component {
  static propTypes = {
    approveProposal: PropTypes.func,
    options: PropTypes.array,
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { options } = props;

    this.state = {
      option: options && options.length === 1 ? options[0] : null,
      message: null
    };
    this.showModal = this.showModal.bind(this);
    this.updateCareerSelect = this.updateCareerSelect.bind(this);
  }

  showModal() {
    this.modal.showModal();
  }

  updateCareerSelect(value) {
    this.setState({
      ...this.state,
      option: value,
      message: null
    });
  }

  getModalBody(options) {
    return (
      <Row key="body">
        <Col md={12} lg={12}>
          <Field
            validationState={this.state.message ? 'error' : null}
            key="careerField"
            bsSize="small"
            controlId="careerSelect"
            label="Carrera"
            required
            validationMessage={this.state.message}
            inputComponent={
              <Select
                key="careerSelect"
                name="careerelect"
                value={this.state.option}
                options={options}
                id="careerSelect"
                onChange={this.updateCareerSelect}
                placeholder="seleccioná un carrera para aprobar este proyecto"
              />
            }
          />
          {myProjectMessages.APPROBATE_PROPOSAL}
        </Col>
      </Row>
    );
  }

  getModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="uploadButton"
        bsSize="small"
        bsStyle="success"
        onClick={() => {
          const { projectId } = this.props;
          const { option } = this.state;

          if (!this.state.option) {
            this.setState({
              ...this.state,
              message:
                'Tenés que ingresar la carrera con la cúal aprobar la propuesta'
            });
          } else {
            this.props.approveProposal(projectId, option.value);
            this.modal.hideModal();
          }
        }}
      >
        Aceptar propuesta
      </Button>
    );

    return buttons;
  }

  render() {
    const { options } = this.props;

    return (
      <Dialogue
        key="approveProposal"
        title="Aprovar una propuesta"
        body={this.getModalBody(options)}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
