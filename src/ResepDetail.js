import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, FlatList, View } from 'react-native';
import NewRecook from './NewRecook'
import {connect} from 'react-redux'
import {fetchRecook} from '../actions/recookActions'

class ResepDetail extends Component {
  _keyExtractor = (item, index) => index

    componentDidMount() {
      var {data} = this.props.navigation.state.params
      this.props.fetchRecook(data._id)
    }

    render() {
      var {data} = this.props.navigation.state.params
      var {imageStyle, textStyleSubTitle, listStyleBahan, textStyleTitle, listStyleLangkah, nameStyle} = styles
      var {navigate} = this.props.navigation
      console.log(this.props.recook)
      return (
        <ScrollView style={{backgroundColor: "#fcffc6"}}>
          <Image
            style={imageStyle} 
            source={{uri: data.urlImage}} 
          />
          <Text style={textStyleTitle}>{data.title}</Text>
          <Text style={nameStyle}>{data.author.name}</Text>
          <Text style={textStyleSubTitle}>Bahan - bahan</Text>
          <View style={listStyleBahan}>
            <FlatList
              data={data.bahan}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <Text>{item}</Text>}
            />
          </View>
          <Text style={textStyleSubTitle}>Langkah - langkah</Text>
          <View>
            <FlatList
              data={data.langkah}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <Text style={listStyleLangkah}>{item}</Text>}
            />
          </View>
          <View style={styles.recookStyle}>
            <Text style={{color: '#ff7d31', fontSize: 20}}>Recook</Text>
            <Text style={{marginBottom: 10}}>Dapatkan inspirasi dari mereka yang sudah mencoba resep ini</Text>
            <Text style={{textAlign:"center", fontSize: 20}}>Sudah mencoba resep ini?</Text>
            <Text style={{textAlign:"center", marginBottom: 10}}>Bagikan hasil masakanmu lewat Recook</Text>
            <TouchableOpacity style={styles.recookBotton} onPress={() => {navigate('NewRecook', {data: data})}}>
              <Text style={styles.textRecookButton}>Bagikan foto Recook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }

  const styles = {
    imageStyle: {
      height: 250,
      width: 250,
      padding: 10
    },
  
    listStyleBahan: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',    
      shadowColor: '#000',
      shadowOffset: {widh: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,        
      marginLeft: 10,
      paddingLeft: 10,
      marginRight: 10,
      marginBottom: 40,
      paddingTop: 10,
      paddingBottom: 30,
      backgroundColor: "white"
    },

    listStyleLangkah: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',    
      shadowColor: '#000',
      shadowOffset: {widh: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,        
      marginLeft: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10,
      marginBottom: 10,
      paddingTop: 10,      
      paddingBottom: 30,
      backgroundColor: "white"
    },
  
    textStyleSubTitle: {
      marginBottom: 10,
      marginLeft: 10,
      fontSize: 18
    },

    textStyleTitle: {
      fontSize: 24,
      color: "#85ad66",
      marginBottom: 30,
      marginLeft: 10
    },

    nameStyle: {
      fontSize: 18,
      marginBottom: 30,
      marginLeft: 10
    },

    recookStyle: {
      backgroundColor: 'white',
      padding: 10
    },

    recookBotton: {
      backgroundColor: "#ff7d31",
      width: 340,
      height: 40,
      marginBottom: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
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
      recook: state.reducer.recook
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchRecook: (resep_id) => dispatch(fetchRecook(resep_id))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ResepDetail)