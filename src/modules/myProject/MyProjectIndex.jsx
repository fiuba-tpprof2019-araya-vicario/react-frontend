import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  uploadProposal,
  uploadIdea,
  acceptRequest,
  rejectRequest,
  editIdea,
  abandonIdea,
  clearAlert,
  getInitialData
} from './myProjectReducer';
import Title from '../../utils/Title';
import UploadIdeaModal from './modals/UploadIdeaModal';
import { myProjectMessages } from '../../utils/messages';
import CreateIdea from './CreateIdea';
import ReviewIdea from './ReviewIdea';
import PendingProposal from './PendingProposal';
import AbandonProjectModal from './modals/AbandonProjectModal';

export class MyProjectIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    uploadIdea: PropTypes.func,
    editIdea: PropTypes.func,
    acceptRequest: PropTypes.func,
    rejectRequest: PropTypes.func,
    abandonIdea: PropTypes.func,
    uploadProposal: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    careers: PropTypes.array,
    coautors: PropTypes.array,
    tutors: PropTypes.array,
    projectTypes: PropTypes.array,
    requests: PropTypes.array
  };

  constructor() {
    super();
    this.state = { activeStep: 0 };
    this.uploadIdea = this.uploadIdea.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
    this.showAbandonIdeaModal = this.showAbandonIdeaModal.bind(this);
    this.uploadProposal = this.uploadProposal.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData(this.props.user.id, this.props.user.projectId);
  }

  getActiveStep(user, project) {
    let activeStep = 0;

    if (user && user.projectId && project) {
      activeStep = project.state_id;
    }

    return activeStep;
  }

  updateActiveStep(step) {
    this.setState({
      activeStep: step
    });
  }

  componentDidUpdate() {
    const newStep = this.getActiveStep(this.props.user, this.props.project);

    if (this.state.activeStep !== newStep) {
      this.updateActiveStep(newStep);
    }
  }

  uploadIdea(form) {
    this.props.uploadIdea(form);
  }

  uploadProposal(proposal, url) {
    this.props.uploadProposal(proposal, url);
  }

  editIdea(id, form) {
    this.props.editIdea(id, form);
  }

  showAbandonIdeaModal(memberId) {
    this.AbandonModal.getRef().showModal(
      this.props.project.id,
      memberId,
      this.props.project.name,
      this.props.abandonIdea
    );
  }

  showUploadIdeaModal() {
    this.UploadIdeaModal.showModal();
  }

  render() {
    const steps = [
      { title: 'Crear idea' },
      { title: 'Idea en revisión' },
      { title: 'Pendiente de propuesta' },
      { title: 'Propuesta en revisión' },
      { title: 'Pendiente de presentación' },
      { title: 'Pendiente de publicación' },
      { title: 'Propuesta publicada' }
    ];
    const isUserCreator =
      (this.props.project &&
        this.props.user.id === this.props.project.creator_id) ||
      !this.props.project;

    return (
      <Fragment>
        <Title
          title={myProjectMessages.TITLE}
          subtitle={myProjectMessages.SUBTITLE}
        />
        <Row>
          <div className="step-progress">
            <Stepper
              steps={steps}
              activeStep={this.state.activeStep}
              defaultTitleOpacity="0.5"
              completeTitleOpacity="0.75"
              activeColor="#468847"
            />
          </div>
        </Row>
        <Row>
          {this.state.activeStep === 0 ? (
            <CreateIdea
              acceptRequest={this.props.acceptRequest}
              rejectRequest={this.props.rejectRequest}
              requests={this.props.requests}
              showUploadIdeaModal={this.showUploadIdeaModal}
            />
          ) : null}
          {this.state.activeStep === 1 ? (
            <ReviewIdea
              isUserCreator={isUserCreator}
              userId={this.props.user.id}
              project={this.props.project}
              showUploadIdeaModal={this.showUploadIdeaModal}
              showAbandonIdeaModal={this.showAbandonIdeaModal}
            />
          ) : null}
          {this.state.activeStep === 2 ? (
            <PendingProposal
              isUserCreator={isUserCreator}
              userId={this.props.user.id}
              project={this.props.project}
              uploadProposal={this.uploadProposal}
              showUploadIdeaModal={this.showUploadIdeaModal}
              showAbandonIdeaModal={this.showAbandonIdeaModal}
            />
          ) : null}
        </Row>
        {isUserCreator && (
          <UploadIdeaModal
            uploadIdea={this.uploadIdea}
            editIdea={this.editIdea}
            careers={this.props.careers}
            coautors={this.props.coautors}
            tutors={this.props.tutors}
            projectTypes={this.props.projectTypes}
            project={this.props.project}
            editMode={this.state.activeStep}
            ref={(modal) => {
              this.UploadIdeaModal = modal;
            }}
            user={this.props.isAuthenticated && this.props.user}
          />
        )}
        <AbandonProjectModal
          ref={(modal) => {
            this.AbandonModal = modal;
          }}
        />
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getInitialData: (id, projectId) => {
    dispatch(getInitialData(id, projectId));
  },
  uploadIdea: (form) => {
    dispatch(uploadIdea(form));
  },
  editIdea: (id, form) => {
    dispatch(editIdea(id, form));
  },
  abandonIdea: (projectId, memberId) => {
    dispatch(abandonIdea(projectId, memberId));
  },
  uploadProposal: (project, url) => {
    dispatch(uploadProposal(project, url));
  },
  acceptRequest: (requestId, projectId) => {
    dispatch(acceptRequest(requestId, projectId));
  },
  rejectRequest: (requestId) => {
    dispatch(rejectRequest(requestId));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = (state) => ({
  loading: state.myProjectReducer.loading,
  coautors: state.myProjectReducer.coautors,
  careers: state.myProjectReducer.careers,
  requests: state.myProjectReducer.requests,
  project: state.myProjectReducer.project,
  projectTypes: state.myProjectReducer.projectTypes,
  tutors: state.myProjectReducer.tutors,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyProjectIndex)
);
