/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func
  };

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
        actions={{
          editAction: this.props.editRequirement,
          deleteAction: this.props.deleteRequirement
        }}
      />
    );
  }
}
