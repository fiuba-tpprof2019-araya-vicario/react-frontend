import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { uploadIdea, clearAlert, getInitialData} from './myProjectReducer';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Center from 'react-center';
import Title from '../../utils/Title';
import UploadIdeaModal from './modals/UploadIdeaModal';
import { myProjectMessages } from '../../utils/messages';
import Stepper from 'react-stepper-horizontal';

export class MyProjectIndex extends React.Component {
  constructor() {
    super();
    this.uploadIdea = this.uploadIdea.bind(this);
    this.showUploadIdeaModal = this.showUploadIdeaModal.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData();
  }

  uploadIdea(form) {
    this.props.uploadIdea(form);
  }

  showUploadIdeaModal() {
    this.UploadIdeaModal.showModal();
  }

  render() {
    const steps = [
      { title: 'Crear idea' },
      { title: 'Idea en revisión' },
      { title: 'Pendiente de propuesta' },
      { title: 'Propuesta en revisión' },
      { title: 'Pendiente de presentación' },
      { title: 'Pendiente de publicación' },
      { title: 'Propuesta publicada' }
    ];
    return (
      <Fragment>
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={10} lg={10}>
            <Row>
              <Title title={myProjectMessages.TITLE} subtitle={myProjectMessages.SUBTITLE}/>
              <div className='step-progress'>
                <Stepper steps={steps} activeStep={ 0 } />
              </div>
            </Row>
            <Row>
              <br></br>
              <br></br>
              <br></br>
              <Row>
                <Center>
                  <button className="onlyIcon" onClick={this.showUploadIdeaModal}>
                    <i className="fa fa-plus-circle inmenseIcon"></i>
                  </button>
                </Center>
              </Row>
              <Row>
                <Center>
                  <p>{myProjectMessages.NEW_IDEA_DESCRIPTION}</p>
                </Center>
              </Row>
            </Row>
          </Col>
          <Col md={1} lg={1}></Col>
        </Row>
        <UploadIdeaModal 
          uploadIdea={this.uploadIdea}
          coautors={this.props.coautors}
          tutors={this.props.tutors}
          ref={(modal) => { this.UploadIdeaModal = modal;}}
          user={this.props.isAuthenticated && this.props.user}
        />
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getInitialData: () => {
    dispatch(getInitialData());
  },
  uploadIdea: (form) => {
    dispatch(uploadIdea(form));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.myProjectReducer.loading,
    coautors: state.myProjectReducer.coautors,
    tutors: state.myProjectReducer.tutors,
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps, mapDispatch)(MyProjectIndex));
