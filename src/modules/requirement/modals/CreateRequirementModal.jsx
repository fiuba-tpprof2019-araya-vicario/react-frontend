import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import FullRow from '../../../utils/styles/FullRow';
import Field from '../../../utils/Field';

export default class CreateRequirementModal extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
      form: {
        description: { error: false, mensaje: '', value: '' },
        title: { error: false, mensaje: '', value: '' },
      },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  updateTitle(newValue) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        title: { error: false, mensaje: '', value: newValue.target.value }
      } 
    });
  }

  updateDescription(newValue) {
    this.setState({
      ...this.state, 
      form: {
        ...this.state.form,
        description: { error: false, mensaje: '', value: newValue.target.value }
      } 
    });
  }

  resetForm() {
    let form = {
      description: { error: false, mensaje: '', value: '' },
      autor: { error: false, mensaje: '', value: '' },
      title: { error: false, mensaje: '', value: '' }
    };
    this.setState({ ...this.state, form: form });
  }

  validateForm(title, description) {
    let formOk = true;

    let form = {
      description: { error: false, mensaje: '', value: description },
      title: { error: false, mensaje: '', value: title }
    };

    if (title == null || title == '') {
      form.title.error = true;
      form.title.mensaje = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    } else {
      form.title.error = false;
      form.title.mensaje = '';
    }

    if (description == null || description == '') {
      form.description.error = true;
      form.description.mensaje = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    } else {
      form.description.error = false;
      form.description.mensaje = '';
    }

    this.setState({ ...this.state, form });

    return formOk;
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  onSubmit() {
    const title = this.state.form.title.value;
    const description = this.state.form.description.value;

    if (this.validateForm(title, description)) {
      this.props.uploadRequirement({title, description});
      this.hideModal();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Crear requerimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <Field 
              controlId="titleInput"
              label="Título"
              required
              validationState={(this.state.form.title.error)? 'error' : null}
              validationMessage={this.state.form.title.mensaje}
              inputComponent={
                <FormControl
                  type="text"
                  value={this.state.form.title.value}
                  placeholder="Ingrese un título para tu requerimiento"
                  onChange={this.updateTitle}
                />
              }
            />
          </FullRow>
          <FullRow key="2">
            <Field 
              controlId="descriptionInput"
              label="Descripción"
              required
              validationState={(this.state.form.description.error)? 'error' : null}
              validationMessage={this.state.form.description.mensaje}
              inputComponent={
                <textarea 
                  value={this.state.form.description.value}
                  onChange={this.updateDescription}
                  className="form-control"  
                  style={{resize:'vertical'}}
                  rows="10" 
                  placeholder={'Ingrese una descripción de tu requerimiento...'}
                />
              }
            />
          </FullRow>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.hideModal}>Cancelar</Button>&nbsp;
          <Button key={'createFileButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}