import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getInitialData,
  acceptRequest,
  rejectRequest
} from './myTutorialsReducer';
import Title from '../../utils/Title';
import { myTutorialsMessages } from '../../utils/messages';
import { MyTutorialsTable } from './MyTutorialsTable';
import CustomAlert from '../../utils/CustomAlert';
import { getById } from '../../utils/services/functions';
import history from '../../redux/history';
import AcceptRequestModal from './modals/AcceptRequestModal';
import RejectRequestModal from './modals/RejectRequestModal';

export class MyTutorialsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    acceptRequest: PropTypes.func,
    rejectRequest: PropTypes.func,
    myTutorials: PropTypes.array
  };

  constructor() {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData();
  }

  detailAction(id) {
    history.push(`/my_tutorials/${id}`);
  }

  acceptRequest(id) {
    const request = getById(this.props.myTutorials, id);

    this.AcceptModal.getRef().showModal(
      request.requestId,
      request.id,
      request.name,
      this.props.acceptRequest
    );
  }

  rejectRequest(id) {
    const request = getById(this.props.myTutorials, id);

    this.RejectModal.getRef().showModal(
      request.id,
      request.name,
      this.props.rejectRequest
    );
  }

  render() {
    return (
      <Fragment>
        <Title
          title={myTutorialsMessages.TITLE}
          subtitle={myTutorialsMessages.SUBTITLE}
        />
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
    if (this.props.myTutorials == null || this.props.myTutorials.length === 0) {
      return <CustomAlert message={myTutorialsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <MyTutorialsTable
        data={this.props.myTutorials}
        show={this.detailAction}
        accept={this.acceptRequest}
        reject={this.rejectRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.myTutorialsReducer.loading,
  myTutorials: state.myTutorialsReducer.myTutorials
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
  )(MyTutorialsIndex)
);
