import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  formatterDate,
  getListBySingleField
} from '../../../utils/services/functions';
import FullRow from '../../../utils/styles/FullRow';
import Itemized from '../../../utils/styles/Itemized';
import { getStatusIcon } from '../../forms/StatusIcon';

export default class ShowGeneralInformation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    showUsersStatus: PropTypes.bool
  };

  getFullNameWithEmail = (user) =>
    user ? `${user.name} ${user.surname} (${user.email})` : '';

  getAuthors = () => {
    const { showUsersStatus } = this.props;
    const { Creator, Students, State } = this.props.project;
    const authors = [];

    if (Creator && Students) {
      authors.push(`Creador: ${this.getFullNameWithEmail(Creator)}`);
      Students.forEach((student) => {
        const fullName = this.getFullNameWithEmail(student);

        authors.push(
          <span key={student.id}>
            Participante: {fullName}{' '}
            {showUsersStatus &&
              State.id <= 2 &&
              getStatusIcon(
                'estudiante',
                student.StudentRequests[0].status,
                'solicitud'
              )}
            {showUsersStatus &&
              State.id === 2 &&
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

    return authors;
  };

  getTutors = () => {
    const { showUsersStatus } = this.props;
    const { Tutor, Cotutors, State } = this.props.project;

    const tutors = [];
    let fullName;

    if (Tutor && Cotutors) {
      fullName = this.getFullNameWithEmail(Tutor);

      tutors.push(
        <span key={Tutor.id}>
          Tutor: {fullName}{' '}
          {showUsersStatus &&
            State.id <= 2 &&
            getStatusIcon('tutor', Tutor.TutorRequests[0].status, 'solicitud')}
          {showUsersStatus &&
            State.id === 2 &&
            Tutor.TutorRequests[0].status !== 'pending' &&
            getStatusIcon(
              'tutor',
              Tutor.TutorRequests[0].accepted_proposal,
              'propuesta'
            )}
        </span>
      );
      Cotutors.forEach((cotutor) => {
        fullName = this.getFullNameWithEmail(cotutor);
        tutors.push(
          <span key={cotutor.id}>
            Cotutor: {fullName}
            {showUsersStatus &&
              State.id <= 2 &&
              getStatusIcon(
                `cotutor ${fullName}`,
                cotutor.TutorRequests[0].status,
                'solicitud'
              )}
            {showUsersStatus &&
              State.id <= 2 &&
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
  };

  render() {
    const { project } = this.props;

    return (
      <FullRow>
        <Itemized title="Autores:" items={this.getAuthors()} />
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
              getListBySingleField(
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
