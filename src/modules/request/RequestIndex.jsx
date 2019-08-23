import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getRequests,
  acceptRequest,
  rejectRequest
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
    acceptRequest: PropTypes.func,
    studentRequests: PropTypes.array,
    tutorRequests: PropTypes.array,
    rejectRequest: PropTypes.func
  };

  constructor() {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getRequests();
  }

  acceptRequest(requestId) {
    this.props.acceptRequest(requestId);
  }

  rejectRequest(requestId) {
    this.props.rejectRequest(requestId);
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
        {this.renderTable(this.props.studentRequests)}
        <br />
        <h3>Mis solicitudes de tutor</h3>
        {this.renderTable(this.props.tutorRequests)}
      </BorderScreen>
    );
  }

  renderTable(requests) {
    if (requests == null || requests.length === 0) {
      return <CustomAlert message={requestMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <RequestTable
        data={requests}
        accept={this.acceptRequest}
        reject={this.rejectRequest}
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
  )(RequestIndex)
);
