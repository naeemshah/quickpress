import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Footer, FooterTab, Text, Button } from 'native-base';
import { connect } from 'react-redux';

import { Styles } from '.././styles/main';

import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

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
        <FooterTab style={Styles.primaryBgColor}>
          <Button vertical>
            <Icon name="barcode" size={20} style={Styles.headerIcons} />
            <Text style={Styles.primaryColor}>Products</Text>
          </Button>

          <Button>
            <Icon2
              name="finance"
              onPress={() => this.navigate()}
              size={20}
              style={Styles.headerIcons}
            />
          </Button>
          <Button>
            <Icon name="user" size={20} style={Styles.headerIcons} />
          </Button>

          <Button>
            <Icon name="cog" size={20} style={Styles.headerIcons} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
