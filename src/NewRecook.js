import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, FlatList, View, TextInput } from 'react-native';
import {connect} from 'react-redux'
import {addRecook} from '../actions/recookActions'
import {Resep} from './ResepDetail'


var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class NewRecook extends Component {
  constructor() {
    super()
    this.state = {
      bahan: [''],
      content: '',
      title: '',
      avatarSource: '',
      file: ''
    }
  }

  show() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      this.setState({
        file: response
      })
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source
        });
      }
    })
  }

  tambahRecook() {
    var {data} = this.props.navigation.state.params
    const {navigate} = this.props.navigation
    this.props.addRecook(this.state.content, data._id, this.state.file, this.props.access_token)
    navigate('Resep')
  }

    render() {
      console.log(this.props.navigation.state.params.data)
      var {data} = this.props.navigation.state.params
      var uploadImage = this.state.avatarSource == ''?<Image source={{uri: "https://cdn3.iconfinder.com/data/icons/glypho-photography/64/camera-upload-to-512.png"}} style={{height: 100, width: 100}}/>:<Image source={{uri: this.state.avatarSource.uri}} style={{height: 100, width: 100}}/>      
      return (
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 20, borderBottomWidth: 0.7, paddingBottom: 5}}>
            <Image source={{uri: data.urlImage}} style={{height: 30, width: 30}}/>
            <Text style={{marginTop: 5, marginLeft: 8 , color: '#1c6300'}}>{data.title}</Text>
          </View>          
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{height: 100, width: 100, marginBottom: 20}} onPress = {() => this.show()}>
              {uploadImage}
            </TouchableOpacity>
            <TextInput multiline style={{width: 250, height: 105}} onChangeText={text => {
                this.setState({content: text})
              }}/>
          </View>
          <TouchableOpacity style={styles.recookBotton} onPress={() => {this.tambahRecook()}}>
              <Text style={styles.textRecookButton}>Recook</Text>
            </TouchableOpacity>
        </ScrollView>
      );
    }
  }

  const styles = {
    recookBotton: {
      backgroundColor: "#ff7d31",
      width: 340,
      height: 40,
      marginBottom: 20,
      borderRadius: 5,
      marginLeft: 10
    },

    textRecookButton: {
      color: 'white',
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  }   
  
  const mapStateToProps = (state) => {
    console.log(state)
    return { 
      access_token: state.reducer.access_token
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addRecook: (content, resep_id, file, accesstoken) => dispatch(addRecook(content, resep_id, file, accesstoken))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NewRecook);