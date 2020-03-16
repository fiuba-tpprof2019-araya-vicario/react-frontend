import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../redux/history';
import CustomAlert from '../../utils/CustomAlert';
import { ideasMessages } from '../../utils/messages';
import { getById } from '../../utils/services/functions';
import Title from '../../utils/Title';
import { clearAlert, getInitialData } from './ideasReducer';
import IdeasTable from './IdeasTable';

export class IdeasIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    acceptRequest: PropTypes.func,
    rejectRequest: PropTypes.func,
    projects: PropTypes.array
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData();
  }

  detailAction = (id) => history.push(`/ideas/${id}`);

  acceptRequest = (id) => {
    const request = getById(this.props.projects, id);

    this.AcceptModal.getRef().showModal(
      request.requestId,
      request.id,
      request.name,
      this.props.acceptRequest
    );
  };

  rejectRequest = (id) => {
    const request = getById(this.props.projects, id);

    this.RejectModal.getRef().showModal(
      request.id,
      request.name,
      this.props.rejectRequest
    );
  };

  render() {
    return (
      <Fragment>
        <Title title={ideasMessages.TITLE} subtitle={ideasMessages.SUBTITLE} />
        <br />
        {this.renderTable()}
      </Fragment>
    );
  }

  renderTable() {
    if (this.props.projects == null || this.props.projects.length === 0) {
      return <CustomAlert message={ideasMessages.NO_RESULTS_MESSAGE} />;
    }

    return <IdeasTable data={this.props.projects} show={this.detailAction} />;
  }
}

const mapStateToProps = (state) => ({
  projects: state.ideasReducer.projects
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
  )(IdeasIndex)
);
