import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Itemized from '../../utils/styles/Itemized';
import { getFullName } from '../../utils/services/funtions';

export default class ReviewIdea extends React.Component {
  constructor() {
    super();
  }

  getAutors(){
    const { creator, Students } = this.props.project;
    let autors = [];
    autors.push('Creador: ' + getFullName(creator));
    Students.forEach(student => {
      autors.push('Participante: ' + getFullName(student));
    });
    return autors;
  }

  getTutors(){
    const { tutor, Tutors } = this.props.project;
    let autors = [];
    autors.push('Tutor: ' + getFullName(tutor));
    Tutors.forEach(tutor => {
      autors.push('Cotutor: ' + getFullName(tutor));
    });
    return autors;
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
            <Col md={5} lg={5}>
              <Itemized title='Autores:' items={this.getAutors()}/>
            </Col>
            <Col md={5} lg={5}>
              <Itemized title='Tutores:'items={this.getTutors()}/>
            </Col>
            <Col md={2} lg={2}>
              <Button bsStyle="primary" 
                className="pull-right"
                onClick={this.props.showUploadIdeaModal} 
                bsSize="small">
                <i className="fa fa-pencil">&nbsp;</i>Editar idea
              </Button>  
            </Col>
          </Row>
          <br/>
          <Row>
            <h4>Descripción:</h4>
            <p>{this.props.project.description}</p>
          </Row>
        </Row>
      </Fragment>
    );
  }
}
