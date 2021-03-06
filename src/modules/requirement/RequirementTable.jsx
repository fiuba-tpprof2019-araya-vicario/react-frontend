/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import Table from '../../utils/Table';
import { REQUIREMENT_STATES } from '../../utils/services/references';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    canEdit: PropTypes.bool,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func,
    viewRequirementPdf: PropTypes.func,
    uploadIdea: PropTypes.func,
    projectId: PropTypes.number
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
    const disableEditButtons = (requirement) =>
      requirement.status !== REQUIREMENT_STATES.inactive;
    const disableUploadButton = (requirement) =>
      requirement.status !== REQUIREMENT_STATES.inactive ||
      this.props.projectId;
    const disableViewPdfButton = (requirement) => !requirement.file_url;

    return (
      <Table
        headers={this.getHeaders()}
        data={this.props.data}
        actions={
          this.props.canEdit
            ? {
                editAction: {
                  action: this.props.editRequirement,
                  disabled: disableEditButtons
                },
                deleteAction: {
                  action: this.props.deleteRequirement,
                  disabled: disableEditButtons
                },
                uploadAction: {
                  action: this.props.uploadIdea,
                  disabled: disableUploadButton
                },
                viewPdfAction: {
                  action: this.props.viewRequirementPdf,
                  disabled: disableViewPdfButton
                }
              }
            : {
                uploadAction: {
                  action: this.props.uploadIdea,
                  disabled: disableUploadButton
                },
                viewPdfAction: {
                  action: this.props.viewRequirementPdf,
                  disabled: disableViewPdfButton
                }
              }
        }
      />
    );
  }
}
