import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Itemized from '../../utils/styles/Itemized';
import { getFullName, formatterDate } from '../../utils/services/funtions';

export default class ReviewIdea extends React.Component {
  constructor() {
    super();
  }

  getAutors(){
    const { Creator, Students } = this.props.project;
    let autors = [];
    if (Creator && Students) {
      autors.push('Creador: ' + getFullName(Creator));
      Students.forEach(student => {
        autors.push('Participante: ' + getFullName(student));
      });
    }
    return autors;
  }

  getTutors(){
    const { Tutor, Cotutors } = this.props.project;
    let tutors = [];
    if (Tutor && Cotutors) {
      tutors.push('Tutor: ' + getFullName(Tutor));
      Cotutors.forEach(tutor => {
        tutors.push('Cotutor: ' + getFullName(tutor));
      });
    } 
    return tutors;
  }

  render() {
    return (
      <Fragment>
        <Row>
          <br/>
          <Row>
            <h3>Título: {this.props.project.name}</h3>
          </Row>
          <br/>
          <Row>
            <Col md={4} lg={4}>
              <Itemized title='Autores:' items={this.getAutors()}/>
            </Col>
            <Col md={4} lg={4}>
              <Itemized title='Tutores:'items={this.getTutors()}/>
            </Col>
            <Col md={4} lg={4}>
              <h4>Fecha de creación:</h4>
              <p>{formatterDate(this.props.project.createdAt)}</p>
            </Col>
          </Row>
          <br/>
          <Row>
            <h4>Descripción:</h4>
            <p>{this.props.project.description}</p>
          </Row>
          <br/>
          <Row>
            <Button bsStyle="primary" 
              className="pull-right"
              onClick={this.props.showUploadIdeaModal} 
              bsSize="small">
              <i className="fa fa-pencil">&nbsp;</i>Editar idea
            </Button>  
          </Row>
        </Row>
      </Fragment>
    );
  }
}
