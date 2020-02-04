import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormControl } from 'react-bootstrap';
import Field from '../../utils/forms/Field';
import FullRow from '../../utils/styles/FullRow';

export default class EditMyUserForm extends React.Component {
  static propTypes = {
    user: PropTypes.object
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

  showModal = () => {};

  hideModal = () => {};

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
              />
            }
          />
        </FullRow>
      </Fragment>
    );
  }
}
