import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { CustomTable } from '../../utils/CustomTable';
import FileIcon from '../../utils/forms/FileIcon';

export default class PublicProjectsTable extends React.Component {
  static propTypes = { data: PropTypes.array };

  getHeaders = () => ['Archivos', '', 'Detalle'];

  getPublicProjectDetail = (restOfProject) => {
    const { name, year, description, students, tutors } = restOfProject;

    return (
      <Fragment>
        <h5>
          <b>{year}</b>
        </h5>
        <h4 className="title">{name}</h4>
        <p>{description}</p>
        <p>
          <b>Estudiantes: </b>
          {students}
        </p>
        <p>
          <b>Tutores: </b>
          {tutors}
        </p>
      </Fragment>
    );
  };

  getRows = () =>
    this.props.data.map((project) => {
      const {
        presentationURL,
        presentationName,
        presentationVisible,
        documentationURL,
        documentationName,
        documentationVisible,
        ...restOfProject
      } = project;

      const publicProject = { id: restOfProject.id };

      publicProject.presentation = presentationVisible ? (
        <FileIcon url={presentationURL} name="Presentación" />
      ) : null;

      publicProject.documentation = documentationVisible ? (
        <FileIcon url={documentationURL} name="Documentación" />
      ) : null;

      publicProject.detail = this.getPublicProjectDetail(restOfProject);

      return publicProject;
    });

  render() {
    return <CustomTable headers={this.getHeaders()} data={this.getRows()} />;
  }
}
