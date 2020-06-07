import PropTypes from 'prop-types';
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FullRow from './styles/FullRow';
import './Accordion.css';

export default class Accordion extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    expanded: PropTypes.bool,
    annexes: PropTypes.array
  };

  static defaultProps = { expanded: true, annexes: [] };

  constructor(props) {
    super();
    this.state = { expanded: props.expanded };
  }

  toggleExpanded = () => {
    const previousExpanded = this.state.expanded;

    this.setState({ expanded: !previousExpanded });
  };

  render() {
    const { title, children, expanded, annexes } = this.props;
    const appliedClass = this.state.expanded ? 'expanded' : 'closed';

    return (
      <Panel defaultExpanded={expanded}>
        <Panel.Heading>
          <Panel.Title toggle onClick={this.toggleExpanded}>
            <FullRow>
              <h4 data-test-id="title">
                <FontAwesomeIcon
                  className={appliedClass}
                  icon={faChevronDown}
                />{' '}
                {title}
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
