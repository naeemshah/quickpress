import React, { Component } from 'react';
import { RefreshControl, View } from 'react-native';
import { Footer, FooterTab, Text, Icon, Button, Spinner } from 'native-base';

export class BlockLoader extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ width: 50, height: 50 }} />
        <View style={{ width: 73, marginLeft: 180 }}>
          <Spinner color="green" />
          <Text>Loading...</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>
    );
  }
}
