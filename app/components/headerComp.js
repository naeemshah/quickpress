import React, { Component } from 'react';
import { RefreshControl, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Spinner,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import { Styles } from '.././styles/main';

export class HeaderComp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { search: false, mv: false };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  _keyboardDidShow() {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    // alert('Keyboard Hidden');
  }

  render() {
    let left =
      this.props.left && !this.state.search ? (
        <Left>
          <Button transparent onPress={() => this.props.openDrawer()}>
            <Icon name="bars" style={Styles.headerIcons} size={20} />
          </Button>
        </Left>
      ) : null;

    let right =
      this.props.right && !this.state.search ? (
        <Right>
          <Button
            transparent
            onPress={() => this.setState({ search: !this.state.search })}
          >
            <Icon name="search" size={20} style={Styles.headerIcons} />
          </Button>

          <Button transparent>
            <Icon name="filter" size={20} style={Styles.headerIcons} />
          </Button>
        </Right>
      ) : null;

    let body = !this.state.search ? (
      <Body>
        <Title>{this.props.title}</Title>
      </Body>
    ) : null;

    let searchBox = this.state.search ? (
      <Item>
        <Icon
          name="arrow-left"
          size={20}
          onPress={() => this.setState({ search: !this.state.search })}
        />
        <Input placeholder="Search" />
        <Spinner color="green" />
      </Item>
    ) : null;
    return (
      <Header searchBar={true} style={{ backgroundColor: '#f17d00' }}>
        {searchBox}
        {left}
        {body}
        {right}
      </Header>
    );
  }
}
