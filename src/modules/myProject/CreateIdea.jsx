import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import history from '../../redux/history';
import { myProjectMessages } from '../../utils/messages';
import BorderScreen from '../../utils/styles/BorderScreen';

export default class CreateIdea extends React.Component {
  static propTypes = {
    showUploadIdeaModal: PropTypes.func
  };

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
                  className="onlyIcon"
                  onClick={this.props.showUploadIdeaModal}
                >
                  <i className="fa fa-plus-circle inmenseIcon" />
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
                  className="onlyIcon"
                  onClick={() => history.push('/requirements')}
                >
                  <i className="fa fa-clipboard inmenseIcon" />
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
      </Fragment>
    );
  }
}
