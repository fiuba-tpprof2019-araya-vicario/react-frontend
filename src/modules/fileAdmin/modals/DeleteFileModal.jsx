import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import { deleteFile } from '../fileReducer'

export class DeleteFileModal extends React.Component {

  constructor() {
    super()
    this.state = {
      show: false,
      fileId: null,
      fileName: null
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.cerrarModal = this.cerrarModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  abrirModal(fileId, fileName) {
    this.setState({ show: true, fileId: fileId, fileName: fileName })
  }

  cerrarModal() {
    this.setState({ show: false, fileId: null, fileName: null })
  }

  onSubmit() {
    this.props.deleteFile(this.state.fileId)
    this.cerrarModal()
  }


  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Eliminar archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'row'}>
            <Col md={12} lg={12}>
              ¿Estás seguro que deseás borrar el archivo "{this.state.fileName}"?
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.cerrarModal}>Cancelar</Button>&nbsp;
          <Button key={'deleteButton'} bsSize={'small'} bsStyle={'danger'} onClick={this.onSubmit}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatch = (dispatch) => ({
  deleteFile: (id) => {
    dispatch(deleteFile(id))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(DeleteFileModal)