import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap';
import { uploadFile } from '../fileReducer';

export class UploadFileModal extends React.Component {

  constructor() {
    super();
    this.state = {
      file: null,
      form: {
        archivo: { error: false, mensaje: '' },
        name: { error: false, mensaje: '' },
      }
    };
    this.abrirModal = this.abrirModal.bind(this);
    this.cerrarModal = this.cerrarModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetForm() {
    let form = {
      archivo: { error: false, mensaje: '' },
      name: { error: false, mensaje: '' },
    };
    this.setState({ ...this.state, form: form });
  }

  validarForm(archivo, nombre) {
    let formOk = true;

    let form = {
      archivo: { error: false, mensaje: '' },
      name: { error: false, mensaje: '' },
    };

    if (archivo == null || archivo == '') {
      form.archivo.error = true;
      form.archivo.mensaje = 'Tenés que ingresar la url de un archivo';
      formOk = false;
    } else {
      form.archivo.error = false;
      form.archivo.mensaje = '';
    }

    if (nombre == null || nombre == '') {
      form.name.error = true;
      form.name.mensaje = 'Tenés que ingresar el nombre del archivo';
      formOk = false;
    } else {
      form.name.error = false;
      form.name.mensaje = '';
    }

    this.setState({ ...this.state, form: form });

    return formOk;
  }

  abrirModal() {
    this.resetForm();
    this.setState({ show: true });
  }

  cerrarModal() {
    this.resetForm();
    this.setState({ show: false });
  }

  onSubmit() {
    let archivo = ReactDOM.findDOMNode(this.fileInput).value;
    let nombre = ReactDOM.findDOMNode(this.nameInput).value;
    if (this.validarForm(archivo,nombre)) {
      this.props.uploadFile(archivo,nombre);
      this.cerrarModal();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Subir archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'formCreateRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.name.error)? 'error' : null}>
                <ControlLabel>Filename</ControlLabel>
                <FormControl ref={nameInput => { this.nameInput = nameInput; }} key="nameInput" type="text"
                  placeholder={'Ingrese nombre del archivo'}>
                </FormControl>
              </FormGroup>
              {this.state.form.archivo.error &&
                <HelpBlock bsSize="small" >{this.state.form.name.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'formCreateRow2'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.archivo.error)? 'error' : null}>
                <ControlLabel>Url</ControlLabel>
                <FormControl ref={fileInput => { this.fileInput = fileInput; }} key="archivoInput" type="text"
                  placeholder={'Ingrese la url del archivo'}>
                </FormControl>
              </FormGroup>
              {this.state.form.archivo.error &&
                <HelpBlock bsSize="small" >{this.state.form.archivo.mensaje}</HelpBlock>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.cerrarModal}>Cancelar</Button>&nbsp;
          <Button key={'createFileButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>Crear</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatch = (dispatch) => ({
  uploadFile: (archivo,nombre) => {
    dispatch(uploadFile(archivo,nombre));
  }
});

export default connect(null, mapDispatch, null, { withRef: true })(UploadFileModal);