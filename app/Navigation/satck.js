import React, { Component } from 'react';

import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Text, View } from 'react-native';

import { HomeComp } from '.././components/homeComp';
import { ProductComp } from '.././components/Products/ProductComp';
import { ModalComp } from '.././components/modal';
import { DashboardComp } from '.././components/dashboard/dashbaord';
import { BarcodeApp } from '.././components/barcodeReader';

import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

const App2 = StackNavigator({
  Home: { screen: HomeComp },
  ProductDetail: { screen: ProductComp, mode: 'modal' },
  Modal: { screen: ModalComp },
  Dashboard: { screen: DashboardComp },
  BarCode: { screen: BarcodeApp },
});

@connect(store => {
  return {
    authenticated: store.storeData,
  };
})
export class AppNavigation extends Component {
  render() {
    const { dispatch } = this.props;
    return <App2 />;
  }
}
