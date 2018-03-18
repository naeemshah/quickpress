import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Footer, FooterTab, Text, Button } from 'native-base';
import { connect } from 'react-redux';

import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

@connect(store => {
  return {
    authenticated: store.storeData.authenticated,
  };
})
export class FooterComp extends Component<Props> {
  constructor(props) {
    super(props);
  }

  navigate() {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'Dashboard',
      params: { name: 'Shubhnik' },
    });
    this.props.navigation.dispatch(navigateToScreen2);
  }

  logout() {
    AsyncStorage.removeItem('StoreKeys').then(() => {
      this.props.dispatch({
        type: 'SET_STORE_KEYS',
        payload: { storeUrl: '', key: '', secret: '', auth: false },
      });
    });
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="barcode" style={{ color: 'green' }} />
            <Text>Products</Text>
          </Button>

          <Button>
            <Icon
              name="money"
              onPress={() => this.navigate()}
              style={{ fontSize: 20 }}
            />
          </Button>
          <Button>
            <Icon name="person" style={{ fontSize: 20 }} />
          </Button>

          <Button onPress={() => this.logout()}>
            <Icon name="sign-out" style={{ fontSize: 20 }} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
