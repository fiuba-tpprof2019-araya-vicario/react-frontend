/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';
import { REQUEST_STATES } from '../../utils/services/references';

export class MyTutorialsTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.func,
    accept: PropTypes.func,
    reject: PropTypes.func
  };

  getHeaders() {
    return ['Título', 'Descripción', 'Tipo', 'Fecha de creación', 'Estado'];
  }

  render() {
    const disableButton = (request) =>
      request.status !== REQUEST_STATES.pending;

    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          detailAction: { action: this.props.show },
          acceptAction: { action: this.props.accept, disabled: disableButton },
          rejectAction: { action: this.props.reject, disabled: disableButton }
        }}
      />
    );
  }
}
