import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  getProject,
  approve,
  reprobate,
  clearAlert
} from './commissionsReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import ShowIdea from '../../utils/components/ShowIdea';
import history from '../../redux/history';

export class CommissionsDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getProject: PropTypes.func,
    approveProposal: PropTypes.func,
    reprobateProposal: PropTypes.func,
    projectId: PropTypes.string,
    user: PropTypes.object,
    project: PropTypes.object
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getProject(this.props.projectId);
  }

  render() {
    const { user, project, approveProposal, reprobateProposal } = this.props;

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
            approveProposal={approveProposal}
            reprobateProposal={reprobateProposal}
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
  approveProposal: (projectId) => {
    dispatch(approve(projectId));
  },
  reprobateProposal: (projectId) => {
    dispatch(reprobate(projectId, history.push('/commissions/')));
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
