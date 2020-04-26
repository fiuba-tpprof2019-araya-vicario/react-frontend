import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Field from '../../forms/Field';
import { getFullName, getOnlyField } from '../../services/functions';
import FullRow from '../../styles/FullRow';

export default class UploadIdeaModal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    similarStudents: PropTypes.array,
    similarTutors: PropTypes.array,
    coautors: PropTypes.array,
    careers: PropTypes.array,
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
        description: {
          error: false,
          message: '',
          value: project.description ? project.description : ''
        },
        autor: { error: false, message: '' },
        title: {
          error: false,
          message: '',
          value: project.name ? project.name : ''
        },
        careers: {
          error: false,
          message: '',
          value: project.careers ? props.project.careers : []
        },
        projectType: {
          error: false,
          message: '',
          value: project.type ? props.project.type : null
        },
        coautors: {
          error: false,
          message: '',
          value: project.students ? props.project.students : []
        }
      },
      tutor: null,
      autor: project.creator ? getFullName(project.creator) : user.name,
      show: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      this.resetForm(this.props);
    }
  }

  refreshSelectedUsers = (tutor, coautors) => {
    const selectedUsers = [...getOnlyField(coautors), tutor];

    return selectedUsers;
  };

  updateProjectTypeSelect = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        projectType: { error: false, message: '', value: newValue }
      }
    });
  };

  updateAutorsSelect = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        coautors: { error: false, message: '', value: newValue }
      }
    });
  };

  updateTutorSelect = (newValue) => {
    this.setState({ tutor: newValue });
  };

  updateTitle = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        title: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  updateCareersSelect = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        careers: { error: false, message: '', value: newValue }
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

  resetForm = (props) => {
    const project = props.project ? props.project : {};
    const user = props.user ? props.user : {};

    this.setState({
      id: props.project.id,
      form: {
        description: {
          error: false,
          message: '',
          value: project.description ? project.description : ''
        },
        autor: { error: false, message: '' },
        title: {
          error: false,
          message: '',
          value: project.name ? project.name : ''
        },
        careers: {
          error: false,
          message: '',
          value: project.careers ? project.careers : []
        },
        projectType: {
          error: false,
          message: '',
          value: project.type ? project.type : null
        },
        coautors: {
          error: false,
          message: '',
          value: project.students ? props.project.students : null
        }
      },
      tutor: project.tutor ? project.tutor : null,
      autor: project.creator ? getFullName(project.creator) : user.name
    });
  };

  validateForm = (title, description, autor, careers, type) => {
    let formOk = true;

    const form = {
      description: { error: false, message: '', value: description },
      projectType: { error: false, message: '', value: type },
      autor: { error: false, message: '', value: autor },
      title: { error: false, message: '', value: title },
      careers: { error: false, message: '', value: careers },
      coautors: this.state.form.coautors
    };

    if (!title) {
      form.title.error = true;
      form.title.message = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    }

    if (!description) {
      form.description.error = true;
      form.description.message = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    }

    if (!autor) {
      form.autor.error = true;
      form.autor.message = 'Tenés que ingresar el autor de la idea';
      formOk = false;
    }

    if (!type) {
      form.projectType.error = true;
      form.projectType.message = 'Tenés que seleccionar el tipo de proyecto';
      formOk = false;
    }

    if (careers && careers.length === 0) {
      form.careers.error = true;
      form.careers.message =
        'Tenés que ingresar al menos un departamento al que pertenece tu idea';
      formOk = false;
    }

    this.setState({ form });

    return formOk;
  };

  showModal = (requirement) => {
    this.setState({ show: true, requirement });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onSubmit = () => {
    const { autor, id, form, tutor, requirement } = this.state;
    const title = form.title.value;
    const careers = form.careers.value;
    const description = form.description.value;
    const type = form.projectType.value;
    const coautors = form.coautors.value;
    const tutorId = tutor ? tutor.value : null;
    const requirementId = requirement ? requirement.id : null;

    if (this.validateForm(title, description, autor, careers, type)) {
      if (this.props.editMode) {
        this.props.editIdea(id, {
          title,
          careers,
          description,
          coautors,
          type,
          autor,
          tutorId,
          requirementId
        });
      } else {
        this.props.uploadIdea({
          title,
          careers,
          description,
          coautors,
          type,
          autor,
          tutorId,
          requirementId
        });
      }

      this.hideModal();
    }
  };

  render() {
    const { show, requirement, form, autor } = this.state;
    const { title, projectType, coautors, careers, description } = form;
    const studentsOptions = [
      { label: 'Recomendados', options: this.props.similarStudents },
      { label: 'Alumnos', options: this.props.coautors }
    ];
    const tutorsOptions = [
      { label: 'Recomendados', options: this.props.similarTutors },
      { label: 'Tutores', options: this.props.tutors }
    ];
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    };
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center'
    };
    const colourStyles = {
      control: (styles) => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled }) => ({
        ...styles,
        color: isDisabled ? '#ccc' : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default'
      }),
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color
      })
    };
    const formatGroupLabel = (data) => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    return (
      <Modal
        show={show}
        onHide={this.hideModal}
        backdrop="static"
        dialogClassName="custom-modal"
        bsSize="lg"
        autoFocus
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Crear idea a alto nivel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow display-if={requirement} key="form0">
            <p>
              <b>Requerimiento:</b>
              {` ${requirement.name}`}
            </p>
          </FullRow>
          <FullRow key="form1">
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
          <FullRow key="form2">
            <Field
              controlId="autorInput"
              label="Autor"
              required
              inputComponent={
                <FormControl
                  type="text"
                  value={autor}
                  disabled={this.props.user && this.props.user.name}
                  placeholder="Ingrese un título para tu requerimiento"
                  onChange={this.updateTitle}
                />
              }
            />
            <Field
              bsSize="small"
              controlId="projectTypeSelect"
              label="Tipo"
              required
              validationState={projectType.error}
              validationMessage={projectType.message}
              inputComponent={
                <Select
                  key="projectTypeSelect"
                  value={projectType.value}
                  onChange={this.updateProjectTypeSelect}
                  options={this.props.projectTypes}
                  isSearchable
                  isClearable={false}
                  id="projectTypeSelect"
                  placeholder="Seleccione un tipo de proyecto"
                  name="projectTypeSelect"
                  isMulti={false}
                />
              }
            />
          </FullRow>
          <FullRow key="form3">
            <Field
              bsSize="small"
              controlId="coautorsSelect"
              label="Coautores"
              inputComponent={
                <Select
                  key="coautorsSelect"
                  value={coautors.value}
                  onChange={this.updateAutorsSelect}
                  options={studentsOptions}
                  formatGroupLabel={formatGroupLabel}
                  styles={colourStyles}
                  isClearable={false}
                  id="coautorsSelect"
                  placeholder="Seleccione coautores"
                  name="coautorsSelect"
                  isMulti
                />
              }
            />
          </FullRow>
          <FullRow key="form4">
            <Field
              bsSize="small"
              controlId="tutorSelect"
              label="Tutor"
              required={this.props.editMode}
              inputComponent={
                <Select
                  key="tutorSelect"
                  value={this.state.tutor}
                  onChange={this.updateTutorSelect}
                  options={tutorsOptions}
                  formatGroupLabel={formatGroupLabel}
                  styles={colourStyles}
                  isSearchable
                  isClearable={false}
                  id="tutorSelect"
                  placeholder="Seleccione un tutor"
                  name="tutorSelect"
                  isMulti={false}
                />
              }
            />
          </FullRow>
          <FullRow key="form5">
            <Field
              bsSize="small"
              required
              controlId="careersSelect"
              label="Carreras"
              validationState={careers.error}
              validationMessage={careers.message}
              inputComponent={
                <Select
                  key="careersSelect"
                  value={careers.value}
                  onChange={this.updateCareersSelect}
                  options={this.props.careers}
                  isSearchable
                  isClearable={false}
                  id="careersSelect"
                  placeholder="Seleccione los carreras a los que pertence la idea"
                  name="careersSelect"
                  isMulti
                />
              }
            />
          </FullRow>
          <FullRow key="form6">
            <Field
              controlId="descriptionInput"
              label="Descripción de la idea"
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
