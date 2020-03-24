import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Row } from 'react-bootstrap';
import Center from 'react-center';

export default class FileIcon extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.object
  };

  static defaultProps = { icon: faFileAlt };

  render() {
    const { icon, name, url } = this.props;

    return (
      <Fragment>
        <Row>
          <Center>
            <a className="onlyIcon hugeIcon" href={url} target="_blank">
              <FontAwesomeIcon icon={icon} />
            </a>
          </Center>
        </Row>
        <Row>
          <Center>{name}</Center>
        </Row>
      </Fragment>
    );
  }
}
