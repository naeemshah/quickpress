import React, { Component } from 'react';

import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Text, View } from 'react-native';

import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

@connect(store => {
  return {
    authenticated: store.storeData,
  };
})
export class MyScene extends React.Component {
  static navigationOptions = {
    title: 'Screen1',
    gesturesEnabled: false,
    headerLeft: null,
    header: null,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'Home2',
      params: { name: 'Shubhnik' },
    });
    this.props.navigation.dispatch(navigateToScreen2);
  }

  render() {
    return (
      <View>
        <Text>Current Scene: {JSON.stringify(this.props)}</Text>
        <Text>Current Scene: {this.props.index}</Text>
        <Button
          onPress={this._onForward}
          title="Tap me to load the next scene"
        />
      </View>
    );
  }
}

export class MyScene2 extends React.Component {
  render() {
    return (
      <View>
        <Text>cxzcxzc</Text>
      </View>
    );
  }
}

const App2 = StackNavigator({
  Home: { screen: MyScene, title: 'asdsad' },
  Home2: { screen: MyScene2 },
});

@connect(store => {
  return {
    authenticated: store.storeData,
  };
})
export class AppNavigation extends Component {
  render() {
    //  const {dispatch } = this.props;
    return <App2 />;
  }
}
