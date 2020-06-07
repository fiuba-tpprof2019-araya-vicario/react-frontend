import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { myProjectMessages } from '../../../utils/messages';
import UploadProposalModal from './modals/UploadProposalModal';
import Itemized from '../../../utils/styles/Itemized';
import FullRow from '../../../utils/styles/FullRow';
import { getIconWithOverlay } from '../../../utils/forms/StatusIcon';
import { formatterDate } from '../../../utils/services/functions';

export default class ShowProposal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    canEditProposal: PropTypes.bool,
    uploadProposal: PropTypes.func
  };

  showApprobals = () => {
    const { project } = this.props;
    const acceptedProjects = project.ProjectCareers.filter(
      ({ status }) => status === 'accepted'
    );

    if (acceptedProjects.length === 0) {
      return null;
    }

    return (
      <Itemized
        title="Aprobaciónes de la propuesta:"
        items={acceptedProjects.map((projectCareer) => (
          <Fragment>
            {getIconWithOverlay(
              `Miembro de la comisión: ${projectCareer.Judge.name} ${
                projectCareer.Judge.surname
              } (${projectCareer.Judge.email})\n`,
              <i className="fa fa-info-circle" />
            )}
            {projectCareer.Career.name}:{' '}
            {formatterDate(projectCareer.updatedAt)}
          </Fragment>
        ))}
      />
    );
  };

  showRejectionReasons = () => {
    const { project } = this.props;
    const rejectedProjects = project.ProjectCareers.filter(
      ({ status }) => status === 'rejected'
    );

    if (rejectedProjects.length === 0) {
      return null;
    }

    return (
      <Itemized
        title="Motivos de rechazo de la propuesta:"
        items={rejectedProjects.map((projectCareer) => (
          <Fragment>
            {getIconWithOverlay(
              `Carrera: ${projectCareer.Career.name}\n
                Miembro de la comisión: ${projectCareer.Judge.name} ${
                projectCareer.Judge.surname
              } (${projectCareer.Judge.email})\n`,
              <i className="fa fa-info-circle" />
            )}
            {projectCareer.reject_reason}
          </Fragment>
        ))}
      />
    );
  };

  showUploadProposalModal = () => {
    this.UploadProposal.showModal();
  };

  render() {
    const { project, canEditProposal, uploadProposal } = this.props;
    const proposal = project.proposal_url ? (
      <a
        className="fixMarginLeft"
        onClick={(event) => event.stopPropagation()}
        href={project.proposal_url}
        target="_blank"
      >
        {project.proposal_name}
      </a>
    ) : (
      <span className="fixMarginLeft">{myProjectMessages.EMPTY_PROPOSAL}</span>
    );

    return (
      <FullRow>
        <Fragment>
          <h4>Propuesta:</h4>
          <Row>
            <Fragment display-if={canEditProposal}>
              <Button
                bsStyle="success"
                className="fixMarginLeft"
                bsSize="xs"
                onClick={() => this.showUploadProposalModal()}
              >
                <i className="fa fa-upload" />{' '}
                {project.proposal_url ? 'Editar propuesta' : 'Subir propuesta'}
              </Button>{' '}
              {proposal}{' '}
            </Fragment>
            <Fragment display-if={!canEditProposal}>{proposal}</Fragment>
          </Row>
          <UploadProposalModal
            uploadProposal={uploadProposal}
            projectId={project.id}
            ref={(modal) => {
              this.UploadProposal = modal;
            }}
          />
        </Fragment>
        {this.showRejectionReasons()}
        {this.showApprobals()}
      </FullRow>
    );
  }
}
