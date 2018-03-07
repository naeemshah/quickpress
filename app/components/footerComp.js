import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Footer, FooterTab, Text, Button } from 'native-base';

export class FooterComp extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="barcode"    style={{color:"green"}} /> 
            <Text>Products</Text>
          </Button>
          
          <Button >
            <Icon  name="money" style={{fontSize:20}} />
          </Button>
          <Button>
            <Icon name="person" style={{fontSize:20}} />
          </Button>

          <Button>
            <Icon name="log-out" style={{fontSize:20}} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
