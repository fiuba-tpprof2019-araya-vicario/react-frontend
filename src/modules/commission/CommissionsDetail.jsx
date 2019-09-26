import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getProject, rejectIdea, clearAlert } from './commissionsReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import ShowIdea from '../../utils/components/ShowIdea';
import history from '../../redux/history';

export class CommissionsDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getProject: PropTypes.func,
    projectId: PropTypes.string,
    rejectIdea: PropTypes.func,
    user: PropTypes.object,
    project: PropTypes.object
  };

  constructor() {
    super();
    this.showRejectModal = this.showRejectModal.bind(this);
    this.rejectPostAction = this.rejectPostAction.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getProject(this.props.projectId);
  }

  rejectPostAction() {
    history.push('/ideas/');
  }

  showRejectModal(memberId) {
    this.AbandonModal.getRef().showModal(
      this.props.project.id,
      memberId,
      this.props.project.name,
      this.props.rejectIdea,
      this.abandonPostAction
    );
  }

  showUploadIdeaModal() {
    this.UploadIdeaModal.showModal();
  }

  render() {
    const { user, project } = this.props;

    return (
      <Fragment>
        <Row>
          <Title
            title={commissionsMessages.TITLE}
            subtitle={commissionsMessages.SUBTITLE}
          />
        </Row>
        {project.id && (
          <ShowIdea
            nextStepMessage={
              commissionsMessages.NEW_STEP_PROPOSAL_UNDER_REVISION_INFO
            }
            showBackButton
            showProposal
            showApprovalButtons
            project={project}
            userId={user.id}
          />
        )}
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
  rejectIdea: (projectId, memberId, postAction) => {
    dispatch(rejectIdea(projectId, memberId, postAction));
  }
});

const mapStateToProps = (state, ownProps) => ({
  projectId: ownProps.match.params.id,
  project: state.commissionsReducer.project,
  user: state.authReducer.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(CommissionsDetail)
);
