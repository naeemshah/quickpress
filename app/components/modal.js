import React, { Component } from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import {
  Spinner,
  Header,
  Body,
  Left,
  Right,
  Title,
  Icon,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

export class ModalComp extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <Text>dfdsfsdf</Text>
      </Modal>
    );
  }
}
