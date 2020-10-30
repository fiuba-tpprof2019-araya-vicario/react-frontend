import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Table from '../../utils/Table';
import FileIcon from '../../utils/forms/FileIcon';
import { getIconWithOverlay } from '../../utils/forms/StatusIcon';

export default class PublicProjectsTable extends React.Component {
  static propTypes = { data: PropTypes.array };

  getHeaders = () => ['Archivos', '', 'Detalle'];

  getPublicProjectDetail = (restOfProject) => {
    const {
      name,
      year,
      description,
      students,
      tutors,
      transactionId
    } = restOfProject;

    let transactionIcon = null;

    if (transactionId) {
      transactionIcon = getIconWithOverlay(
        'Este trabajo profesional esta confirmado por Ethereum',
        <a
          href={`https://rinkeby.etherscan.io/tx/${transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ alignSelf: 'flex-end' }}
        >
          <FontAwesomeIcon size="2x" color="#5cb85c" icon={faShieldAlt} />
        </a>
      );
    }

    return (
      <Fragment>
        <h5>
          <b>{year}</b>
        </h5>
        <h4 className="title">{name}</h4>
        <p>{description}</p>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <p>
              <b>Estudiantes: </b>
              {students}
            </p>
            <p>
              <b>Tutores: </b>
              {tutors}
            </p>
          </div>
          {transactionIcon}
        </div>
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
    return <Table headers={this.getHeaders()} data={this.getRows()} />;
  }
}
