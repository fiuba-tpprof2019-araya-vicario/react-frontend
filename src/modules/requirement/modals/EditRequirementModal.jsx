import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import FullRow from '../../../utils/styles/FullRow';
import Field from '../../../utils/forms/Field';

export default class EditRequirementModal extends React.Component {
  static propTypes = {
    editRequirement: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      show: false,
      form: {
        description: { error: false, message: '', value: '' },
        title: { error: false, message: '', value: '' }
      }
    };
  }

  updateTitle = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        title: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  updateDescription = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        description: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  resetForm(requirement) {
    const form = {
      description: {
        error: false,
        message: '',
        value: requirement.description
      },
      title: { error: false, message: '', value: requirement.name }
    };

    this.setState({ form, id: requirement.id });
  }

  validateForm(title, description) {
    let formOk = true;

    const form = {
      description: { error: false, message: '', value: description },
      title: { error: false, message: '', value: title }
    };

    if (title == null || title === '') {
      form.title.error = true;
      form.title.message = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    }

    if (description == null || description === '') {
      form.description.error = true;
      form.description.message = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    }

    this.setState({ form });

    return formOk;
  }

  showModal = (requirement) => {
    this.resetForm(requirement);
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onSubmit = () => {
    const { form } = this.state;
    const title = form.title.value;
    const description = form.description.value;

    if (this.validateForm(title, description)) {
      this.props.editRequirement(this.state.id, { name: title, description });
      this.hideModal();
    }
  };

  render() {
    const { title, description } = this.state.form;

    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Editar requerimiento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <Field
              controlId="titleInput"
              label="Título"
              required
              validationState={title.error}
              validationMessage={title.message}
              inputComponent={
                <FormControl
                  type="text"
                  value={title.value}
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
              validationState={description.error}
              validationMessage={description.message}
              inputComponent={
                <textarea
                  value={description.value}
                  onChange={this.updateDescription}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  rows="10"
                  placeholder="Ingrese una descripción de tu requerimiento..."
                />
              }
            />
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
            bsStyle="primary"
            onClick={this.onSubmit}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
