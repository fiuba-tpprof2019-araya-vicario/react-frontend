import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProject } from './publicProjectsReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import { publicProjectsMessages } from '../../utils/messages';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';

export class PublicProjectsDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    user: PropTypes.object,
    getProject: PropTypes.func,
    project: PropTypes.object,
    projectId: PropTypes.string
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getProject(this.props.projectId);
  }

  render() {
    const { user, project } = this.props;

    return (
      <Fragment>
        <Title
          title={publicProjectsMessages.TITLE}
          subtitle={publicProjectsMessages.SUBTITLE}
        />
        <ShowIdea
          display-if={project.id}
          showBackButton
          project={project}
          user={user}
          showUsersStatus={false}
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
  }
});

const mapStateToProps = (state, ownProps) => ({
  projectId: ownProps.match.params.id,
  project: state.publicProjectsReducer.project,
  user: state.authReducer.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(PublicProjectsDetail)
);
