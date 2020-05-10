/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FullRow from './styles/FullRow';

export default class Accordion extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    expanded: PropTypes.bool,
    annexes: PropTypes.array
  };

  static defaultProps = { expanded: true, annexes: [] };

  render() {
    const { title, children, expanded, annexes } = this.props;

    return (
      <Panel defaultExpanded={expanded}>
        <Panel.Heading>
          <Panel.Title toggle>
            <FullRow>
              <h4>
                <FontAwesomeIcon icon={faChevronDown} />
                &nbsp;{title}
              </h4>
            </FullRow>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>{children}</Panel.Body>
          {annexes.map(
            (annex, index) =>
              !!annex && (
                <ListGroup key={index}>
                  <ListGroupItem>{annex}</ListGroupItem>
                </ListGroup>
              )
          )}
        </Panel.Collapse>
      </Panel>
    );
  }
}
