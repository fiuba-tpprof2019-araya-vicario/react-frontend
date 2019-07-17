import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { uploadIdea, clearAlert, getInitialData} from './myProjectReducer';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Title from '../../utils/Title';
import UploadIdeaModal from './modals/UploadIdeaModal';
import { myProjectMessages } from '../../utils/messages';
import Stepper from 'react-stepper-horizontal';
import CreateIdea from './CreateIdea';
import ReviewIdea from './ReviewIdea';

export class MyProjectIndex extends React.Component {
  constructor() {
    super();
    this.uploadIdea = this.uploadIdea.bind(this);
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData(this.props.user.id, this.props.user.projectId);
  }

  uploadIdea(form) {
    this.props.uploadIdea(form);
  }

  showUploadIdeaModal() {
    this.UploadIdeaModal.showModal();
  }

  getActiveStep() {
    const { user, project } = this.props;
    let activeStep = 0;
    if (user.projectId && project) {
      activeStep = 1;
    }
    return activeStep;
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
    const activeStep = this.getActiveStep();
    return (
      <Fragment>
        <Row>
          <Col md={1} lg={1} />
          <Col md={10} lg={10}>
            <Row>
              <Title
                title={myProjectMessages.TITLE}
                subtitle={myProjectMessages.SUBTITLE}
              />
              <div className="step-progress">
                <Stepper
                  steps={steps}
                  activeStep={activeStep}
                  defaultTitleOpacity="0.5"
                  completeTitleOpacity="0.75"
                  activeColor="#468847"
                />
              </div>
            </Row>
            <Row>
              {activeStep == 0 ? (
                <CreateIdea showUploadIdeaModal={this.showUploadIdeaModal} />
              ) : null}
              {activeStep == 1 ? (
                <ReviewIdea project={this.props.project} showUploadIdeaModal={this.showUploadIdeaModal} />
              ) : null}
            </Row>
          </Col>
          <Col md={1} lg={1} />
        </Row>
        <UploadIdeaModal
          uploadIdea={this.uploadIdea}
          coautors={this.props.coautors}
          tutors={this.props.tutors}
          projectTypes={this.props.projectTypes}
          project={this.props.project}
          ref={modal => {
            this.UploadIdeaModal = modal;
          }}
          user={this.props.isAuthenticated && this.props.user}
        />
      </Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  getInitialData: (id, projectId) => {
    dispatch(getInitialData(id, projectId));
  },
  uploadIdea: form => {
    dispatch(uploadIdea(form));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = state => {
  return {
    loading: state.myProjectReducer.loading,
    coautors: state.myProjectReducer.coautors,
    project: state.myProjectReducer.project,
    projectTypes: state.myProjectReducer.projectTypes,
    tutors: state.myProjectReducer.tutors,
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyProjectIndex)
);
