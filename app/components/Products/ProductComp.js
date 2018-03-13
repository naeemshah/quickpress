import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Footer, FooterTab, Text, Button,Content } from 'native-base';
import { connect } from 'react-redux';

@connect(store => {
  return {
    authenticated: store.storeData.authenticated,
  };
})
export class ProductComp extends Component<Props> {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Content>
      <Text>Hello</Text>
       
      </Content>
    );
  }
}
