import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Checkbox } from 'react-bootstrap';
import Dialogue from '../../../Dialogue';
import { myProjectMessages } from '../../../messages.js';

export default class SubmitPresentationModal extends React.Component {
  static propTypes = {
    submitPresentation: PropTypes.func,
    presentationId: PropTypes.number,
    projectId: PropTypes.number
  };

  state = {
    valid: false,
    error: null
  };

  showModal = () => {
    this.modal.showModal();
  };

  onChangeCheck = () => {
    this.setState({
      valid: !this.state.valid,
      error: null
    });
  };

  getModalBody() {
    return (
      <Row key="body">
        <Col md={12} lg={12}>
          {myProjectMessages.ACCEPT_PRESENTATION}
          <Checkbox
            onChange={this.onChangeCheck}
            validationState={this.state.error}
          >
            {myProjectMessages.ACCEPT_PRESENTATION_WARNING}
          </Checkbox>
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
          const { presentationId, projectId } = this.props;

          if (!this.state.valid) {
            this.setState({
              valid: false,
              error: 'error'
            });
          } else {
            this.props.submitPresentation(projectId, presentationId);
            this.modal.hideModal();
          }
        }}
      >
        Subir presentación
      </Button>
    );

    return buttons;
  }

  render() {
    return (
      <Dialogue
        key="submitPresentation"
        title="Subir archivos de presentación"
        body={this.getModalBody()}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
