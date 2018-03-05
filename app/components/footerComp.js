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
            <Icon name="apps" />
          </Button>
          <Button>
            <Icon name="camera" />
          </Button>
          <Button active>
            <Icon active name="navigate" />
          </Button>
          <Button>
            <Icon name="person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
