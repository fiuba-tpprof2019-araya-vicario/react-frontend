/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';
import references from '../../utils/services/references';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func
  };

  getHeaders() {
    return [
      'Creador',
      'Título',
      'Descripción',
      'Fecha de alta',
      'Última modificación',
      'Estado'
    ];
  }

  render() {
    const disableButton = (requirement) =>
      requirement.status !== references.REQUIREMENT_STATES.inactive;

    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          editAction: {
            action: this.props.editRequirement,
            disabled: disableButton
          },
          deleteAction: {
            action: this.props.deleteRequirement,
            disabled: disableButton
          }
        }}
      />
    );
  }
}
