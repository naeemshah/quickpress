import React, { Component } from 'react';
import {
  RefreshControl,
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Icon,
  Button,
  Spinner,
  Container,
  Content,
  Grid,
  Col,
  Row,
} from 'native-base';

export class BlockLoader extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <Container>
        <Content>
          <ImageBackground
            style={[styles.backgroundImage, { height: height, width: width }]}
            source={require('.././images/2.jpg')}
          >
            <Grid>
              <Col>
                <Text style={{ textAlign: 'center' }} />
              </Col>
              <Col>
                <Spinner
                  color="white"
                  style={{ textAlign: 'center', marginTop: 200 }}
                />
                <Text
                  style={{ textAlign: 'center', marginTop: 10, color: 'white' }}
                >
                  Loading
                </Text>
              </Col>
              <Col>
                <Text style={{ textAlign: 'center' }} />
              </Col>
            </Grid>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
