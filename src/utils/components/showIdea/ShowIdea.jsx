import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Col, Glyphicon, Row } from 'react-bootstrap';
import history from '../../../redux/history';
import CustomAlert from '../../CustomAlert';
import { getRequestFromUser, getSelectOptions } from '../../services/functions';
import FullRow from '../../styles/FullRow';
import CustomAccordion from '../../CustomAccordion';
import AcceptProposalModal from './modals/AcceptProposalModal';
import ApproveProposalModal from './modals/ApproveProposalModal';
import ReprobateProjectModal from './modals/ReprobateProposalModal';
import ShowGeneralInformation from './ShowGeneralInformation';
import ShowProposal from './ShowProposal';
import ShowPresentation from './ShowPresentation';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    nextStepMessage: PropTypes.string,
    user: PropTypes.object,
    showProposal: PropTypes.bool,
    showPresentation: PropTypes.bool,
    showUsersStatus: PropTypes.bool,
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

  static defaultProps = {
    showUsersStatus: true,
    showPresentation: false,
    isUserCreator: false,
    user: {},
    project: {}
  };

  showAcceptProposalModal = () => this.AcceptProposal.showModal();

  showReprobateProposalModal = () => this.ReprobateProposal.showModal();

  showApproveProposalModal = () => this.ApproveProposal.showModal();

  getRequerimentInfo = (project) => (
    <CustomAccordion
      title={`Título del requerimiento: ${project.Requirement.name}`}
      annexes={[
        project.Requirement.file_url && (
          <Row>
            <Col md={1}>
              <h4 className="panelText">Anexo:</h4>
            </Col>
            <Col md={11}>
              <p className="panelText">
                <a href={project.Requirement.file_url} target="_blank">
                  {project.Requirement.file_name}
                </a>
              </p>
            </Col>
          </Row>
        )
      ]}
    >
      <Row>
        <Col md={1}>
          <h4 className="panelText">Descripción:</h4>
        </Col>
        <Col md={11}>
          <p className="panelText">{project.Requirement.description}</p>
        </Col>
      </Row>
    </CustomAccordion>
  );

  getProjectInfo = (
    project,
    showProposal,
    showPresentation,
    isUserCreator,
    isEditableProject,
    uploadProposal
  ) => (
    <CustomAccordion
      title={`Título del proyecto: ${project.name}`}
      annexes={[
        showProposal && (
          <ShowProposal
            project={project}
            canEditProposal={isUserCreator && isEditableProject}
            uploadProposal={uploadProposal}
          />
        ),
        showPresentation && (
          <ShowPresentation
            project={project}
            canEditProposal={isUserCreator && isEditableProject}
            uploadProposal={uploadProposal}
          />
        )
      ]}
    >
      <Row>
        <Col md={1}>
          <h4 className="panelText">Descripción:</h4>
        </Col>
        <Col md={11}>
          <p className="panelText">{project.description}</p>
        </Col>
      </Row>
    </CustomAccordion>
  );

  getGeneralInfo = (project, showUsersStatus) => (
    <CustomAccordion title="Información general">
      <FullRow>
        <Col md={12}>
          <ShowGeneralInformation
            project={project}
            showUsersStatus={showUsersStatus}
          />
        </Col>
      </FullRow>
    </CustomAccordion>
  );

  getApprovalOptions = (user, project) => {
    const careers =
      user &&
      user.careers &&
      user.careers.filter((career) =>
        project.ProjectCareers.some(
          (projectCareer) => projectCareer.Career.id === career.id
        )
      );

    return careers ? getSelectOptions(careers, {}) : undefined;
  };

  render() {
    const {
      project,
      showBackButton,
      showAbandonButton,
      user,
      showUploadIdeaModal,
      showPresentation,
      showApprovalButtons,
      showUsersStatus,
      uploadProposal,
      acceptProposal,
      approveProposal,
      reprobateProposal,
      isUserCreator,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    const request = getRequestFromUser(user ? user.id : null, project);
    const isEditableProject = project.State.id <= 2;
    const careersOptions = this.getApprovalOptions(user, project);

    console.log(project);

    return (
      <Fragment>
        <br />
        {nextStepMessage && (
          <CustomAlert
            rowKey="infoNextStep"
            bsStyle="info"
            size={12}
            message={nextStepMessage}
          />
        )}
        {project.Requirement && this.getRequerimentInfo(project)}
        {this.getProjectInfo(
          project,
          showProposal,
          showPresentation,
          isUserCreator,
          isEditableProject,
          uploadProposal
        )}
        {this.getGeneralInfo(project, showUsersStatus)}
        <Row className="pull-right">
          <Col md={12}>
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
                onClick={() => showAbandonIdeaModal(user.id)}
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
                  <i className="fa fa-remove">&nbsp;</i>&nbsp; Reprobar
                  propuesta
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
          </Col>
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
          options={careersOptions}
          ref={(modal) => {
            this.ApproveProposal = modal;
          }}
        />
        <ReprobateProjectModal
          reprobateProposal={reprobateProposal}
          projectId={project ? project.id : undefined}
          options={careersOptions}
          ref={(modal) => {
            this.ReprobateProposal = modal;
          }}
        />
      </Fragment>
    );
  }
}
