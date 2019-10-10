import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import Center from 'react-center';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faListAlt } from '@fortawesome/free-solid-svg-icons';
import history from '../../redux/history';
import CustomAlert from '../../utils/CustomAlert';
import { myProjectMessages, requestMessages } from '../../utils/messages';
import { getById } from '../../utils/services/functions';
import BorderScreen from '../../utils/styles/BorderScreen';
import AcceptRequestModal from './modals/AcceptRequestModal';
import RejectRequestModal from './modals/RejectRequestModal';
import RequestTable from './RequestTable';

export default class CreateIdea extends React.Component {
  static propTypes = {
    showUploadIdeaModal: PropTypes.func,
    acceptRequest: PropTypes.func,
    rejectRequest: PropTypes.func,
    requests: PropTypes.array
  };

  constructor() {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  acceptRequest(id) {
    const request = getById(this.props.requests, id);

    this.AcceptModal.getRef().showModal(
      request.id,
      request.projectId,
      request.name,
      this.props.acceptRequest
    );
  }

  rejectRequest(id) {
    const request = getById(this.props.requests, id);

    this.RejectModal.getRef().showModal(
      request.id,
      request.name,
      this.props.rejectRequest
    );
  }

  renderTable(requests, acceptRequest, rejectRequest) {
    if (requests == null || requests.length === 0) {
      return (
        <CustomAlert size={10} message={requestMessages.NO_RESULTS_MESSAGE} />
      );
    }

    return (
      <RequestTable
        data={requests}
        accept={acceptRequest}
        reject={rejectRequest}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <Row>
          <br />
          <br />
          <br />
          <Col md={6} lg={6}>
            <Row>
              <Center>
                <button
                  className="onlyIcon inmenseIcon"
                  onClick={this.props.showUploadIdeaModal}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </Center>
            </Row>
            <BorderScreen>
              <Center>
                <p>{myProjectMessages.NEW_IDEA_DESCRIPTION}</p>
              </Center>
            </BorderScreen>
          </Col>
          <Col md={6} lg={6}>
            <Row>
              <Center>
                <button
                  className="onlyIcon inmenseIcon"
                  onClick={() => history.push('/requirements')}
                >
                  <FontAwesomeIcon icon={faListAlt} />
                </button>
              </Center>
            </Row>
            <BorderScreen>
              <Center>
                <p>{myProjectMessages.GO_TO_REQUERIMENT_DESCRIPTION}</p>
              </Center>
            </BorderScreen>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Center>
          <h3>
            <i className="fa fa-inbox" aria-hidden="true">
              &nbsp;
            </i>
            Mis solicitudes para participar en proyectos creados por otros
            estudiantes
          </h3>
        </Center>
        {this.renderTable(
          this.props.requests,
          this.acceptRequest,
          this.rejectRequest
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
}
