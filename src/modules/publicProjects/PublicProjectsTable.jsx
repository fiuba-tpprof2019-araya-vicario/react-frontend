import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';

export default class PublicProjectsTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.func
  };

  getHeaders() {
    return [
      'Título',
      'Descripción',
      'Estudiandtes',
      'Tutores',
      'Tipo',
      'Fecha de creación'
    ];
  }

  render() {
    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          detailAction: { action: this.props.show }
        }}
      />
    );
  }
}
