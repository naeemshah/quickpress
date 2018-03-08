import React, { Component } from 'react';
import { RefreshControl,Keyboard } from 'react-native';
import { Spinner,Header, Body, Left, Right, Title, Icon, Button,Item,Input,Text } from 'native-base';

export class HeaderComp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {search:false}
  }


  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }


  _keyboardDidShow () {
   // alert('Keyboard Shown');
  }

  _keyboardDidHide () {
   // alert('Keyboard Hidden');
  }

  


  render() {
    let left = this.props.left && !this.state.search ? (
      <Left>
        <Button transparent onPress={()=>this.props.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
    ) : (
      null
    );

    let right = (this.props.right && !this.state.search) ? (
      <Right>
        <Button transparent onPress={() => this.setState({search: !this.state.search  })}>
          <Icon name="search" />
         
        </Button>
      </Right>
    ) : (
      null
    );

    let body = (!this.state.search) ? (<Body >
      <Title>{this.props.title}</Title>
    </Body>) : null;


   let searchBox = (this.state.search) ? (<Item >
    <Icon name="ios-search" onPress={() => this.setState({search: !this.state.search  })} />
    <Input placeholder="Search" />
    <Spinner color="green" />
    
  </Item>) : null;
    return (
      <Header searchBar={true} >
       {searchBox}
       {left}
        {body}
        {right}
        
      </Header>
    );
  }
}
