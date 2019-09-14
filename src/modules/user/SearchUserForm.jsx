import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import Field from '../../utils/forms/Field';

export default class BuscarUsuarioForm extends React.Component {
  static propTypes = {
    getUsuarios: PropTypes.func
  };

  constructor() {
    super();
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = {
      name: '',
      email: ''
    };
  }

  updateEmail(newValue) {
    this.setState({
      ...this.state,
      email: newValue.target.value
    });
  }

  updateName(newValue) {
    this.setState({
      ...this.state,
      name: newValue.target.value
    });
  }

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const nameSearch = this.state.name;
          const emailSearch = this.state.email;

          this.props.getUsuarios(nameSearch, emailSearch);
        }}
      >
        <Row>
          <Col lg={4}>
            <Field
              key="nameSearch"
              bsSize="small"
              controlId="nameSearch"
              label="Nombre"
              inputComponent={
                <FormControl
                  value={this.state.name}
                  onChange={this.updateName}
                  key="nameSearchControl"
                  bsSize="small"
                  type="text"
                />
              }
            />
          </Col>
          <Col lg={4}>
            <Field
              key="emailSearch"
              bsSize="small"
              controlId="emailSearch"
              label="Email"
              inputComponent={
                <FormControl
                  value={this.state.email}
                  onChange={this.updateEmail}
                  key="emailSearchControl"
                  bsSize="small"
                  type="text"
                />
              }
            />
          </Col>
          <Col className="flexContainer" lg={2} md={2}>
            <Button
              className="flexBottom"
              bsStyle="primary"
              bsSize="small"
              type="submit"
            >
              Buscar
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}
