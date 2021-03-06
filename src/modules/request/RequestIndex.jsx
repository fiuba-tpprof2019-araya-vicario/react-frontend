import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getRequests,
  acceptTutorRequest,
  acceptStudentRequest,
  rejectTutorRequest,
  rejectStudentRequest
} from './requestReducer';
import Title from '../../utils/Title';
import { requestMessages } from '../../utils/messages';
import { getById } from '../../utils/services/functions';
import { RequestTable } from './RequestTable';
import Alert from '../../utils/Alert';
import AcceptRequestModal from './modals/AcceptRequestModal';
import RejectRequestModal from './modals/RejectRequestModal';

export class RequestIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getRequests: PropTypes.func,
    acceptTutorRequest: PropTypes.func,
    acceptStudentRequest: PropTypes.func,
    studentRequests: PropTypes.array,
    tutorRequests: PropTypes.array,
    rejectStudentRequest: PropTypes.func,
    rejectTutorRequest: PropTypes.func
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getRequests();
  }

  acceptStudentRequest = (id) => {
    const request = getById(this.props.studentRequests, id);

    this.AcceptModal.getRef().showModal(
      request.id,
      request.projectId,
      request.project,
      this.props.acceptStudentRequest
    );
  };

  rejectStudentRequest = (id) => {
    const request = getById(this.props.studentRequests, id);

    this.RejectModal.getRef().showModal(
      request.id,
      request.name,
      this.props.rejectStudentRequest
    );
  };

  acceptTutorRequest = (id) => {
    const request = getById(this.props.tutorRequests, id);

    this.AcceptModal.getRef().showModal(
      request.id,
      request.projectId,
      request.project,
      this.props.acceptTutorRequest
    );
  };

  rejectTutorRequest = (id) => {
    const request = getById(this.props.tutorRequests, id);

    this.RejectModal.getRef().showModal(
      request.id,
      request.name,
      this.props.rejectTutorRequest
    );
  };

  render() {
    return (
      <Fragment>
        <Title
          title={requestMessages.TITLE}
          subtitle={requestMessages.SUBTITLE}
        />
        <br />
        <h3>Mis solicitudes de alumno</h3>
        {this.renderTable(
          this.props.studentRequests,
          this.acceptStudentRequest,
          this.rejectStudentRequest
        )}
        <br />
        <h3>Mis solicitudes de tutor</h3>
        {this.renderTable(
          this.props.tutorRequests,
          this.acceptTutorRequest,
          this.rejectTutorRequest
        )}
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

  renderTable(requests, acceptRequest, rejectRequest) {
    if (requests == null || requests.length === 0) {
      return <Alert message={requestMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <RequestTable
        data={requests}
        accept={acceptRequest}
        reject={rejectRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tutorRequests: state.requestReducer.tutorRequests,
  studentRequests: state.requestReducer.studentRequests
});

const mapDispatch = (dispatch) => ({
  getRequests: () => {
    dispatch(getRequests());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  acceptStudentRequest: (requestId, projectId) => {
    dispatch(acceptStudentRequest(requestId, projectId));
  },
  acceptTutorRequest: (requestId) => {
    dispatch(acceptTutorRequest(requestId));
  },
  rejectStudentRequest: (requestId) => {
    dispatch(rejectStudentRequest(requestId));
  },
  rejectTutorRequest: (requestId) => {
    dispatch(rejectTutorRequest(requestId));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(RequestIndex)
);
