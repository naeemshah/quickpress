import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ImageBackground,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {
  Content,
  View,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  Container,
} from 'native-base';

import { Styles } from '.././styles/main';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { connect } from 'react-redux';

@connect(store => {
  return {
    authenticated: store.storeData.authenticated,
  };
})
export class SidebarComp extends Component {
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
      <Container>
        <Content style={{ backgroundColor: '#f17d00' }}>
          <ImageBackground
            source={{
              uri:
                'https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png',
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ccc',
            }}
          >
            <Image
              square
              style={{ height: 200, width: 200 }}
              source={require('.././images/logo.png')}
            />
          </ImageBackground>

          <List>
            <ListItem style={Styles.sidebarItem}>
              <Icon name="tachometer" size={20} style={Styles.sidebarIcons} />
              <Text style={Styles.sidebarText}>Dashboard</Text>
            </ListItem>
            <ListItem style={Styles.sidebarItem}>
              <Icon2 name="layers" size={20} style={Styles.sidebarIcons} />
              <Text style={Styles.sidebarText}>Products</Text>
            </ListItem>
            <ListItem style={Styles.sidebarItem}>
              <Icon2 name="finance" size={20} style={Styles.sidebarIcons} />
              <Text style={Styles.sidebarText}>Orders</Text>
            </ListItem>

            <ListItem style={Styles.sidebarItem}>
              <Icon name="cog" size={20} style={Styles.sidebarIcons} />
              <Text style={Styles.sidebarText}>Setting</Text>
            </ListItem>

            <ListItem
              style={Styles.sidebarItem}
              onPress={this.logout.bind(this)}
            >
              <Icon2 name="logout" size={20} style={Styles.sidebarIcons} />
              <Text style={Styles.sidebarText}>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
