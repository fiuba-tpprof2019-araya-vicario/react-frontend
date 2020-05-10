import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Table from '../../utils/Table';

export default class EditMyUserCareers extends React.Component {
  static propTypes = {
    careers: PropTypes.array,
    activeUser: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = {
      careers: props.activeUser.careers
    };
  }

  getCareerTable() {
    if (this.state.careers.length !== 0) {
      return (
        <Table
          key="table"
          data={this.state.careers}
          headers={['Nombre', 'Descripción']}
        />
      );
    }

    return <Alert bsStyle="info">No posees carreras</Alert>;
  }

  render() {
    return (
      <div>
        <Row key="title">
          <Col lg={8} md={8}>
            <h3>Mis carreras</h3>
          </Col>
        </Row>
        {this.getCareerTable()}
      </div>
    );
  }
}
