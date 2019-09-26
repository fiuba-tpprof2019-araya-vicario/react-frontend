import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Dialogue from '../../Dialogue';
import { myProjectMessages } from '../../messages.js';

export default class AcceptProposalModal extends React.Component {
  static propTypes = {
    acceptProposal: PropTypes.func,
    requestId: PropTypes.number,
    projectId: PropTypes.number
  };

  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.modal.showModal();
  }

  getModalBody() {
    return (
      <Row key="body">
        <Col md={12} lg={12}>
          {myProjectMessages.ACCEPT_PROPOSAL}
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
          const { requestId, projectId } = this.props;

          this.props.acceptProposal(requestId, projectId);
          this.modal.hideModal();
        }}
      >
        Aceptar propuesta
      </Button>
    );

    return buttons;
  }

  render() {
    return (
      <Dialogue
        key="acceptProposal"
        title="Subir una propuesta"
        body={this.getModalBody()}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}