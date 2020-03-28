import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  getMyTutorial,
  abandonIdea,
  enablePresentation,
  submitPresentation,
  acceptProposal
} from './myTutorialsReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import { myTutorialsMessages } from '../../utils/messages';
import AbandonProjectModal from './modals/AbandonProjectModal';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';
import history from '../../redux/history';

export class MyProjectDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getMyTutorial: PropTypes.func,
    accept: PropTypes.func,
    projectId: PropTypes.string,
    abandonIdea: PropTypes.func,
    submitPresentation: PropTypes.func,
    user: PropTypes.object,
    enablePresentation: PropTypes.func,
    project: PropTypes.object
  };

  constructor() {
    super();
    this.state = { activeStep: 0 };
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getMyTutorial(this.props.projectId);
  }

  getActiveStep(user, project) {
    let activeStep = 0;

    if (user && project) {
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

  abandonPostAction = () => {
    history.push('/my_tutorials/');
  };

  showAbandonIdeaModal = (memberId) => {
    this.AbandonModal.getRef().showModal(
      this.props.project.id,
      memberId,
      this.props.project.name,
      this.props.abandonIdea,
      this.abandonPostAction
    );
  };

  enablePresentation = (projectId) => {
    this.props.enablePresentation(projectId);
  };

  submitPresentation = (projectId, presentationId) => {
    this.props.submitPresentation(projectId, presentationId);
  };

  showUploadIdeaModal = () => {
    this.UploadIdeaModal.showModal();
  };

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
    const { user, project, accept } = this.props;

    return (
      <Fragment>
        <Row>
          <Title
            title={myTutorialsMessages.TITLE}
            subtitle={myTutorialsMessages.SUBTITLE}
          />
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
          {this.state.activeStep === 1 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROJECT_CREATED_INFO
              }
              showBackButton
              project={project}
              user={user}
            />
          ) : null}
          {this.state.activeStep === 2 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROJECT_ACCEPTED_INFO
              }
              showBackButton
              showProposal
              acceptProposal={accept}
              showAbandonButton
              project={project}
              user={user}
              showAbandonIdeaModal={this.showAbandonIdeaModal}
            />
          ) : null}
          {this.state.activeStep === 3 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROPOSAL_UNDER_REVISION_INFO
              }
              showBackButton
              project={project}
              user={user}
              showProposal
            />
          ) : null}
          {this.state.activeStep === 4 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROPOSAL_PENDING_PRESENTATION_INFO
              }
              showBackButton
              project={project}
              user={user}
              showProposal
              showEnablePresentationButton
              enablePresentation={this.enablePresentation}
            />
          ) : null}
          {this.state.activeStep === 5 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROPOSAL_PENDING_PUBLICATION_INFO
              }
              showBackButton
              project={project}
              user={user}
              showProposal
              submitPresentation={this.submitPresentation}
            />
          ) : null}
          {this.state.activeStep === 6 ? (
            <ShowIdea
              nextStepMessage={
                myTutorialsMessages.NEW_STEP_PROPOSAL_PROPOSAL_PUBLICATED_INFO
              }
              showBackButton
              project={project}
              user={user}
              showProposal
            />
          ) : null}
          <AbandonProjectModal
            ref={(modal) => {
              this.AbandonModal = modal;
            }}
          />
        </Row>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getMyTutorial: (projectId) => {
    dispatch(getMyTutorial(projectId));
  },
  accept: (requestId, projectId) => {
    dispatch(acceptProposal(requestId, projectId));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  abandonIdea: (projectId, memberId, postAction) => {
    dispatch(abandonIdea(projectId, memberId, postAction));
  },
  enablePresentation: (projectId) => {
    dispatch(enablePresentation(projectId));
  },
  submitPresentation: (projectId, presentationId) => {
    dispatch(submitPresentation(projectId, presentationId));
  }
});

const mapStateToProps = (state, ownProps) => ({
  projectId: ownProps.match.params.id,
  project: state.myTutorialsReducer.project,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyProjectDetail)
);
