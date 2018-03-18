import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Modal, TouchableHighlight, View } from 'react-native';
import {
  Footer,
  FooterTab,
  Text,
  Button,
  Content,
  Grid,
  Row,
  Col,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  Form,
  Item,
  Input,
  Container,
  Label,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import ChartView from 'react-native-highcharts';

@connect(store => {
  return {
    currentProduct: store.product.currentProduct,
  };
})
export class DashboardComp extends Component<Props> {
  static navigationOptions = {
    title: 'DashBoard',
    gesturesEnabled: false,
    headerRight: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    var Highcharts = 'Highcharts';
    var conf = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function() {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function() {
              var x = new Date().getTime(), // current time
                y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },
      title: {
        text: 'Live random data',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
      },
      tooltip: {
        formatter: function() {
          return (
            '<b>' +
            this.series.name +
            '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +
            '<br/>' +
            Highcharts.numberFormat(this.y, 2)
          );
        },
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      series: [
        {
          name: 'Random data',
          data: (function() {
            // generate an array of random data
            var data = [],
              time = new Date().getTime(),
              i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random(),
              });
            }
            return data;
          })(),
        },
      ],
    };

    const options = {
      global: {
        useUTC: false,
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.',
      },
    };

    return (
      <Container>
        <Content>
          <ChartView style={{ height: 300 }} config={conf} options={options} />
        </Content>
      </Container>
    );
  }
}
