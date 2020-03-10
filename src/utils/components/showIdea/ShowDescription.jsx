import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Field from '../../forms/Field';

export default class ShowDescription extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    saveDescription: PropTypes.func
  };

  state = {
    isEditingDescription: false,
    description: ''
  };

  render() {
    const { project, saveDescription } = this.props;

    if (!saveDescription) {
      return (
        <p className="panelText">
          <i display-if={project.Presentation.description}>
            {project.Presentation.description}
          </i>
          <i display-if={!project.Presentation.description}>
            No se ha agregado ninguna descripción
          </i>
        </p>
      );
    }

    return (
      <Fragment>
        <p
          display-if={!this.state.isEditingDescription}
          className="panelText pointer"
          onClick={() => {
            this.setState({
              isEditingDescription: true,
              description: project.Presentation.description || ''
            });
          }}
        >
          <i display-if={project.Presentation.description}>
            {project.Presentation.description}
          </i>
          <i display-if={!project.Presentation.description}>
            Agregar descripción
          </i>{' '}
          <i className="fa fa-pencil" />
        </p>
        <Fragment display-if={this.state.isEditingDescription}>
          <Field
            className="panelText"
            controlId="descriptionInput"
            inputComponent={
              <textarea
                value={this.state.description}
                onChange={({ target }) =>
                  this.setState({
                    description: target.value
                  })
                }
                className="form-control"
                style={{ resize: 'vertical' }}
                rows="3"
                placeholder="Ingrese una descripción..."
              />
            }
          />
          <div className="actionsColumn">
            <span
              className="pointer"
              onClick={() => {
                this.setState({ isEditingDescription: false });
              }}
            >
              <i className="fa fa-remove" />
            </span>
            <span
              className="pointer"
              onClick={() => {
                this.setState({ isEditingDescription: false });
                saveDescription(
                  project.id,
                  project.Presentation.id,
                  this.state.description
                );
              }}
            >
              <i className="fa fa-check" />
            </span>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}
