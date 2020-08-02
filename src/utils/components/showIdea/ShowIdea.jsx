import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Col, Glyphicon, Row } from 'react-bootstrap';
import history from '../../../redux/history';
import Alert from '../../Alert';
import { getRequestFromUser, getSelectOptions } from '../../services/functions';
import FullRow from '../../styles/FullRow';
import Accordion from '../../Accordion';
import AcceptProposalModal from './modals/AcceptProposalModal';
import ApproveProposalModal from './modals/ApproveProposalModal';
import EnablePresentationModal from './modals/EnablePresentationModal';
import SubmitPresentationModal from './modals/SubmitPresentationModal';
import ReprobateProjectModal from './modals/ReprobateProposalModal';
import ShowGeneralInformation from './ShowGeneralInformation';
import ShowDescription from './ShowDescription';
import ShowProposal from './ShowProposal';
import ShowPresentation from './ShowPresentation';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    nextStepMessage: PropTypes.string,
    user: PropTypes.object,
    showProposal: PropTypes.bool,
    showUsersStatus: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showAbandonButton: PropTypes.bool,
    showAcceptProposalButton: PropTypes.bool,
    showEnablePresentationButton: PropTypes.bool,
    showApprovalButtons: PropTypes.bool,
    isUserCreator: PropTypes.bool,
    isUserAdmin: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    acceptProposal: PropTypes.func,
    approveProposal: PropTypes.func,
    editPresentationData: PropTypes.func,
    reprobateProposal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func,
    enablePresentation: PropTypes.func,
    submitPresentation: PropTypes.func,
    uploadDocumentation: PropTypes.func,
    uploadPresentation: PropTypes.func
  };

  static defaultProps = {
    showUsersStatus: true,
    showAcceptProposalButton: true,
    isUserCreator: false,
    user: {},
    project: {}
  };

  showAcceptProposalModal = () => this.AcceptProposal.showModal();

  showEnablePresentationModal = () =>
    this.EnablePresentation.getRef().showModal();

  showSubmitPresentationModal = () => this.SubmitPresentation.showModal();

  showReprobateProposalModal = () => this.ReprobateProposal.showModal();

  showApproveProposalModal = () => this.ApproveProposal.showModal();

  getRequerimentInfo = (project) => (
    <Accordion
      title={`Título del requerimiento: ${project.Requirement.name}`}
      annexes={[
        project.Requirement.file_url && (
          <Row>
            <Col md={1}>
              <h4 className="panelText">Anexo:</h4>
            </Col>
            <Col md={11}>
              <p className="panelText">
                <a
                  href={project.Requirement.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
    </Accordion>
  );

  getProjectInfo = (
    project,
    showProposal,
    isUserCreator,
    isEditableProposal,
    uploadProposal
  ) => (
    <Accordion
      title={`Título del proyecto: ${project.name}`}
      annexes={[
        <ShowProposal
          display-if={showProposal}
          project={project}
          canEditProposal={isUserCreator && isEditableProposal}
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
    </Accordion>
  );

  getPresentationInfo = (
    project,
    isUserCreator,
    isEditablePresentation,
    uploadPresentation,
    uploadDocumentation,
    editPresentationData
  ) => (
    <Accordion
      title="Archivos de la presentación final"
      annexes={[
        <ShowPresentation
          name="Presentación"
          element="presentation"
          project={project}
          required
          isUserCreator={isUserCreator}
          saveVisibility={editPresentationData}
          canEdit={isEditablePresentation}
          upload={uploadPresentation}
        />,
        <ShowPresentation
          name="Documentación"
          element="documentation"
          project={project}
          required
          isUserCreator={isUserCreator}
          saveVisibility={editPresentationData}
          canEdit={isEditablePresentation}
          upload={uploadDocumentation}
        />
      ]}
    >
      <Row>
        <Col md={2}>
          <h4 className="panelText">Sinopsis del proyecto:</h4>
        </Col>
        <Col md={10}>
          <ShowDescription
            project={project}
            saveDescription={editPresentationData}
          />
        </Col>
      </Row>
    </Accordion>
  );

  getGeneralInfo = (project, showUsersStatus) => (
    <Accordion title="Información general">
      <FullRow>
        <Col md={12}>
          <ShowGeneralInformation
            project={project}
            showUsersStatus={showUsersStatus}
          />
        </Col>
      </FullRow>
    </Accordion>
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
      showApprovalButtons,
      showEnablePresentationButton,
      showUsersStatus,
      uploadProposal,
      enablePresentation,
      uploadPresentation,
      editPresentationData,
      uploadDocumentation,
      submitPresentation,
      acceptProposal,
      approveProposal,
      reprobateProposal,
      isUserCreator,
      isUserAdmin,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    const request = getRequestFromUser(user ? user.id : null, project);
    const isEditableProposal = project.State.id <= 2;
    const isEditablePresentation =
      (project.State.id === 5 && isUserCreator) ||
      (project.State.id === 6 && isUserAdmin);
    const careersOptions = this.getApprovalOptions(user, project);
    const projectId = project ? project.id : undefined;
    const requestId = request ? request.id : undefined;
    const presentationId = project.Presentation
      ? project.Presentation.id
      : undefined;

    return (
      <Fragment>
        <br />
        <Alert
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
          isEditableProposal,
          uploadProposal
        )}
        {project.Presentation &&
          this.getPresentationInfo(
            project,
            isUserCreator,
            isEditablePresentation,
            uploadPresentation,
            uploadDocumentation,
            editPresentationData
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
            </Button>{' '}
            <Button
              display-if={showAbandonButton}
              bsStyle="danger"
              onClick={() => showAbandonIdeaModal(user.id)}
              bsSize="small"
            >
              <Glyphicon glyph="log-out" /> Abandonar idea
            </Button>{' '}
            <Button
              display-if={isUserCreator && isEditableProposal}
              bsStyle="primary"
              onClick={showUploadIdeaModal}
              bsSize="small"
            >
              <i className="fa fa-pencil" /> Editar idea
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
              <i className="fa fa-check" /> Aceptar propuesta
            </Button>
            <Button
              display-if={showEnablePresentationButton}
              bsStyle="success"
              onClick={() => this.showEnablePresentationModal()}
              bsSize="small"
            >
              <i className="fa fa-check" /> Habilitar presentación
            </Button>
            <Button
              display-if={
                submitPresentation &&
                project.Presentation.presentation_url &&
                project.Presentation.documentation_url
              }
              bsStyle="success"
              onClick={() => this.showSubmitPresentationModal()}
              bsSize="small"
            >
              <i className="fa fa-upload" /> Subir archivos de presentación
            </Button>
            <Fragment display-if={showApprovalButtons}>
              <Button
                bsStyle="danger"
                onClick={() => this.showReprobateProposalModal()}
                bsSize="small"
              >
                <i className="fa fa-remove" /> Reprobar propuesta
              </Button>{' '}
              <Button
                bsStyle="success"
                onClick={() => this.showApproveProposalModal()}
                bsSize="small"
              >
                <i className="fa fa-check" /> Aprobar propuesta
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
        <SubmitPresentationModal
          submitPresentation={submitPresentation}
          presentationId={presentationId}
          projectId={projectId}
          ref={(modal) => {
            this.SubmitPresentation = modal;
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
