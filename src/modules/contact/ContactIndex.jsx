import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { upload, clearAlert } from './contactReducer';
import ContactForm from './ContactForm';
import Title from '../../utils/Title';
import { contactMessages } from '../../utils/messages';

export class ContactIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    upload: PropTypes.func,
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

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
          <Col md={4} lg={4} />
          <Col md={4} lg={4}>
            <Title
              title={contactMessages.TITLE}
              subtitle={contactMessages.SUBTITLE}
            />
            <ContactForm
              loading={this.props.loading}
              uploadForm={this.uploadForm}
              user={this.props.isAuthenticated && this.props.user}
            />
          </Col>
          <Col md={4} lg={4} />
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

const mapStateToProps = (state) => ({
  loading: state.contactReducer.loading,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(ContactIndex)
);
