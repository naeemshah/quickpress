import React, { Component } from 'react';
import { AppRegistry, Image,ImageBackground, StatusBar,AsyncStorage } from "react-native";
import {
  Content,
  View,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Container,

} from 'native-base';

import { connect } from 'react-redux';


@connect(store => {
  return {
    authenticated: store.storeData.authenticated
  };
})

export  class SidebarComp extends Component {
  logout(){
    AsyncStorage.removeItem('StoreKeys',).then(()=>{
      this.props.dispatch({
        type: 'SET_STORE_KEYS',
        payload: { storeUrl: "", key:"", secret: "", auth:false },
      });
    })
  }
  render() {
    return (
      <Container>
      <Content style={{backgroundColor:"white"}}>
        <ImageBackground
          source={{
            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
          }}
          style={{
            height: 120,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Image
            square
            style={{ height: 80, width: 70 }}
            source={{
              uri: "https://nativebase.io/assets/img/front-page-icon.png"
            }}
          />
        </ImageBackground>


         <List>
            <ListItem button>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem button>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem button onPress={this.logout.bind(this)}>
              <Text>Logout</Text>
            </ListItem>
          </List>
        
      </Content>
    </Container>
    );
  }
}

