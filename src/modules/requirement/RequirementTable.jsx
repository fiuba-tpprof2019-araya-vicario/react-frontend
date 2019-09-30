/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';
import { REQUIREMENT_STATES } from '../../utils/services/references';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    canEdit: PropTypes.bool,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func,
    uploadIdea: PropTypes.func
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
      requirement.status !== REQUIREMENT_STATES.inactive;

    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={
          this.props.canEdit
            ? {
                editAction: {
                  action: this.props.editRequirement,
                  disabled: disableButton
                },
                deleteAction: {
                  action: this.props.deleteRequirement,
                  disabled: disableButton
                },
                uploadAction: {
                  action: this.props.uploadIdea,
                  disabled: disableButton
                }
              }
            : {
                uploadAction: {
                  action: this.props.uploadIdea,
                  disabled: disableButton
                }
              }
        }
      />
    );
  }
}
