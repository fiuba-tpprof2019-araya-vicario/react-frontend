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

  updateName = ({ target }) => {
    this.setState({
      form: {
        ...this.state.form,
        name: { error: false, message: '', value: target.value }
      }
    });
  };

  updateEmail = ({ target }) => {
    this.setState({
      form: {
        ...this.state.form,
        email: { error: false, message: '', value: target.value }
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

    if (!name) {
      form.name.error = true;
      form.name.message = 'Tenés que ingresar un nombre';
      formOk = false;
    }

    if (!email) {
      form.email.error = true;
      form.email.message = 'Tenés que ingresar un mail';
      formOk = false;
    }

    this.setState({ form });

    return formOk;
  }

  onSubmit = () => {
    const { id, form } = this.state;
    const name = form.name.value;
    const email = form.email.value;

    if (this.validateForm(name, email)) {
      this.props.editUser(id, {
        name,
        email
      });
    }
  };

  render() {
    const { name, email } = this.state.form;

    return (
      <Fragment>
        <FullRow key="row1">
          <Field
            controlId="nameInput"
            label="Nombre"
            required
            validationState={name.error}
            validationMessage={name.message}
            inputComponent={
              <FormControl
                type="text"
                value={name.value}
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
            validationState={email.error}
            validationMessage={email.message}
            inputComponent={
              <FormControl
                type="text"
                value={email.value}
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
