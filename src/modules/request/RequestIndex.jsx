import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getFiles } from './requestReducer';
import { Row, Col } from 'react-bootstrap';
import Title from '../../utils/Title';
import { requestMessages } from '../../utils/messages';
import { withRouter } from 'react-router-dom';

export class RequestIndex extends React.Component {
  constructor() {
    super();

    this.abrirUploadFileModal = this.abrirUploadFileModal.bind(this);
  }

  componentDidMount() {
    this.props.getFiles();
  }

  abrirUploadFileModal() {
    this.UploadFileModal.wrappedInstance.abrirModal();
  }

  render() {
    return (
      <Fragment>
        <Title
          title={requestMessages.TITLE}
          subtitle={requestMessages.SUBTITLE}
        />
        
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getFiles: () => {
    dispatch(getFiles());
  }
});

export default withRouter(connect(null, mapDispatch)(RequestIndex));
