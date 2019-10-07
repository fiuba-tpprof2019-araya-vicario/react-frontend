import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Button,
  Col,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Panel,
  Row
} from 'react-bootstrap';
import history from '../../../redux/history';
import CustomAlert from '../../../utils/CustomAlert';
import {
  getRequestFromUser,
  getSelectOptions
} from '../../../utils/services/functions';
import FullRow from '../../../utils/styles/FullRow';
import AcceptProposalModal from './modals/AcceptProposalModal';
import ApproveProposalModal from './modals/ApproveProposalModal';
import ReprobateProjectModal from './modals/ReprobateProposalModal';
import ShowIdeaInfo from './ShowIdeaInfo';
import ShowProposal from './ShowProposal';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    nextStepMessage: PropTypes.string,
    user: PropTypes.object,
    showProposal: PropTypes.bool,
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

  static defaultProps = { showUsersStatus: true, isUserCreator: false };

  showAcceptProposalModal = () => this.AcceptProposal.showModal();

  showReprobateProposalModal = () => this.ReprobateProposal.showModal();

  showApproveProposalModal = () => this.ApproveProposal.showModal();

  getRequerimentInfo = (project) => (
    <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle>
          <FullRow>
            <h4>
              <i className="fa fa-chevron-down" />
              &nbsp;Título del requerimiento: {project.Requirement.name}
            </h4>
          </FullRow>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <Row>
            <Col md={1}>
              <h4 className="panelText">Descripción:</h4>
            </Col>
            <Col md={11}>
              <p className="panelText">{project.Requirement.description}</p>
            </Col>
          </Row>
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );

  getProjectInfo = (project, showProposal, isUserCreator, uploadProposal) => (
    <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle>
          <FullRow>
            <h4>
              <i className="fa fa-chevron-down" />
              &nbsp;Título del proyecto: {project.name}
            </h4>
          </FullRow>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <Row>
            <Col md={1}>
              <h4 className="panelText">Descripción:</h4>
            </Col>
            <Col md={11}>
              <p className="panelText">{project.description}</p>
            </Col>
          </Row>
        </Panel.Body>
        {showProposal && (
          <ListGroup>
            <ListGroupItem>
              <ShowProposal
                project={project}
                isUserCreator={isUserCreator}
                uploadProposal={uploadProposal}
              />
            </ListGroupItem>
          </ListGroup>
        )}
      </Panel.Collapse>
    </Panel>
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
          isUserCreator,
          uploadProposal
        )}
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>
              <FullRow>
                <h4>
                  <i className="fa fa-chevron-down" />
                  &nbsp;Información general
                </h4>
              </FullRow>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <FullRow>
                <Col md={12}>
                  <ShowIdeaInfo
                    project={project}
                    showUsersStatus={showUsersStatus}
                  />
                </Col>
              </FullRow>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
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
