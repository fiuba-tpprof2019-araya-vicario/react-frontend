import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInitialData } from './publicProjectsReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import { publicProjectsMessages } from '../../utils/messages';
import PublicProjectsTable from './PublicProjectsTable';
import Alert from '../../utils/Alert';
import history from '../../redux/history';

export class PublicProjectsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    projects: PropTypes.array
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData();
  }

  detailAction = (id) => history.push(`/public/${id}`);

  render() {
    return (
      <Fragment>
        <Title
          title={publicProjectsMessages.TITLE}
          subtitle={publicProjectsMessages.SUBTITLE}
        />
        <br />
        {this.renderTable()}
      </Fragment>
    );
  }

  renderTable() {
    if (this.props.projects == null || this.props.projects.length === 0) {
      return <Alert message={publicProjectsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <PublicProjectsTable
        data={this.props.projects}
        show={this.detailAction}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.publicProjectsReducer.projects
});

const mapDispatch = (dispatch) => ({
  getInitialData: () => {
    dispatch(getInitialData());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(PublicProjectsIndex)
);
