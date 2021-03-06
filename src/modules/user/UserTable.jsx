import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import history from '../../redux/history';
import Table from '../../utils/Table';
import { userMessages } from '../../utils/messages';

export default class UserTable extends React.Component {
  static propTypes = {
    activeSearch: PropTypes.bool,
    users: PropTypes.array
  };

  editAction(id) {
    history.push(`/users/${id}`);
  }

  getTablaUsuarios() {
    const { activeSearch, users } = this.props;

    if (activeSearch && users && users.length > 0) {
      return (
        <Row>
          <Col md={6} lg={6}>
            <Table
              data={users}
              headers={['Nombre', 'Email']}
              actions={{
                detailAction: { action: this.editAction }
              }}
            />
          </Col>
        </Row>
      );
    } else if (this.props.activeSearch) {
      return <Alert bsStyle="info">{userMessages.NO_RESULTS_MESSAGE}</Alert>;
    }

    return null;
  }

  render() {
    return this.getTablaUsuarios();
  }
}
