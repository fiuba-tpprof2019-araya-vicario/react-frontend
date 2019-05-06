import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap';
import { createAppServer } from '../appServerReducer';

export class CrearAppServerModal extends React.Component {

  constructor() {
    super();
    this.state = {
      createForm: this.getNewFormState()
    };
    this.abrirModal = this.abrirModal.bind(this);
    this.cerrarModal = this.cerrarModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getNewFormState() {
    return {
      nombre: { error: false, mensaje: '' },
      url: { error: false, mensaje: ''}
    };
  }

  resetCreateForm() {
    this.setState({ ...this.state, createForm: this.getNewFormState() });
  }

  validarCreateForm(nombre, url) {
    let formOk = true;

    let createForm = this.getNewFormState();

    if (nombre == null || nombre == '') {
      createForm.nombre.error = true;
      createForm.nombre.mensaje = 'Este campo es obligatorio';
      formOk = false;
    } else {
      createForm.nombre.error = false;
      createForm.nombre.mensaje = '';
    }

    if (url == null || url == '') {
      createForm.url.error = true;
      createForm.url.mensaje = 'Este campo es obligatorio';
      formOk = false;
    } else {
      createForm.url.error = false;
      createForm.url.mensaje = '';
    }

    this.setState({ ...this.state, createForm: createForm });

    return formOk;
  }

  abrirModal() {
    this.resetCreateForm();
    this.setState({ show: true });
  }

  cerrarModal() {
    this.resetCreateForm();
    this.setState({ show: false });
  }

  onSubmit() {
    let nombre = this.nombreInput.value;
    let url = this.urlInput.value;
    if (this.validarCreateForm(nombre, url)) {
      this.props.createAppServer(nombre, url);
      this.cerrarModal();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Nuevo App Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'formCreateRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.createForm.nombre.error)? 'error' : null}>
                <ControlLabel>Nombre</ControlLabel>
                <FormControl inputRef={input => this.nombreInput = input} key="nombreInput" bsSize="small"
                  type="text" placeholder="ingresá un nombre">
                </FormControl>
              </FormGroup>
              {this.state.createForm.nombre.error &&
                <HelpBlock bsSize="small" >{this.state.createForm.nombre.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'formCreateRow2'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.createForm.url.error)? 'error' : null}>
                <ControlLabel>Url</ControlLabel>
                <FormControl inputRef={input => this.urlInput = input} key="urlInput" bsSize="small"
                  type="text" placeholder="ingresá una url">
                </FormControl>
              </FormGroup>
              {this.state.createForm.url.error &&
                <HelpBlock bsSize="small" >{this.state.createForm.url.mensaje}</HelpBlock>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.cerrarModal}>Cancelar</Button>&nbsp;
          <Button key={'createAppServerButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>Crear</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatch = (dispatch) => ({
  createAppServer: (nombreAppServer, urlAppServer) => {
    dispatch(createAppServer(nombreAppServer, urlAppServer));
  }
});

export default connect(null, mapDispatch, null, { withRef: true })(CrearAppServerModal);