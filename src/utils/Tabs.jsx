import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tabs as BootstrapTabs, Row, Col } from 'react-bootstrap';
import history from '../redux/history';

export default class Tabs extends Component {
  static propTypes = {
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    match: PropTypes.object,
    children: PropTypes.node,
    animation: PropTypes.bool,
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    location: PropTypes.object
  };

  static defaultProps = {
    animation: false,
    id: 'tab-navigator'
  };

  handleSelect = (key) => {
    if (key) {
      history.push(`${this.props.match.url}${key}`);
    }
  };

  componentDidMount() {
    const { defaultActiveKey, match } = this.props;

    if (defaultActiveKey) {
      history.replace(`${match.url}${defaultActiveKey}`, this.props.match.url);
    }
  }

  activeTab = (hash) => {
    const { defaultActiveKey } = this.props;

    return hash || defaultActiveKey;
  };

  renderTabs = (children) => children;

  render() {
    const { children, defaultActiveKey, animation, id, location } = this.props;

    return (
      <Row key="tabs">
        <Col md={12}>
          <BootstrapTabs
            activeKey={this.activeTab(location.hash)}
            defaultActiveKey={defaultActiveKey}
            animation={animation}
            id={id}
            onSelect={this.handleSelect}
          >
            <br />
            {this.renderTabs(children)}
          </BootstrapTabs>
        </Col>
      </Row>
    );
  }
}
