import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, FlatList, View, TextInput } from 'react-native';
import {connect} from 'react-redux'
import {addResep} from '../actions/resepActions'


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

class NewResep extends Component {
  constructor() {
    super()
    this.state = {
      bahan: [''],
      langkah: [''],
      title: '',
      avatarSource: '',
      file: ''
    }
  }

  tambahInputBahan() {
    var newBahan = this.state.bahan
    newBahan.push('')
    this.setState({
      bahan: newBahan
    })
  }

  tambahInputLangkah() {
    var newLangkah = this.state.langkah
    newLangkah.push('')
    this.setState({
      langkah: newLangkah
    })
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

  tambahResep() {
    const {navigate} = this.props.navigation
    this.props.addResep(this.state.bahan, this.state.langkah, this.state.title, this.state.file, this.props.access_token)
    navigate('Resep')
  }

    render() {
      console.log(this.state.bahan)
      console.log(this.state.avatarSource.uri)

      var uploadImage = this.state.avatarSource == ''? <Text style={styles.textStyleButton}>+ Tambah gambar</Text>:<Image style={styles.imageStyle} source={{uri: this.state.avatarSource.uri}}/>
      return (
        <ScrollView style={{backgroundColor: "#ffffff"}}>
          <TouchableOpacity
            style={styles.imageStyle}
            onPress = {() => this.show()}
          >
            {uploadImage}
          </TouchableOpacity>           
        <TextInput
         style={styles.textInputTitleStyle}        
         placeholder="Judul Resep..."
         placeholderTextColor="#cecaca"
         onChangeText={text => {
          this.setState({title: text})
         }}           
         />
        <Text>Bahan - bahan</Text>
          {this.state.bahan.map((baha, index) => {
            return(
              <TextInput
              key={index}
              style={styles.textInputStyle}        
              placeholder="1 kg ayam (1 bahan)"
              placeholderTextColor="#cecaca"
              onChangeText={text => {
                var newBahan = this.state.bahan
                newBahan[index] = text
                this.setState({bahan: newBahan})
              }}           
            />
            )
          })}

          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress = {() => this.tambahInputBahan()}
          >
            <Text style={styles.textStyleButton}>+ Tambah bahan</Text>
          </TouchableOpacity>
          <Text>Langkah</Text>
          {this.state.langkah.map((langka, index) => {
            return(
              <TextInput
              key={index}
              style={styles.textInputStyle}        
              placeholder="Bagaimana membuatnya"
              placeholderTextColor="#cecaca"
              onChangeText={text => {
                var newLangkah = this.state.langkah
                newLangkah[index] = text
                this.setState({langkah: newLangkah})
              }}           
            />
            )
          })}
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress = {() => this.tambahInputLangkah()}
          >
            <Text style={styles.textStyleButton}>+ Tambah langkah</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress = {() => this.tambahResep()}
          >
            <Text style={styles.textStyleButton}>+ Tambah Resep</Text>
          </TouchableOpacity>                 
        </ScrollView>
      );
    }
  } 
  
  const styles = {
    textInputStyle: {
      width: 340,
      height: 40
    },

    buttonStyle: {
      width: 340,
      height: 40,
      marginTop: 60
  
    },
    textStyleButton: {
      textAlign: "center", 
      marginTop: "auto", 
      marginBottom: "auto",
      fontSize: 18
    },
    textInputTitleStyle: {
      fontSize: 24
    },

    imageStyle: {
      height: 350,
      width: null
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
      addResep: (bahan, langkah, title, file, accesstoken) => dispatch(addResep(bahan, langkah, title, file, accesstoken))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NewResep);