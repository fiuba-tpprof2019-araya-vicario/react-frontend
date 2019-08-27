import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Row, Button, Glyphicon } from 'react-bootstrap';
import Itemized from '../../utils/styles/Itemized';
import CustomAlert from '../../utils/CustomAlert';
import FullRow from '../../utils/styles/FullRow';
import {
  getFullName,
  getOnlyField,
  formatterDate,
  getStudentFullName,
  getTutorFullName
} from '../../utils/services/functions';
import { myProjectMessages } from '../../utils/messages';

export default class ReviewIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    showUploadIdeaModal: PropTypes.func
  };

  getAutors() {
    const { Creator, Students } = this.props.project;
    const autors = [];

    if (Creator && Students) {
      autors.push(`Creador: ${getFullName(Creator)}`);
      Students.forEach((student) => {
        autors.push(`Participante: ${getStudentFullName(student)}`);
      });
    }

    return autors;
  }

  getTutors() {
    const { Tutor, Cotutors } = this.props.project;
    const tutors = [];

    if (Tutor && Cotutors) {
      tutors.push(`Tutor: ${getTutorFullName(Tutor)}`);
      Cotutors.forEach((tutor) => {
        tutors.push(`Cotutor: ${getTutorFullName(tutor)}`);
      });
    }

    return tutors;
  }

  render() {
    return (
      <Fragment>
        <Row>
          <br />
          <CustomAlert
            rowKey="infoNextStep"
            bsStyle="info"
            message={myProjectMessages.NEW_STEP_PROJECT_CREATED_INFO}
          />
          <br />
          <Row>
            <h3>Título: {this.props.project.name}</h3>
          </Row>
          <br />
          <FullRow>
            <Itemized title="Autores:" items={this.getAutors()} />
            <Itemized title="Tutores:" items={this.getTutors()} />
            <Itemized
              title="Fecha de creación:"
              items={[formatterDate(this.props.project.createdAt)]}
            />
            <Itemized
              title="Departamentos:"
              items={getOnlyField(this.props.project.departments, 'label')}
            />
          </FullRow>
          <br />
          <Row>
            <h4>Descripción:</h4>
            <p>{this.props.project.description}</p>
          </Row>
          <br />
          <Row className="pull-right">
            <Button
              bsStyle="danger"
              onClick={this.props.showUploadIdeaModal}
              bsSize="small"
            >
              <Glyphicon glyph="log-out">&nbsp;</Glyphicon>
              Abandonar idea
            </Button>
            &nbsp;
            <Button
              bsStyle="primary"
              onClick={this.props.showUploadIdeaModal}
              bsSize="small"
            >
              <i className="fa fa-pencil">&nbsp;</i>&nbsp;Editar idea
            </Button>
          </Row>
        </Row>
      </Fragment>
    );
  }
}
