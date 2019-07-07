import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { upload, clearAlert } from './contactReducer';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ContactForm from './ContactForm';
import Title from '../../utils/Title';
import { contactMessages } from '../../utils/messages';

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
            <Title title={contactMessages.TITLE} subtitle={contactMessages.SUBTITLE}/>
            <ContactForm 
              uploadForm={this.uploadForm} 
              user={this.props.isAuthenticated && this.props.user}/>
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

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps, mapDispatch)(ContactIndex));
