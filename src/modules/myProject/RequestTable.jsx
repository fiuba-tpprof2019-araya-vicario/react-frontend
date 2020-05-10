/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import Table from '../../utils/Table';
import { REQUEST_STATES } from '../../utils/services/references';

export default class RequestTable extends React.Component {
  static propTypes = {
    accept: PropTypes.func,
    reject: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  };

  getHeaders() {
    return [
      'Tipo de proyecto',
      'Usuario creador',
      'Proyecto',
      'Descripción',
      'Fecha de creación',
      'Última modificación',
      'Estado'
    ];
  }

  render() {
    const disableButton = (request) =>
      request.status !== REQUEST_STATES.pending;

    return (
      <Table
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          acceptAction: { action: this.props.accept, disabled: disableButton },
          rejectAction: { action: this.props.reject, disabled: disableButton }
        }}
      />
    );
  }
}
