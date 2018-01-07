import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Fab, View } from 'native-base';
import {connect} from 'react-redux'
import {fetchResep} from '../actions/resepActions'
import ResepDetail from './ResepDetail'
import NewResep from './NewResep'
import {likeResep} from '../actions/resepActions'

class Resep extends Component {

  constructor() {
    super()
    this.state = {
      active: 'true',
      counter: 0
    }
  }


  componentDidMount() {
    this.props.fetchResep()
  }

  sukaResep(idResep, accesstoken) {
    this.props.likeResep(idResep, accesstoken)
    this.setState({
      counter: Math.random()
    })
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <ScrollView>
        {this.props.reseps.map((resep, index) => {
          return(
            <Content key={index}>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{resep.author.name}</Text>
                    <Text note>{resep.title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <TouchableOpacity onPress={() => {navigate('ResepDetail', {data: resep})}}>
              <CardItem cardBody>
                <Image source={{uri: resep.urlImage}} style={{height: 350, width: 350, flex: 1}}/>
              </CardItem>
              </TouchableOpacity>
              <CardItem>
                <Left>
                  <Button transparent onPress = {() => this.sukaResep(resep._id, this.props.access_token)}   >
                    <Icon active name="thumbs-up" />
                    <Text>{resep.like.length} Like</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Recook</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
          )
        })}
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => {navigate('NewResep', {data: NewResep})}}>
            <Icon name="share" />
          </Fab>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reseps: state.reducer.resep,
    access_token: state.reducer.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResep: () => dispatch(fetchResep()),
    likeResep: (idResep, accesstoken) => dispatch(likeResep(idResep, accesstoken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resep);