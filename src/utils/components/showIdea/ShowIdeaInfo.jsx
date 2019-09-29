import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  formatterDate,
  getFullNameWithEmail,
  getOnlyField
} from '../../../utils/services/functions';
import FullRow from '../../../utils/styles/FullRow';
import Itemized from '../../../utils/styles/Itemized';
import getStatusIcon from '../../forms/StatusIcon';

export default class ShowIdeaInfo extends React.Component {
  static propTypes = {
    project: PropTypes.object
  };

  getAutors() {
    const { Creator, Students, State } = this.props.project;
    const autors = [];

    if (Creator && Students) {
      autors.push(`Creador: ${getFullNameWithEmail(Creator)}`);
      Students.forEach((student) => {
        const fullName = getFullNameWithEmail(student);

        autors.push(
          <span key={student.id}>
            Participante: {fullName}
            &nbsp;
            {State.id <= 2 &&
              getStatusIcon(
                'estudiante',
                student.StudentRequests[0].status,
                'solicitud'
              )}
            {State.id === 2 &&
              student.StudentRequests[0].status !== 'pending' &&
              getStatusIcon(
                'estudiante',
                student.StudentRequests[0].accepted_proposal,
                'propuesta'
              )}
          </span>
        );
      });
    }

    return autors;
  }

  getTutors() {
    const { Tutor, Cotutors, State } = this.props.project;

    const tutors = [];
    let fullName;

    if (Tutor && Cotutors) {
      fullName = getFullNameWithEmail(Tutor);

      tutors.push(
        <span key={Tutor.id}>
          Tutor: {fullName}
          &nbsp;
          {State.id <= 2 &&
            getStatusIcon('tutor', Tutor.TutorRequests[0].status, 'solicitud')}
          {State.id === 2 &&
            Tutor.TutorRequests[0].status !== 'pending' &&
            getStatusIcon(
              'tutor',
              Tutor.TutorRequests[0].accepted_proposal,
              'propuesta'
            )}
        </span>
      );
      Cotutors.forEach((cotutor) => {
        fullName = getFullNameWithEmail(cotutor);
        tutors.push(
          <span key={cotutor.id}>
            Cotutor: {fullName}
            {State.id <= 2 &&
              getStatusIcon(
                `cotutor ${fullName}`,
                cotutor.TutorRequests[0].status,
                'solicitud'
              )}
            {State.id <= 2 &&
              cotutor.TutorRequests[0].status !== 'pending' &&
              getStatusIcon(
                `cotutor ${fullName}`,
                cotutor.TutorRequests[0].accepted_proposal,
                'propuesta'
              )}
          </span>
        );
      });
    }

    return tutors;
  }

  render() {
    const { project } = this.props;

    return (
      <FullRow>
        <Itemized title="Autores:" items={this.getAutors()} />
        <Itemized title="Tutores:" items={this.getTutors()} />
        <Fragment>
          <Itemized
            title="Tipo de proyecto:"
            items={project.Type && [project.Type.name]}
          />
          <Itemized
            title="Carreras:"
            items={
              project.ProjectCareers &&
              getOnlyField(
                project.ProjectCareers,
                (projectCareer) => projectCareer.Career.name
              )
            }
          />
        </Fragment>
        <Fragment>
          <Itemized
            title="Fecha de creación:"
            items={[formatterDate(project.createdAt)]}
          />
          <Itemized
            title="Última modificación:"
            items={[formatterDate(project.updatedAt)]}
          />
        </Fragment>
      </FullRow>
    );
  }
}
