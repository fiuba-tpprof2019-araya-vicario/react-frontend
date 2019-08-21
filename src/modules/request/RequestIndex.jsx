import React from 'react';
import { connect } from 'react-redux';
import { clearAlert, getRequests, acceptRequest, rejectRequest } from './requestReducer';
import Title from '../../utils/Title';
import { requestMessages } from '../../utils/messages';
import BorderScreen from '../../utils/styles/BorderScreen';
import { withRouter } from 'react-router-dom';
import { RequestTable } from './RequestTable';
import CustomAlert from '../../utils/CustomAlert';

export class RequestIndex extends React.Component {
  constructor () {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  componentDidMount () {
    this.props.clearAlert();
    this.props.getRequests();
  }

  acceptRequest (requestId) {
    this.props.acceptRequest(requestId);
  }

  rejectRequest (requestId) {
    this.props.rejectRequest(requestId);
  }

  render () {
    return (
      <BorderScreen>
        <Title
          title={requestMessages.TITLE}
          subtitle={requestMessages.SUBTITLE}
        />
        <br />
        { this.renderTable() }
      </BorderScreen>
    );
  }

  renderTable () {
    if (this.props.requests == null || this.props.requests.length === 0) {
      return (
        <CustomAlert message={requestMessages.NO_RESULTS_MESSAGE}/>
      );
    } else {
      return (
        <RequestTable 
          data={this.props.requests}
          accept={this.acceptRequest}
          reject={this.rejectRequest}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.requestReducer.requests
  };
};

const mapDispatch = dispatch => ({
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

export default withRouter(connect(mapStateToProps, mapDispatch)(RequestIndex));
