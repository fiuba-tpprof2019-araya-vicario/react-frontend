import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getProject, abandonIdea, clearAlert } from './commissionsReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import AbandonProjectModal from './modals/AbandonProjectModal';
import ShowIdea from '../../utils/components/ShowIdea';
import history from '../../redux/history';

export class CommissionsDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getProject: PropTypes.func,
    projectId: PropTypes.string,
    abandonIdea: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object
  };

  constructor() {
    super();
    this.state = { activeStep: 0 };
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
    this.showAbandonIdeaModal = this.showAbandonIdeaModal.bind(this);
    this.abandonPostAction = this.abandonPostAction.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getProject(this.props.projectId);
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

  abandonPostAction() {
    history.push('/ideas/');
  }

  showAbandonIdeaModal(memberId) {
    this.AbandonModal.getRef().showModal(
      this.props.project.id,
      memberId,
      this.props.project.name,
      this.props.abandonIdea,
      this.abandonPostAction
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
    const { user, project } = this.props;

    return (
      <Fragment>
        <Row>
          <Title
            title={commissionsMessages.TITLE}
            subtitle={commissionsMessages.SUBTITLE}
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
        {this.state.activeStep === 1 ? (
          <ShowIdea
            nextStepMessage={commissionsMessages.NEW_STEP_PROJECT_CREATED_INFO}
            showBackButton
            project={project}
            userId={user.id}
          />
        ) : null}
        {this.state.activeStep === 2 ? (
          <ShowIdea
            nextStepMessage={commissionsMessages.NEW_STEP_PROJECT_ACCEPTED_INFO}
            showBackButton
            showProposal
            showAbandonButton
            project={project}
            userId={user.id}
            showAbandonIdeaModal={this.showAbandonIdeaModal}
          />
        ) : null}
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
  getProject: (projectId) => {
    dispatch(getProject(projectId));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  abandonIdea: (projectId, memberId, postAction) => {
    dispatch(abandonIdea(projectId, memberId, postAction));
  }
});

const mapStateToProps = (state, ownProps) => ({
  loading: state.ideasReducer.loading,
  projectId: ownProps.match.params.id,
  project: state.ideasReducer.project,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(CommissionsDetail)
);