import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getInitialData,
  acceptRequest,
  rejectRequest
} from './commissionsReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import CommissionsTable from './CommissionsTable';
import CustomAlert from '../../utils/CustomAlert';
import { getById } from '../../utils/services/functions';
import history from '../../redux/history';
import AcceptRequestModal from './modals/AcceptRequestModal';
import RejectRequestModal from './modals/RejectRequestModal';

export class CommissionsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    acceptRequest: PropTypes.func,
    rejectRequest: PropTypes.func,
    projects: PropTypes.array
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
    history.push(`/commissions/${id}`);
  }

  acceptRequest(id) {
    const request = getById(this.props.projects, id);

    this.AcceptModal.getRef().showModal(
      request.requestId,
      request.id,
      request.name,
      this.props.acceptRequest
    );
  }

  rejectRequest(id) {
    const request = getById(this.props.projects, id);

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
          title={commissionsMessages.TITLE}
          subtitle={commissionsMessages.SUBTITLE}
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
    if (this.props.projects == null || this.props.projects.length === 0) {
      return <CustomAlert message={commissionsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <CommissionsTable
        data={this.props.projects}
        show={this.detailAction}
        accept={this.acceptRequest}
        reject={this.rejectRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.commissionsReducer.loading,
  projects: state.commissionsReducer.projects
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
  )(CommissionsIndex)
);
