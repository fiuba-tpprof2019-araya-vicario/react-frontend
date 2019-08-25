import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FullRow from '../styles/FullRow';

export default class DeleteModal extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    message: PropTypes.string,
    id: PropTypes.number,
    element: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  showModal(requirement) {
    this.resetForm(requirement);
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  onDelete() {
    this.props.onDelete(this.props.id);
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
            Borrar {this.props.element}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <p>{this.props.message}</p>
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
            bsStyle="danger"
            onClick={this.onDelete}
          >
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
