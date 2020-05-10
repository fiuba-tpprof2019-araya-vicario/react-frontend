import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import Table from '../../utils/Table';
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
      selectedProfile: null,
      formSelect: { error: false, message: '' },
      profiles: props.activeUser.profiles
    };
  }

  showAddProfileModal = () => {
    this.resetProfileForm();
    this.addProfileModal.showModal();
  };

  showRemoveProfileModal = (id) => {
    this.setState({ removeProfileClicked: id });
    this.removeProfileModal.showModal();
  };

  updateProfileSelect = (newValue) =>
    this.setState({ selectedProfile: newValue });

  resetProfileForm = () =>
    this.setState({
      formSelect: {
        error: false,
        message: ''
      }
    });

  validarRolForm = () => {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (!this.state.selectedProfile) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    }

    this.setState({ formSelect });

    return formOk;
  };

  getAgregarRolModalBody = () => (
    <Field
      validationState={this.state.formSelect.error}
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
          isClearable={false}
          value={this.state.selectedProfile}
          options={this.getProfilesList().map((profiles) => ({
            value: profiles.id,
            label: profiles.name
          }))}
          id="perfilSelect"
          onChange={this.updateProfileSelect}
          placeholder="seleccioná un perfil"
        />
      }
    />
  );

  getAddProfileModalButtons = () => (
    <Button
      key="agregarButton"
      bsStyle="primary"
      bsSize="small"
      onClick={() => {
        if (this.validarRolForm()) {
          this.state.profiles.push(
            this.getProfileById(this.state.selectedProfile.value)
          );
          this.addProfileModal.hideModal();
          this.props.refresh(this.state.profiles);
        }
      }}
    >
      Guardar
    </Button>
  );

  getDeleteProfileModalBody = () => (
    <p>
      ¿Seguro querés eliminar el perfil{' '}
      {this.getProfileNameById(this.state.removeProfileClicked)}?
    </p>
  );

  getDeleteProfileModalButtons = () => (
    <Button
      key="borrarButton"
      bsStyle="danger"
      bsSize="small"
      onClick={() => {
        const filteredProfiles = this.state.profiles.filter(
          (profile) => profile.id !== this.state.removeProfileClicked
        );

        this.setState({ profiles: filteredProfiles });
        this.removeProfileModal.hideModal();
        this.props.refresh(filteredProfiles);
      }}
    >
      Eliminar
    </Button>
  );

  getProfileNameById = (id) => {
    const profile =
      this.state.profiles &&
      this.state.profiles.find((element) => element.id === id);

    return profile ? profile.name : '';
  };

  getProfileById = (id) =>
    this.props.profiles.find((element) => element.id === id);

  getProfilesList = () =>
    _.differenceBy(this.props.profiles, this.state.profiles, 'id');

  getProfileTable = () => {
    if (this.state.profiles.length !== 0) {
      return (
        <Table
          data={this.state.profiles}
          headers={['Nombre', 'Descripción']}
          actions={{
            removeAction: { action: this.showRemoveProfileModal }
          }}
        />
      );
    }

    return <Alert bsStyle="info">No posees perfiles</Alert>;
  };

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
