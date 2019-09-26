import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProject, clearAlert } from './ideasReducer';
import Title from '../../utils/Title';
import { ideasMessages } from '../../utils/messages';
import ShowIdea from '../../utils/components/ShowIdea';

export class IdeasDetail extends React.Component {
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
        <Title title={ideasMessages.TITLE} subtitle={ideasMessages.SUBTITLE} />
        {project.id && (
          <ShowIdea showBackButton project={project} userId={user.id} />
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
  }
});

const mapStateToProps = (state, ownProps) => ({
  projectId: ownProps.match.params.id,
  project: state.ideasReducer.project,
  user: state.authReducer.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(IdeasDetail)
);
