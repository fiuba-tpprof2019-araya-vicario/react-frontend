import React from 'react';
import 'react-vis/dist/style.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { Label, Row, Col, Alert } from 'react-bootstrap';

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis';

export class RequestsGraph extends React.Component {
  constructor() {
    super();
    this.state = { crosshairValues: [] };

    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
  }

  _onMouseLeave() {
    this.setState({ crosshairValues: [] });
  }

  _onNearestX(value) {
    this.setState({ crosshairValues: [{ x: value.x, y: value.y }] });
  }

  render() {
    if(this.props.data == null) {
      return ( <Row key={'alert'}> 
        <Col lg={12}>
          <Alert bsStyle={'danger'}><p>{'El app server especificado no se encuentra accesible en este momento'}</p></Alert>
        </Col>
      </Row>);
    } else {
      return ( 
        <FlexibleWidthXYPlot
          onMouseLeave={this._onMouseLeave}
          xType="time"
          height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="Hora" position="start" />
          <YAxis title="Requests" />
          <LineSeries
            onNearestX={this._onNearestX}
            className="first-series"
            data={this.props.data} />
          <Crosshair values={this.state.crosshairValues}>
            <div >
              {this.state.crosshairValues.length > 0 && 
                <h4>
                  <Label>{moment(this.state.crosshairValues[0].x).format('HH:mm')+'hs'} - {this.state.crosshairValues[0].y} requests 
                  </Label>
                </h4>
              }
            </div>
          </Crosshair >
        </FlexibleWidthXYPlot >
      );
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.appServerReducer.activeMetricsData
});


export default connect(mapStateToProps, null)(RequestsGraph);