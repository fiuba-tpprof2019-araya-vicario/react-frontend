import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Field from '../../../utils/Field';
import { getFullName } from '../../../utils/services/functions';
import FullRow from '../../../utils/styles/FullRow';

export default class UploadIdeaModal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    coautors: PropTypes.array,
    departments: PropTypes.array,
    tutors: PropTypes.array,
    editMode: PropTypes.number,
    projectTypes: PropTypes.array,
    uploadIdea: PropTypes.func,
    editIdea: PropTypes.func
  };

  constructor(props) {
    super();
    const project = props.project ? props.project : {};
    const user = props.user ? props.user : {};

    this.state = {
      form: {
        description: { error: false, mensaje: '', value: '' },
        autor: { error: false, mensaje: '' },
        title: {
          error: false,
          mensaje: '',
          value: project.name ? project.name : ''
        },
        departments: {
          error: false,
          mensaje: '',
          value: project.departments ? props.project.departments : []
        }
      },
      coautors: project.students ? props.project.students : [],
      tutors: [],
      description: project.description ? project.description : '',
      projectType: project.type ? project.type : null,
      tutor: project.tutor ? project.tutor : null,
      autor: project.creator ? getFullName(project.creator) : user.name,
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateAutorsSelect = this.updateAutorsSelect.bind(this);
    this.updateDepartmentsSelect = this.updateDepartmentsSelect.bind(this);
    this.updateAutor = this.updateAutor.bind(this);
    this.updateProjectTypeSelect = this.updateProjectTypeSelect.bind(this);
    this.updateTutorSelect = this.updateTutorSelect.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      this.resetForm(this.props);
    }
  }

  updateProjectTypeSelect(newValue) {
    this.setState({
      ...this.state,
      projectType: newValue
    });
  }

  updateAutorsSelect(newValue) {
    this.setState({
      ...this.state,
      coautors: newValue
    });
  }

  updateTutorSelect(newValue) {
    this.setState({
      ...this.state,
      tutor: newValue
    });
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

  updateDepartmentsSelect(newValue) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        departments: { error: false, mensaje: '', value: newValue }
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

  updateAutor(newValue) {
    this.setState({
      ...this.state,
      autor: newValue.target.value
    });
  }

  resetForm(props) {
    const project = props.project ? props.project : {};
    const user = props.user ? props.user : {};

    this.setState({
      file: null,
      id: props.project.id,
      form: {
        description: {
          error: false,
          mensaje: '',
          value: project.description ? project.description : ''
        },
        autor: { error: false, mensaje: '' },
        title: {
          error: false,
          mensaje: '',
          value: project.name ? project.name : ''
        },
        departments: {
          error: false,
          mensaje: '',
          value: project.departments ? project.departments : []
        }
      },
      coautors: project.students ? props.project.students : [],
      tutors: [],
      projectType: project.type ? project.type : null,
      tutor: project.tutor ? project.tutor : null,
      autor: project.creator ? getFullName(project.creator) : user.name
    });
  }

  validateForm(title, description, autor, departments) {
    let formOk = true;

    const form = {
      description: { error: false, mensaje: '', value: description },
      autor: { error: false, mensaje: '', value: autor },
      title: { error: false, mensaje: '', value: title },
      departments: { error: false, mensaje: '', value: departments }
    };

    if (title == null || title === '') {
      form.title.error = true;
      form.title.mensaje = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    } else {
      form.title.error = false;
      form.title.mensaje = '';
    }

    if (description == null || description === '') {
      form.description.error = true;
      form.description.mensaje = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    } else {
      form.description.error = false;
      form.description.mensaje = '';
    }

    if (autor == null || autor === '') {
      form.autor.error = true;
      form.autor.mensaje = 'Tenés que ingresar el autor de la idea';
      formOk = false;
    } else {
      form.autor.error = false;
      form.autor.mensaje = '';
    }
    if (departments && departments.length === 0) {
      form.departments.error = true;
      form.departments.mensaje =
        'Tenés que ingresar al menos un departamento al que pertenece tu idea';
      formOk = false;
    } else {
      form.departments.error = false;
      form.departments.mensaje = '';
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
    const { autor, id } = this.state;
    const title = this.state.form.title.value;
    const departments = this.state.form.departments.value;
    const description = this.state.form.description.value;
    const type = this.state.projectType ? this.state.projectType.value : null;
    const coautors = this.state.coautors ? this.state.coautors : null;
    const tutorId = this.state.tutor ? this.state.tutor.value : null;

    if (this.validateForm(title, description, autor, departments)) {
      if (this.props.editMode) {
        this.props.editIdea(id, {
          title,
          departments,
          description,
          coautors,
          type,
          autor,
          tutorId
        });
      } else {
        this.props.uploadIdea({
          title,
          departments,
          description,
          coautors,
          type,
          autor,
          tutorId
        });
      }

      this.hideModal();
    }
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
            Crear idea a alto nivel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="formCreateRow0">
            <Field
              controlId="titleInput"
              label="Título"
              required
              validationState={this.state.form.title.error ? 'error' : null}
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
          <FullRow key="formCreateRow5">
            <Field
              controlId="autorInput"
              label="Autor"
              required
              inputComponent={
                <FormControl
                  type="text"
                  value={this.state.autor}
                  disabled={this.props.user && this.props.user.name}
                  placeholder="Ingrese un título para tu requerimiento"
                  onChange={this.updateTitle}
                />
              }
            />
            <Field
              key="projectTypeGroup"
              bsSize="small"
              controlId="projectTypeSelect"
              label="Tipo"
              required
              inputComponent={
                <Select
                  key="projectTypeSelect"
                  value={this.state.projectType}
                  onChange={this.updateProjectTypeSelect}
                  options={this.props.projectTypes}
                  isSearchable
                  id="projectTypeSelect"
                  placeholder="Seleccione un tipo de proyecto"
                  name="projectTypeSelect"
                  multi={false}
                />
              }
            />
          </FullRow>
          <FullRow key="formCreateRow2">
            <Field
              key="coautorsGroup"
              bsSize="small"
              controlId="coautorsSelect"
              label="Coautores"
              inputComponent={
                <Select
                  key="coautorsSelect"
                  value={this.state.coautors}
                  onChange={this.updateAutorsSelect}
                  options={this.props.coautors}
                  isSearchable
                  id="coautorsSelect"
                  placeholder="Seleccione coautores"
                  name="coautorsSelect"
                  multi
                />
              }
            />
          </FullRow>
          <FullRow key="formCreateRow3">
            <Field
              key="tutorGroup"
              bsSize="small"
              controlId="tutorSelect"
              label="Tutor"
              inputComponent={
                <Select
                  key="tutorSelect"
                  value={this.state.tutor}
                  onChange={this.updateTutorSelect}
                  options={this.props.tutors}
                  isSearchable
                  id="tutorSelect"
                  placeholder="Seleccione un tutor"
                  name="tutorSelect"
                  multi={false}
                />
              }
            />
          </FullRow>
          <FullRow key="formCreateRow6">
            <Field
              key="departmentsGroup"
              bsSize="small"
              required
              controlId="departmentsSelect"
              label="Departamentos"
              validationState={
                this.state.form.departments.error ? 'error' : null
              }
              validationMessage={this.state.form.departments.mensaje}
              inputComponent={
                <Select
                  key="departmentsSelect"
                  value={this.state.form.departments.value}
                  onChange={this.updateDepartmentsSelect}
                  options={this.props.departments}
                  isSearchable
                  id="departmentsSelect"
                  placeholder="Seleccione los departamentos a los que pertence la idea"
                  name="departmentsSelect"
                  multi
                />
              }
            />
          </FullRow>
          <FullRow key="formCreateRow4">
            <Field
              controlId="descriptionInput"
              label="Descripción de la idea"
              required
              validationState={
                this.state.form.description.error ? 'error' : null
              }
              validationMessage={this.state.form.description.mensaje}
              inputComponent={
                <textarea
                  value={this.state.form.description.value}
                  onChange={this.updateDescription}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  rows="10"
                  placeholder="Ingrese una descripción de tu idea..."
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
            key="createFileButton"
            bsSize="small"
            bsStyle="primary"
            onClick={this.onSubmit}
          >
            {this.props.editMode ? 'Editar' : 'Crear'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
