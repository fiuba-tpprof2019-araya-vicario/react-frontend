import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FullRow from '../styles/FullRow';

export default class AbandonModal extends React.Component {
  static propTypes = {
    message: PropTypes.func,
    element: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal = (id, memberId, name, action, postAction) => {
    this.setState({ show: true, id, memberId, name, action, postAction });
  };

  hideModal = () => {
    this.setState({
      show: false,
      id: null,
      memberId: null,
      name: '',
      action: null,
      postAction: null
    });
  };

  onAbandon = () => {
    const { id, memberId, postAction } = this.state;

    this.state.action(id, memberId, postAction);
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
            Abandonar {this.props.element}
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
            onClick={this.onAbandon}
          >
            Abanadonar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
