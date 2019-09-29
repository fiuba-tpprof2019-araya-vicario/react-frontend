import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { CustomTable } from '../../utils/CustomTable';
import Dialogue from '../../utils/Dialogue';
import Field from '../../utils/forms/Field';

export default class EditUserProfiles extends React.Component {
  static propTypes = {
    profiles: PropTypes.array,
    activeUser: PropTypes.object,
    refresh: PropTypes.func
  };

  constructor(props) {
    super();
    this.state = {
      removeProfileClicked: -1,
      selectedProfile: -1,
      formSelect: { error: false, message: '' },
      profiles: props.activeUser.profiles
    };
    this.showAddProfileModal = this.showAddProfileModal.bind(this);
    this.showRemoveProfileModal = this.showRemoveProfileModal.bind(this);
    this.getDeleteProfileModalButtons = this.getDeleteProfileModalButtons.bind(
      this
    );
    this.getAddProfileModalButtons = this.getAddProfileModalButtons.bind(this);
    this.updateProfileSelect = this.updateProfileSelect.bind(this);
  }

  showAddProfileModal() {
    this.resetProfileForm();
    this.addProfileModal.showModal();
  }

  showRemoveProfileModal(id) {
    this.setState({ removeProfileClicked: id });
    this.removeProfileModal.showModal();
  }

  updateProfileSelect(newValue) {
    this.setState({
      ...this.state,
      selectedProfile: newValue != null ? newValue.value : -1
    });
  }

  resetProfileForm() {
    const formSelect = {
      error: false,
      message: ''
    };

    this.setState({ ...this.state, formSelect });
  }

  validarRolForm() {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (this.state.selectedProfile <= 0) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    } else {
      formSelect.error = false;
      formSelect.message = '';
    }

    this.setState({ ...this.state, formSelect });

    return formOk;
  }

  getAgregarRolModalBody() {
    const profilesList = this.getProfilesList();
    const selectRender = [];
    const options = [];

    profilesList.forEach((profiles) => {
      options.push({ value: profiles.id, label: profiles.name });
    }, this);
    selectRender.push(
      <Field
        validationState={this.state.formSelect.error ? 'error' : null}
        key="perfilField"
        bsSize="small"
        controlId="perfilSelect"
        label="Perfil"
        required
        validationMessage={this.state.formSelect.message}
        inputComponent={
          <Select
            key="perfilSelect"
            name="perfilelect"
            value={this.state.selectedProfile}
            options={options}
            id="perfilSelect"
            onChange={this.updateProfileSelect}
            placeholder="seleccioná un perfil"
          />
        }
      />
    );

    return selectRender;
  }

  getAddProfileModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="agregarButton"
        bsStyle="primary"
        bsSize="small"
        onClick={() => {
          if (this.validarRolForm()) {
            this.state.profiles.push(
              this.getProfileById(this.state.selectedProfile)
            );
            this.addProfileModal.hideModal();
            this.props.refresh(this.state.profiles);
          }
        }}
      >
        Guardar
      </Button>
    );

    return buttons;
  }

  getDeleteProfileModalBody() {
    return (
      <p>
        ¿Seguro querés eliminar el perfil{' '}
        {this.getProfileNameById(this.state.removeProfileClicked)}?
      </p>
    );
  }

  getDeleteProfileModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="borrarButton"
        bsStyle="danger"
        bsSize="small"
        onClick={() => {
          this.setState({
            ...this.state,
            profiles: this.state.profiles.filter(
              (profile) => profile.id !== this.state.removeProfileClicked
            )
          });
          this.removeProfileModal.hideModal();
          this.props.refresh(this.state.profiles);
        }}
      >
        Eliminar
      </Button>
    );

    return buttons;
  }

  getProfileNameById(id) {
    const profile =
      this.state.profiles &&
      this.state.profiles.find((element) => element.id === id);

    return profile ? profile.name : '';
  }

  getProfileById(id) {
    return this.props.profiles.find((element) => element.id === id);
  }

  getProfilesList() {
    const { profiles } = this.props;

    return _.differenceBy(profiles, this.state.profiles, 'id');
  }

  getProfileTable() {
    if (this.state.profiles.length !== 0) {
      return (
        <CustomTable
          data={this.state.profiles}
          headers={['Nombre', 'Descripción']}
          actions={{
            removeAction: { action: this.showRemoveProfileModal }
          }}
        />
      );
    }

    return <Alert bsStyle="info">No posees perfiles</Alert>;
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={8} md={8}>
            <h3>Perfiles del usuario</h3>
          </Col>
          <Col lg={4} md={4}>
            {this.getProfilesList().length !== 0 && (
              <Button
                bsStyle="success"
                bsSize="xsmall"
                className="pull-right"
                onClick={this.showAddProfileModal}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;
                </i>
                Agregar perfil
              </Button>
            )}
          </Col>
        </Row>
        {this.getProfileTable()}
        <Dialogue
          key="borrarRolModal"
          title="Borrar perfil"
          body={this.getDeleteProfileModalBody()}
          buttons={this.getDeleteProfileModalButtons()}
          ref={(removeProfileModal) => {
            this.removeProfileModal = removeProfileModal;
          }}
        />
        <Dialogue
          key="addProfileModal"
          title="Agregar perfil"
          body={this.getAgregarRolModalBody()}
          buttons={this.getAddProfileModalButtons()}
          ref={(addProfileModal) => {
            this.addProfileModal = addProfileModal;
          }}
        />
      </div>
    );
  }
}
