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
import EnablePresentationModal from './modals/EnablePresentationModal';
import UploadPresentationModal from './modals/UploadPresentationModal';
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
    showAcceptProposalButton: PropTypes.bool,
    showEnablePresentationButton: PropTypes.bool,
    showApprovalButtons: PropTypes.bool,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    acceptProposal: PropTypes.func,
    approveProposal: PropTypes.func,
    reprobateProposal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func,
    enablePresentation: PropTypes.func,
    uploadPresentation: PropTypes.func
  };

  static defaultProps = {
    showUsersStatus: true,
    showPresentation: false,
    showAcceptProposalButton: true,
    isUserCreator: false,
    user: {},
    project: {}
  };

  showAcceptProposalModal = () => this.AcceptProposal.showModal();

  showEnablePresentationModal = () =>
    this.EnablePresentation.getRef().showModal();

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
    isUserCreator,
    isEditableProject,
    uploadProposal
  ) => (
    <CustomAccordion
      title={`Título del proyecto: ${project.name}`}
      annexes={[
        <ShowProposal
          display-if={showProposal}
          project={project}
          canEditProposal={isUserCreator && isEditableProject}
          uploadProposal={uploadProposal}
        />
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

  getPresentationInfo = (
    project,
    isUserCreator,
    isEditableProject,
    showPresentation,
    uploadPresentation
  ) => (
    <CustomAccordion
      title="Archivos de la presentación"
      annexes={[
        <ShowPresentation
          display-if={showPresentation}
          project={project}
          canEditPresentation={isUserCreator && isEditableProject}
          uploadPresentation={uploadPresentation}
        />
      ]}
    >
      <Row>
        <Col md={1}>
          <h4 className="panelText">Documentación:</h4>
        </Col>
        <Col md={11}>
          <p className="panelText">{project.Presentation.description}</p>
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
      showAcceptProposalButton,
      user,
      showUploadIdeaModal,
      showPresentation,
      showApprovalButtons,
      showEnablePresentationButton,
      showUsersStatus,
      uploadProposal,
      enablePresentation,
      uploadPresentation,
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
    const projectId = project ? project.id : undefined;
    const requestId = request ? request.id : undefined;

    console.log(project);

    return (
      <Fragment>
        <br />
        <CustomAlert
          display-if={!!nextStepMessage}
          rowKey="infoNextStep"
          bsStyle="info"
          size={12}
          message={nextStepMessage}
        />
        {project.Requirement && this.getRequerimentInfo(project)}
        {this.getProjectInfo(
          project,
          showProposal,
          isUserCreator,
          isEditableProject,
          uploadProposal
        )}
        {project.Presentation &&
          this.getPresentationInfo(
            project,
            isUserCreator,
            isEditableProject,
            showPresentation,
            uploadPresentation
          )}
        {this.getGeneralInfo(project, showUsersStatus)}
        <Row className="pull-right">
          <Col md={12}>
            <Button
              display-if={showBackButton}
              className="pull-left"
              bsStyle="default"
              bsSize="small"
              onClick={history.goBack}
            >
              Volver
            </Button>
            &nbsp;
            <Button
              display-if={showAbandonButton}
              bsStyle="danger"
              onClick={() => showAbandonIdeaModal(user.id)}
              bsSize="small"
            >
              <Glyphicon glyph="log-out">&nbsp;</Glyphicon>
              Abandonar idea
            </Button>
            &nbsp;
            <Button
              display-if={isUserCreator && isEditableProject}
              bsStyle="primary"
              onClick={showUploadIdeaModal}
              bsSize="small"
            >
              <i className="fa fa-pencil">&nbsp;</i>&nbsp;Editar idea
            </Button>
            <Button
              display-if={
                !isUserCreator &&
                project.proposal_url &&
                showAcceptProposalButton &&
                request &&
                request.accepted_proposal !== 'accepted'
              }
              bsStyle="success"
              onClick={() => this.showAcceptProposalModal()}
              bsSize="small"
            >
              <i className="fa fa-check">&nbsp;</i>&nbsp; Aceptar propuesta
            </Button>
            <Button
              display-if={showEnablePresentationButton}
              bsStyle="success"
              onClick={() => this.showEnablePresentationModal()}
              bsSize="small"
            >
              <i className="fa fa-check">&nbsp;</i>&nbsp; Habilitar presentación
            </Button>
            <Fragment display-if={showApprovalButtons}>
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
          </Col>
        </Row>
        <AcceptProposalModal
          acceptProposal={acceptProposal}
          requestId={requestId}
          projectId={projectId}
          ref={(modal) => {
            this.AcceptProposal = modal;
          }}
        />
        <EnablePresentationModal
          onEnable={enablePresentation}
          name={project.name}
          projectId={projectId}
          ref={(modal) => {
            this.EnablePresentation = modal;
          }}
        />
        <UploadPresentationModal
          acceptProposal={acceptProposal}
          requestId={requestId}
          projectId={projectId}
          ref={(modal) => {
            this.UploadPresentation = modal;
          }}
        />
        <ApproveProposalModal
          approveProposal={approveProposal}
          projectId={projectId}
          options={careersOptions}
          ref={(modal) => {
            this.ApproveProposal = modal;
          }}
        />
        <ReprobateProjectModal
          reprobateProposal={reprobateProposal}
          projectId={projectId}
          options={careersOptions}
          ref={(modal) => {
            this.ReprobateProposal = modal;
          }}
        />
      </Fragment>
    );
  }
}
