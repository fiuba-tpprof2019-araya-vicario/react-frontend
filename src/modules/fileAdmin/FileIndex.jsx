import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getFiles } from './fileReducer'
import { Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FileTable from './FileTable'
import UploadFileModal from './modals/UploadFileModal'

export class FileIndex extends React.Component {
  constructor() {
    super()

    this.abrirUploadFileModal = this.abrirUploadFileModal.bind(this)
  }

  componentDidMount() {
    this.props.getFiles()
  }

  abrirUploadFileModal() {
    this.UploadFileModal.wrappedInstance.abrirModal()
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <h3>Administración de archivos</h3>
            <Button bsStyle="success" className="pull-right" bsSize="xsmall" onClick={this.abrirUploadFileModal}>
              <i className="fa fa-plus" aria-hidden="true">&nbsp;</i> Subir archivo
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FileTable />
          </Col>
        </Row>
        <UploadFileModal ref={(modal) => { this.UploadFileModal = modal }} />
      </Fragment>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getFiles: () => {
    dispatch(getFiles())
  }
})

export default withRouter(connect(null, mapDispatch)(FileIndex))
