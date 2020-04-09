import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  uploadProposal,
  editPresentationData,
  uploadPresentation,
  uploadDocumentation,
  uploadIdea,
  acceptRequest,
  rejectRequest,
  editIdea,
  acceptProposal,
  abandonIdea,
  getInitialData
} from './myProjectReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import ShowIdeaStepper from '../../utils/components/showIdea/ShowIdeaStepper';
import UploadIdeaModal from '../../utils/components/uploadIdea/UploadIdeaModal';
import { myProjectMessages } from '../../utils/messages';
import CreateIdea from './CreateIdea';
import ReviewIdea from './ReviewIdea';
import PendingProposal from './PendingProposal';
import ProposalUnderRevision from './ProposalUnderRevision';
import PendingPresentation from './PendingPresentation';
import ProposalPublicated from './ProposalPublicated';
import PendingPublication from './PendingPublication';
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
    editPresentationData: PropTypes.func,
    uploadPresentation: PropTypes.func,
    uploadDocumentation: PropTypes.func,
    acceptProposal: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    careers: PropTypes.array,
    coautors: PropTypes.array,
    similarUsers: PropTypes.array,
    tutors: PropTypes.array,
    projectTypes: PropTypes.array,
    requests: PropTypes.array
  };

  state = { activeStep: 0 };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData(this.props.user.id, this.props.user.projectId);
  }

  componentDidUpdate() {
    const newStep = this.getActiveStep(this.props.user, this.props.project);

    if (this.state.activeStep !== newStep) {
      this.updateActiveStep(newStep);
    }
  }

  getActiveStep = (user, project) => {
    let activeStep = 0;

    if (user && user.projectId && project) {
      activeStep = project.state_id;
    }

    return activeStep;
  };

  updateActiveStep = (step) => {
    this.setState({
      activeStep: step
    });
  };

  uploadIdea = (form) => {
    this.props.uploadIdea(form);
  };

  uploadProposal = (projectId, url) => {
    this.props.uploadProposal(projectId, url);
  };

  uploadPresentation = (projectId, presentationId, url) => {
    this.props.uploadPresentation(projectId, presentationId, url);
  };

  uploadDocumentation = (projectId, presentationId, url) => {
    this.props.uploadDocumentation(projectId, presentationId, url);
  };

  editPresentationData = (projectId, presentationId, description) => {
    this.props.editPresentationData(projectId, presentationId, description);
  };

  editIdea = (id, form) => {
    this.props.editIdea(id, form);
  };

  showAbandonIdeaModal = (memberId) => {
    this.AbandonModal.getRef().showModal(
      this.props.project.id,
      memberId,
      this.props.project.name,
      this.props.abandonIdea
    );
  };

  showUploadIdeaModal = () => {
    this.UploadIdeaModal.showModal();
  };

  render() {
    const isUserCreator =
      (this.props.project &&
        this.props.user.id === this.props.project.creator_id) ||
      !this.props.project;

    console.log('similarUsers', this.props.similarUsers);

    return (
      <Fragment>
        <Row>
          <Title
            title={myProjectMessages.TITLE}
            subtitle={myProjectMessages.SUBTITLE}
          />
          <ShowIdeaStepper activeStep={this.state.activeStep} />
        </Row>
        <Row>
          <CreateIdea
            display-if={this.state.activeStep === 0}
            acceptRequest={this.props.acceptRequest}
            rejectRequest={this.props.rejectRequest}
            requests={this.props.requests}
            showUploadIdeaModal={this.showUploadIdeaModal}
          />
          <ReviewIdea
            display-if={this.state.activeStep === 1}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
            showUploadIdeaModal={this.showUploadIdeaModal}
            showAbandonIdeaModal={this.showAbandonIdeaModal}
          />
          <PendingProposal
            display-if={this.state.activeStep === 2}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
            uploadProposal={this.uploadProposal}
            acceptProposal={this.props.acceptProposal}
            showUploadIdeaModal={this.showUploadIdeaModal}
            showAbandonIdeaModal={this.showAbandonIdeaModal}
          />
          <ProposalUnderRevision
            display-if={this.state.activeStep === 3}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
          />
          <PendingPresentation
            display-if={this.state.activeStep === 4}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
          />
          <PendingPublication
            display-if={this.state.activeStep === 5}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
            editPresentationData={this.editPresentationData}
            uploadDocumentation={this.uploadDocumentation}
            uploadPresentation={this.uploadPresentation}
          />
          <ProposalPublicated
            display-if={this.state.activeStep === 6}
            isUserCreator={isUserCreator}
            user={this.props.user}
            project={this.props.project}
            uploadDocumentation={this.uploadDocumentation}
            uploadPresentation={this.uploadPresentation}
          />
        </Row>
        <UploadIdeaModal
          display-if={isUserCreator}
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
  uploadProposal: (projectId, url) => {
    dispatch(uploadProposal(projectId, url));
  },
  uploadPresentation: (projectId, presentationId, url) => {
    dispatch(uploadPresentation(projectId, presentationId, url));
  },
  editPresentationData: (projectId, presentationId, description) => {
    dispatch(editPresentationData(projectId, presentationId, description));
  },
  uploadDocumentation: (projectId, presentationId, url) => {
    dispatch(uploadDocumentation(projectId, presentationId, url));
  },
  acceptRequest: (requestId, projectId) => {
    dispatch(acceptRequest(requestId, projectId));
  },
  acceptProposal: (requestId, projectId) => {
    dispatch(acceptProposal(requestId, projectId));
  },
  rejectRequest: (requestId) => {
    dispatch(rejectRequest(requestId));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = (state) => ({
  coautors: state.myProjectReducer.coautors,
  careers: state.myProjectReducer.careers,
  requests: state.myProjectReducer.requests,
  project: state.myProjectReducer.project,
  similarUsers: state.myProjectReducer.similarUsers,
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
