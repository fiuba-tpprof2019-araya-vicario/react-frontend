import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { upload, clearAlert } from './contactReducer';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ContactForm from './ContactForm';
import Title from '../../utils/Title';

export class ContactIndex extends React.Component {
  constructor() {
    super();
    this.uploadForm = this.uploadForm.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
  }

  uploadForm(form) {
    this.props.upload(form);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md={4} lg={4}></Col>
          <Col md={4} lg={4}>
            <Title title='Contacto' subtitle='Ponerse en contacto con la FIUBA'/>
            <ContactForm uploadForm={this.uploadForm}/>
          </Col>
          <Col md={4} lg={4}></Col>
        </Row>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  upload: (form) => {
    dispatch(upload(form));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(connect(null, mapDispatch)(ContactIndex));
