import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getInitialData,
  acceptRequest,
  rejectRequest
} from './ideasReducer';
import Title from '../../utils/Title';
import { ideasMessages } from '../../utils/messages';
import IdeasTable from './IdeasTable';
import CustomAlert from '../../utils/CustomAlert';
import { getById } from '../../utils/services/functions';
import history from '../../redux/history';
import AcceptRequestModal from './modals/AcceptRequestModal';
import RejectRequestModal from './modals/RejectRequestModal';

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

  detailAction = (id) => {
    history.push(`/ideas/${id}`);
  };

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
        <AcceptRequestModal
          ref={(modal) => {
            this.AcceptModal = modal;
          }}
        />
        <RejectRequestModal
          ref={(modal) => {
            this.RejectModal = modal;
          }}
        />
      </Fragment>
    );
  }

  renderTable() {
    if (this.props.projects == null || this.props.projects.length === 0) {
      return <CustomAlert message={ideasMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <IdeasTable
        data={this.props.projects}
        show={this.detailAction}
        accept={this.acceptRequest}
        reject={this.rejectRequest}
      />
    );
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
  },
  acceptRequest: (requestId) => {
    dispatch(acceptRequest(requestId));
  },
  rejectRequest: (requestId) => {
    dispatch(rejectRequest(requestId));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(IdeasIndex)
);
