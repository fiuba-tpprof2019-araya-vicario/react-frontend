import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import { myProjectMessages } from '../../utils/messages';

export default class CreateIdea extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <Row>
          <br />
          <br />
          <br />
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
          <Row>
            <Col md={3} lg={3}/>
            <Col md={6} lg={6}>
              <Center>
                <p>{myProjectMessages.NEW_IDEA_DESCRIPTION}</p>
              </Center>
            </Col>
            <Col md={3} lg={3}/>
          </Row>
        </Row>
      </Fragment>
    );
  }
}
