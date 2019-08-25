/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';

export class RequestTable extends React.Component {
  static propTypes = {
    accept: PropTypes.func,
    reject: PropTypes.func,
    data: PropTypes.object
  };

  getHeaders() {
    return [
      'Id',
      'Creador',
      'Proyecto',
      'Fecha de alta',
      'Última modificación'
    ];
  }

  render() {
    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          acceptAction: this.props.accept,
          rejectAction: this.props.reject
        }}
      />
    );
  }
}
