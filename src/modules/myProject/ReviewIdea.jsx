import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Center from 'react-center';
import { myProjectMessages } from '../../utils/messages';

export default class ReviewIdea extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <Row>
          <br />
          <Row>
            <Col md={6} lg={6} />
            <Col md={6} lg={6} />
            <Button bsStyle="primary" 
              className="pull-right"
              onClick={this.props.showUploadIdeaModal} 
              bsSize="small">
              <i className="fa fa-pencil">&nbsp;</i>Editar idea
            </Button>
          </Row>
          <Row />
        </Row>
      </Fragment>
    );
  }
}
