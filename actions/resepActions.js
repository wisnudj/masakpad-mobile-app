import axios from 'axios'
import RNFetchBlob from 'react-native-fetch-blob'

export const getResep = (resep) => {
  return {
    type: "GET_RESEP",
    payload: {
      resep
    }
  }
}

export const fetchResep = () => {
  return dispatch => {
    axios.get('http://192.168.58.1:3001/resep')
         .then((response) => {
           dispatch(getResep(response.data))
         })
         .catch((err) => {
           console.log(err)
         })
  }
}

export const addResep = (bahan, langkah, title, file, accesstoken) => {
  console.log('yeahhhhhhh',bahan, langkah, title, file, accesstoken)
  return dispatch => {
    RNFetchBlob.fetch('POST', 'http://192.168.58.1:3001/resep/create', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      access_token: accesstoken,
      'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'bahan', data : JSON.stringify(bahan)},
      { name : 'langkah', data : JSON.stringify(langkah)},
      { name : 'title', data : JSON.stringify(title)},
      { name : 'file', filename : file.fileName, data: file.data},
    ]).then((resp) => {
      RNFetchBlob.fetch('GET', 'http://192.168.58.1:3001/resep', {
        Authorization : 'Bearer access-token...',
        // more headers  ..
      })
      // when response status code is 200
      .then((res) => {
        // the conversion is done in native code
        let base64Str = res.base64()
        // the following conversions are done in js, it's SYNC
        let text = res.text()
        let json = res.json()
        dispatch(getResep(json))
    
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
      })      
    }).catch((err) => {
      // ...
      console.log(err)
    })    
  }
}

export const likeResep = (idResep, accesstoken) => {
  return dispatch => {
    axios.put('http://192.168.56.1:3001/resep/like/' + idResep, {data: 'yeah'}, {headers: {access_token: accesstoken}})
         .then(({data}) => {
           axios.get('http://192.168.56.1:3001/resep')
                .then((response) => {
                  dispatch(getResep(response.data))
                })
         })
         .catch((err) => {
           console.log(err)
         })
  }
}