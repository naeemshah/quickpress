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
        visible={this.props.mv}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <Button onPress={this.props.closeModal()} />
      </Modal>
    );
  }
}
