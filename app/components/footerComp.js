import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Footer, FooterTab, Text, Icon, Button } from 'native-base';

export class FooterComp extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="barcode" style={{fontSize:32}} />
          </Button>
          <Button>
            <Icon name="graph" style={{fontSize:20}} /> 
          </Button>
          <Button active>
            <Icon active name="navigate" style={{fontSize:20}} />
          </Button>
          <Button>
            <Icon name="person" style={{fontSize:20}} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
