import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'; 
import Login from './Login'
import Daftar from './Daftar'

const Opening = (props) => {
  const {imageStyle} = styles
  const {navigate} = props.navigation
  return(
    <View style={styles.containerStyle}>
        <Image
        style={imageStyle} 
        source={{uri: "http://www.clker.com/cliparts/L/2/X/P/Z/S/plate-fork-spoon-no-text-md.png"}} 
        />
        <Text style={styles.textStyleBesar}>
          Simpan resep & berbagi pengalaman memasak dengan mudah
          lewat Masakpad
        </Text>
        <TouchableOpacity 
        style={styles.buttonDaftarStyle}
        onPress={() => {
          navigate('Daftar')
        }}
        >
          <Text style={styles.textStyleButton}>Daftar dengan email</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 40}}>
          Atau
        </Text>
        <TouchableOpacity  onPress={() => {
          navigate('Login')
        }}>
        <Text style={styles.textStyleBesar}>
          Sudah terdaftar lewat email ? Masuk
        </Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', marginTop: 20, marginLeft: 10, marginRight: 10}}>
          Dengan mendaftar, kamu telah menyetujui ketentuan pemakaian
          dan pengaturan privasi yang ada di Masakpad
        </Text>    
    </View>
  )
}

const styles = {
  imageStyle: {
    height: 130,
    width: 180,
    marginTop: 60
  },

  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  textStyleBesar: {
    fontSize: 18,
    color: "#a39f9f",
    textAlign: "center",
    marginTop: 20
  },

  textStyleButton: {
    textAlign: "center", 
    marginTop: "auto", 
    marginBottom: "auto",
    fontSize: 18
  },

  buttonDaftarStyle: {
    width: 340,
    height: 40,
    backgroundColor: '#cecaca',
    marginTop: 60

  }
}

export default Opening