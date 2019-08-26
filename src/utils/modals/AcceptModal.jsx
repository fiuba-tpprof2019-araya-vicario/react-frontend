import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FullRow from '../styles/FullRow';

export default class AcceptModal extends React.Component {
  static propTypes = {
    message: PropTypes.func,
    element: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onAccept = this.onAccept.bind(this);
  }

  showModal(id, name, action) {
    this.setState({ show: true, id, name, action });
  }

  hideModal() {
    this.setState({ show: false, id: null, name: '', action: null });
  }

  onAccept() {
    this.state.action(this.state.id);
    this.hideModal();
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Aceptar {this.props.element}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <p>{this.props.message(this.state.name)}</p>
          </FullRow>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>
          &nbsp;
          <Button
            key="editButton"
            bsSize="small"
            bsStyle="success"
            onClick={this.onAccept}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
