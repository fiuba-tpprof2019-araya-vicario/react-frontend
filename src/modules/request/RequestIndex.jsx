import PropTypes from 'prop-types';
import React from 'react';
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
import BorderScreen from '../../utils/styles/BorderScreen';
import { RequestTable } from './RequestTable';
import CustomAlert from '../../utils/CustomAlert';

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

  constructor() {
    super();
    this.acceptStudentRequest = this.acceptStudentRequest.bind(this);
    this.rejectStudentRequest = this.rejectStudentRequest.bind(this);
    this.acceptTutorRequest = this.acceptTutorRequest.bind(this);
    this.rejectTutorRequest = this.rejectTutorRequest.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getRequests();
  }

  acceptStudentRequest(requestId) {
    this.props.acceptStudentRequest(requestId);
  }

  rejectStudentRequest(requestId) {
    this.props.rejectStudentRequest(requestId);
  }

  acceptTutorRequest(requestId) {
    this.props.acceptTutorRequest(requestId);
  }

  rejectTutorRequest(requestId) {
    this.props.rejectTutorRequest(requestId);
  }

  render() {
    return (
      <BorderScreen>
        <Title
          title={requestMessages.TITLE}
          subtitle={requestMessages.SUBTITLE}
        />
        <br />
        <h3>Mis solicitudes de alumno</h3>
        {this.renderTable(
          this.props.studentRequests,
          this.acceptStudentRequest,
          rejectStudentRequest
        )}
        <br />
        <h3>Mis solicitudes de tutor</h3>
        {this.renderTable(
          this.props.tutorRequests,
          this.acceptTutorRequest,
          this.rejectTutorRequest
        )}
      </BorderScreen>
    );
  }

  renderTable(requests, acceptRequest, rejectRequest) {
    if (requests == null || requests.length === 0) {
      return <CustomAlert message={requestMessages.NO_RESULTS_MESSAGE} />;
    }
    console.log(requests);

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
  acceptStudentRequest: (requestId) => {
    dispatch(acceptStudentRequest(requestId));
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
