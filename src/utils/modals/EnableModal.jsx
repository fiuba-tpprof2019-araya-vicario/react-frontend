import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FullRow from '../styles/FullRow';

export default class EnableModal extends React.Component {
  static propTypes = {
    message: PropTypes.func,
    name: PropTypes.string,
    action: PropTypes.func,
    projectId: PropTypes.number,
    element: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({
      show: false
    });
  };

  onEnable = () => {
    this.props.action(this.props.projectId);
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
            Habilitar {this.props.element}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <p>{this.props.message(this.props.name)}</p>
          </FullRow>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>{' '}
          <Button
            key="editButton"
            bsSize="small"
            bsStyle="success"
            onClick={this.onEnable}
          >
            Habilitar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
