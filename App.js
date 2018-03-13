/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Provider,connect } from 'react-redux';
import store from './store';

import PropTypes from 'prop-types';

import {AppNavigation} from './app/Navigation/satck';
//import {AppNavigation} from './app/test';
import {Button, Text, View} from 'react-native';


import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers
} from 'react-navigation';






export default class App extends Component<Props> {



  render() {

    

    
    return (
      <Provider store={store}>
      <AppNavigation />
      </Provider>
    );
  }
}













console.disableYellowBox = true; // disable warning 




