import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FullRow from '../styles/FullRow';

export default class DeleteModal extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    message: PropTypes.func,
    element: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal = (id, name) => {
    this.setState({ show: true, id, name });
  };

  hideModal = () => {
    this.setState({ show: false, id: null, name: '' });
  };

  onDelete = () => {
    this.props.onDelete(this.state.id);
    this.hideModal();
  };

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
            <p>{this.props.message(this.state.name)}</p>
          </FullRow>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>{' '}
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
