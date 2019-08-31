/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';
import references from '../../utils/services/references';

export class RequestTable extends React.Component {
  static propTypes = {
    accept: PropTypes.func,
    reject: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  };

  getHeaders() {
    return [
      'Creador',
      'Proyecto',
      'Fecha de alta',
      'Última modificación',
      'Estado'
    ];
  }

  render() {
    const disableButton = (request) =>
      request.status !== references.REQUEST_STATES.pending;

    return (
      <CustomTable
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
