/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    editAction: PropTypes.func
  };

  constructor() {
    super();
    this.getHeaders = this.getHeaders.bind(this);
  }

  editAction(id) {
    this.props.editAction(id);
  }

  getHeaders() {
    return [
      'Id',
      'Creador',
      'Título',
      'Descripción',
      'Fecha de alta',
      'Última modificación',
      'Estado'
    ];
  }

  render() {
    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{ editAction: this.editAction }}
      />
    );
  }
}
