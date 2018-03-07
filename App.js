/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Provider,connect } from 'react-redux';
import store from './store';
import {HomeComp} from './app/components/homeComp'

console.disableYellowBox = true; // disable warning 

export default class App extends Component<Props> {



  render() {

    
    return (
        <Provider store={store}>
                <HomeComp />
            </Provider>
    );
  }
}

