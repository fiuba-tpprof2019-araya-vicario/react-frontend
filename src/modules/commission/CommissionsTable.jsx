/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';
// import { STATES } from '../../utils/services/references';

export default class CommissionsTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.func
    // accept: PropTypes.func,
    // reject: PropTypes.func
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
