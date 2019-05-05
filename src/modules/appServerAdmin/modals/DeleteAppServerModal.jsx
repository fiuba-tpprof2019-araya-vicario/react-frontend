import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import { deleteAppServer } from '../appServerReducer'

export class DeleteAppServerModal extends React.Component {

  constructor() {
    super()
    this.state = {
      show: false,
      appServerId: null,
      appServerName: null
    }
    this.abrirModal = this.abrirModal.bind(this)
    this.cerrarModal = this.cerrarModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  abrirModal(appServerId, appServerName) {
    this.setState({ show: true, appServerId: appServerId, appServerName: appServerName })
  }

  cerrarModal() {
    this.setState({ show: false, appServerId: null, appServerName: null })
  }

  onSubmit() {
    this.props.deleteAppServer(this.state.appServerId)
    this.cerrarModal()
  }


  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.cerrarModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Eliminar app server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'row'}>
            <Col md={12} lg={12}>
              ¿Estás seguro que deseás borrar el app server "{this.state.appServerName}"?
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
  deleteAppServer: (id) => {
    dispatch(deleteAppServer(id))
  }
})

export default connect(null, mapDispatch, null, { withRef: true })(DeleteAppServerModal)