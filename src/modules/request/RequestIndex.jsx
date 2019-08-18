import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { clearAlert, getRequests, acceptRequest, rejectRequest } from './requestReducer';
import { Alert } from 'react-bootstrap';
import Title from '../../utils/Title';
import { requestMessages } from '../../utils/messages';
import { withRouter } from 'react-router-dom';
import { RequestTable } from './RequestTable';

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
      <Fragment>
        <Title
          title={requestMessages.TITLE}
          subtitle={requestMessages.SUBTITLE}
        />
        { this.renderTable() }
      </Fragment>
    );
  }

  renderTable () {
    if (this.props.requests == null || this.props.requests.length === 0) {
      return (<Fragment>
        <br />
        <Alert bsStyle='info'>La búsqueda no trajo resultados</Alert>
      </Fragment>);
    } else {
      return (
        <RequestTable data={this.props.requests} accept={this.acceptRequest} reject={this.rejectRequest} />
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
