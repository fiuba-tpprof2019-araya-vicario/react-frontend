import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Glyphicon, Row } from 'react-bootstrap';
import history from '../../redux/history';
import CustomAlert from '../../utils/CustomAlert';
import { getRequestFromUser } from '../../utils/services/functions';
import AcceptProposalModal from './modals/AcceptProposalModal';
import ApproveProposalModal from './modals/ApproveProposalModal';
import ReprobateProjectModal from './modals/ReprobateProposalModal';
import ShowProposal from './ShowProposal';
import ShowIdeaInfo from './ShowIdeaInfo';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    nextStepMessage: PropTypes.string,
    userId: PropTypes.number,
    showProposal: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showAbandonButton: PropTypes.bool,
    showApprovalButtons: PropTypes.bool,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    acceptProposal: PropTypes.func,
    approveProposal: PropTypes.func,
    reprobateProposal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func
  };

  constructor() {
    super();

    this.showAcceptProposalModal = this.showAcceptProposalModal.bind(this);
  }

  showAcceptProposalModal() {
    this.AcceptProposal.showModal();
  }

  showReprobateProposalModal() {
    this.ReprobateProposal.showModal();
  }

  showApproveProposalModal() {
    this.ApproveProposal.showModal();
  }

  render() {
    const {
      project,
      showBackButton,
      showAbandonButton,
      userId,
      showUploadIdeaModal,
      showApprovalButtons,
      uploadProposal,
      acceptProposal,
      approveProposal,
      reprobateProposal,
      isUserCreator,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    const request = getRequestFromUser(userId, project);
    const isEditableProject = project.State.id <= 2;

    return (
      <Fragment>
        <br />
        {nextStepMessage && (
          <CustomAlert
            rowKey="infoNextStep"
            bsStyle="info"
            message={nextStepMessage}
          />
        )}
        <br />
        <Row>
          <h3>Título: {project.name}</h3>
        </Row>
        <br />
        <ShowIdeaInfo project={project} />
        <br />
        <Row>
          <h4>Descripción:</h4>
          <p>{project.description}</p>
        </Row>
        {showProposal && (
          <ShowProposal
            project={project}
            isUserCreator={isUserCreator}
            uploadProposal={uploadProposal}
          />
        )}
        <br />
        <Row className="pull-right">
          {showBackButton && (
            <Button
              className="pull-left"
              bsStyle="default"
              bsSize="small"
              onClick={history.goBack}
            >
              Volver
            </Button>
          )}
          &nbsp;
          {showAbandonButton && (
            <Button
              bsStyle="danger"
              onClick={() => showAbandonIdeaModal(userId)}
              bsSize="small"
            >
              <Glyphicon glyph="log-out">&nbsp;</Glyphicon>
              Abandonar idea
            </Button>
          )}
          &nbsp;
          {isUserCreator && isEditableProject && (
            <Button
              bsStyle="primary"
              onClick={showUploadIdeaModal}
              bsSize="small"
            >
              <i className="fa fa-pencil">&nbsp;</i>&nbsp;Editar idea
            </Button>
          )}
          {!isUserCreator &&
            project.proposal_url &&
            request &&
            request.accepted_proposal !== 'accepted' && (
              <Button
                bsStyle="success"
                onClick={() => this.showAcceptProposalModal()}
                bsSize="small"
              >
                <i className="fa fa-check">&nbsp;</i>&nbsp; Aceptar propuesta
              </Button>
            )}
          {showApprovalButtons && (
            <Fragment>
              <Button
                bsStyle="danger"
                onClick={() => this.showReprobateProposalModal()}
                bsSize="small"
              >
                <i className="fa fa-remove">&nbsp;</i>&nbsp; Reprobar propuesta
              </Button>
              &nbsp;&nbsp;
              <Button
                bsStyle="success"
                onClick={() => this.showApproveProposalModal()}
                bsSize="small"
              >
                <i className="fa fa-check">&nbsp;</i>&nbsp; Aprobar propuesta
              </Button>
            </Fragment>
          )}
        </Row>
        <AcceptProposalModal
          acceptProposal={acceptProposal}
          requestId={request ? request.id : undefined}
          projectId={project ? project.id : undefined}
          ref={(modal) => {
            this.AcceptProposal = modal;
          }}
        />
        <ApproveProposalModal
          approveProposal={approveProposal}
          projectId={project ? project.id : undefined}
          ref={(modal) => {
            this.ApproveProposal = modal;
          }}
        />
        <ReprobateProjectModal
          reprobateProposal={reprobateProposal}
          projectId={project ? project.id : undefined}
          ref={(modal) => {
            this.ReprobateProposal = modal;
          }}
        />
      </Fragment>
    );
  }
}
