import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Dialogue from '../../Dialogue';
import { myProjectMessages } from '../../messages.js';

export default class AcceptProposalModal extends React.Component {
  static propTypes = {
    reprobateProposal: PropTypes.func,
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
          {myProjectMessages.REPROBATE_PROPOSAL}
        </Col>
      </Row>
    );
  }

  getModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="reprobateButton"
        bsSize="small"
        bsStyle="success"
        onClick={() => {
          const { projectId } = this.props;

          this.props.reprobateProposal(projectId);
          this.modal.hideModal();
        }}
      >
        Reprobar propuesta
      </Button>
    );

    return buttons;
  }

  render() {
    return (
      <Dialogue
        key="reprobateProposal"
        title="Reprobar la propuesta"
        body={this.getModalBody()}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
