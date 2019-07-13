import React, { Fragment } from 'react';
import { Row } from 'react-bootstrap';
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
            <Center>
              <p>{myProjectMessages.NEW_IDEA_DESCRIPTION}</p>
            </Center>
          </Row>
        </Row>
      </Fragment>
    );
  }
}
