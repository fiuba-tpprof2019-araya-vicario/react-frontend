import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export class Dialogue extends React.Component {

  constructor(props) {
    super();
    this.state = { show: props.show };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Modal
        {...this.props}
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.hideModal}>Cancelar</Button>&nbsp;{this.props.buttons}
        </Modal.Footer>
      </Modal>
    );
  }
}
