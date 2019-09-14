import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';
import history from '../../redux/history';
import { CustomTable } from '../../utils/CustomTable';

export default class UserTable extends React.Component {
  static propTypes = {
    activeSearch: PropTypes.bool,
    users: PropTypes.array
  };

  editAction(id) {
    history.push(`/usuarios/${id}`);
  }

  getTablaUsuarios() {
    const { activeSearch, users } = this.props;

    if (activeSearch && users.length >= 0) {
      return (
        <CustomTable
          data={users}
          headers={['Nombre', 'Email', 'Perfiles']}
          actions={{
            detailAction: { action: this.editAction }
          }}
        />
      );
    } else if (this.props.activeSearch) {
      return <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>;
    }

    return null;
  }

  render() {
    return this.getTablaUsuarios();
  }
}
