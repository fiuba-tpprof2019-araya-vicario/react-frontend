import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  uploadIdea,
  editIdea,
  clearAlert,
  getInitialData
} from './myProjectReducer';
import Title from '../../utils/Title';
import BorderScreen from '../../utils/styles/BorderScreen';
import UploadIdeaModal from './modals/UploadIdeaModal';
import { myProjectMessages } from '../../utils/messages';
import CreateIdea from './CreateIdea';
import ReviewIdea from './ReviewIdea';

export class MyProjectIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    uploadIdea: PropTypes.func,
    editIdea: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    coautors: PropTypes.array,
    tutors: PropTypes.array,
    projectTypes: PropTypes.array
  };

  constructor() {
    super();
    this.state = { activeStep: 0 };
    this.uploadIdea = this.uploadIdea.bind(this);
    this.editIdea = this.editIdea.bind(this);
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData(this.props.user.id, this.props.user.projectId);
  }

  getActiveStep(user, project) {
    let activeStep = 0;

    if (user && user.projectId && project) {
      activeStep = 1;
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
          <Row>
            {this.state.activeStep === 0 ? (
              <CreateIdea showUploadIdeaModal={this.showUploadIdeaModal} />
            ) : null}
            {this.state.activeStep === 1 ? (
              <ReviewIdea
                project={this.props.project}
                showUploadIdeaModal={this.showUploadIdeaModal}
              />
            ) : null}
          </Row>
        </BorderScreen>
        <UploadIdeaModal
          uploadIdea={this.uploadIdea}
          editIdea={this.editIdea}
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
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = (state) => ({
  loading: state.myProjectReducer.loading,
  coautors: state.myProjectReducer.coautors,
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
