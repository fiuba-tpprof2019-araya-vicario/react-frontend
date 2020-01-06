import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormControl } from 'react-bootstrap';
import Field from '../../utils/forms/Field';
import FullRow from '../../utils/styles/FullRow';

export default class EditUserForm extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    editUser: PropTypes.func
  };

  constructor(props) {
    super();
    const user = props.user ? props.user : {};

    this.state = {
      form: {
        id: user.id,
        name: {
          error: false,
          message: '',
          value: user.name ? user.name : ''
        },
        email: {
          error: false,
          message: '',
          value: user.email ? user.email : ''
        }
      }
    };
  }

  updateName = (newValue) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        name: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  updateEmail = (newValue) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        email: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  resetForm(props) {
    const user = props.user ? props.user : {};

    this.setState({
      form: {
        name: {
          error: false,
          message: '',
          value: user.name ? user.name : ''
        },
        email: {
          error: false,
          message: '',
          value: user.email ? user.email : ''
        }
      }
    });
  }

  validateForm(name, email) {
    let formOk = true;

    const form = {
      name: { error: false, message: '', value: name },
      email: { error: false, message: '', value: email }
    };

    if (name == null || name === '') {
      form.name.error = true;
      form.name.message = 'Tenés que ingresar un nombre';
      formOk = false;
    } else {
      form.name.error = false;
      form.name.message = '';
    }

    if (email == null || email === '') {
      form.email.error = true;
      form.email.message = 'Tenés que un email';
      formOk = false;
    } else {
      form.email.error = false;
      form.email.message = '';
    }

    this.setState({ ...this.state, form });

    return formOk;
  }

  onSubmit = () => {
    const { id } = this.state;
    const name = this.state.form.name.value;
    const email = this.state.form.email.value;

    if (this.validateForm(name, email)) {
      this.props.editUser(id, {
        name,
        email
      });
    }
  };

  render() {
    return (
      <Fragment>
        <FullRow key="row1">
          <Field
            controlId="nameInput"
            label="Nombre"
            required
            validationState={this.state.form.name.error}
            validationMessage={this.state.form.name.message}
            inputComponent={
              <FormControl
                type="text"
                value={this.state.form.name.value}
                disabled
                placeholder="Ingrese un nombre"
                onChange={this.updateName}
              />
            }
          />
          <Field
            controlId="emailInput"
            label="Email"
            required
            validationState={this.state.form.email.error}
            validationMessage={this.state.form.email.message}
            inputComponent={
              <FormControl
                type="text"
                value={this.state.form.email.value}
                disabled
                placeholder="Ingrese un email"
                onChange={this.updateEmail}
              />
            }
          />
        </FullRow>
      </Fragment>
    );
  }
}
