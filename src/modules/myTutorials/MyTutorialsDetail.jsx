import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import Stepper from 'react-stepper-horizontal';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getMyTutorials, abandonIdea, clearAlert } from './myTutorialsReducer';
import Title from '../../utils/Title';
import BorderScreen from '../../utils/styles/BorderScreen';
import { myProjectMessages } from '../../utils/messages';
import AbandonProjectModal from './modals/AbandonProjectModal';

export class MyProjectIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getMyTutorials: PropTypes.func,
    uploadIdea: PropTypes.func,
    editIdea: PropTypes.func,
    abandonIdea: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object
  };

  constructor() {
    super();
    this.state = { activeStep: 0 };
    this.uploadIdea = this.uploadIdea.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
    this.showAbandonIdeaModal = this.showAbandonIdeaModal.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getMyTutorials();
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

    return (
      <Fragment>
        <BorderScreen>
          <Row>
            <Title
              title={myProjectMessages.TITLE}
              subtitle={myProjectMessages.SUBTITLE}
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
        </BorderScreen>
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
  getMyTutorials: () => {
    dispatch(getMyTutorials());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  abandonIdea: (projectId, memberId) => {
    dispatch(abandonIdea(projectId, memberId));
  }
});

const mapStateToProps = (state, ownProps) => ({
  loading: state.myProjectReducer.loading,
  projectId: ownProps.match.params.id,
  project:
    find(
      state.myTutorialsReducer.myTutorials,
      (project) => project.id === ownProps.match.params.id
    ) ||
    find(
      state.myTutorialsReducer.myCotutorials,
      (project) => project.id === ownProps.match.params.id
    ),
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyProjectIndex)
);
