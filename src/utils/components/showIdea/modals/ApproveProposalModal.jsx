import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Field from '../../../forms/Field';
import Dialogue from '../../../Dialogue';
import { myProjectMessages } from '../../../messages.js';

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
  }

  showModal = () => {
    this.modal.showModal();
  };

  updateCareerSelect = (value) => {
    this.setState({ option: value, message: null });
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
            validationState={this.state.message ? 'error' : null}
            validationMessage={this.state.message}
            inputComponent={
              <Select
                key="careerSelect"
                name="careerelect"
                value={this.state.option}
                clearable={false}
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
              message: myProjectMessages.SELECT_ONE_CAREER_INFO
            });
          } else {
            this.props.approveProposal(projectId, option.value);
            this.modal.hideModal();
          }
        }}
      >
        Aprobar propuesta
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
