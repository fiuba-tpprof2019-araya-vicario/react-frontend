import PropTypes from 'prop-types';
import React from 'react';
import Table from '../../utils/Table';

export default class IdeasTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.func
  };

  getHeaders() {
    return [
      'Título',
      'Descripción',
      'Estudiantes',
      'Tutores',
      'Tipo',
      'Fecha de creación'
    ];
  }

  render() {
    return (
      <Table
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          detailAction: { action: this.props.show }
        }}
      />
    );
  }
}
