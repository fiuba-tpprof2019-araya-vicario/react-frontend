import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tabs, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import history from '../redux/history';

class CustomTabs extends Component {
  static propTypes = {
    defaultActiveKey: PropTypes.number,
    match: PropTypes.object,
    keys: PropTypes.array,
    children: PropTypes.node,
    animation: PropTypes.string,
    id: PropTypes.number,
    location: PropTypes.string
  };

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  handleSelect(key) {
    history.push(`${this.props.match.url}/${key}`);
  }

  componentDidMount() {
    const { defaultActiveKey } = this.props;

    if (defaultActiveKey) {
      history.replace(
        `${this.props.match.url}/${defaultActiveKey}`,
        this.props.match.url
      );
    }
  }

  activeTab(url) {
    const { keys, defaultActiveKey } = this.props;
    const splittedUrl = url.split('/');
    const actualKey = splittedUrl.slice(-1)[0].toLowerCase();

    return _.includes(keys, actualKey) ? actualKey : defaultActiveKey;
  }

  renderTabs() {}

  render() {
    const { children, defaultActiveKey, animation, id, location } = this.props;

    return (
      <Row key="tabs">
        <Col md={12}>
          <Tabs
            activeKey={this.activeTab(location.pathname)}
            defaultActiveKey={defaultActiveKey}
            animation={animation}
            id={id}
            onSelect={this.handleSelect}
          >
            <br />
            {this.renderTabs(children)}
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default withRouter(CustomTabs);
