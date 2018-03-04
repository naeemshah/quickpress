import React, { Component } from 'react';
import  { RefreshControl } from 'react-native';
import {Header,Body,Left,Right,Title,Icon,Button } from 'native-base';



export  class HeaderComp extends Component<Props> {

  constructor(props) {
    super(props);
  
  }

  render() {

    let left = (this.props.left) ? ( <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>) : "";

    let right = (this.props.right) ?  (<Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>) : "";
 return (
          <Header>
         
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
         
        </Header>
    );
  }
}


