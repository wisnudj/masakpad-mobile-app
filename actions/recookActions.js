import axios from 'axios'
import RNFetchBlob from 'react-native-fetch-blob'

export const getRecook = (recook) => {
  return {
    type: "GET_RECOOK",
    payload: {
      recook
    }
  }
}

export const fetchRecook = (resep_id) => {
  console.log(resep_id) 
  return dispatch => {
    axios.get('http://192.168.56.1:3001/recook/byresep/' + resep_id)
         .then((response) => {
           dispatch(getRecook(response.data))
         })
         .catch((err) => {
           console.log(err)
         })
  }
}

export const addRecook = (content, resep_id, file, accesstoken) => {
  console.log('yeahhhhhhh',content,resep_id, file, accesstoken)
  return dispatch => {
    RNFetchBlob.fetch('POST', 'http://192.168.56.1:3001/recook/create', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      access_token: accesstoken,
      'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'content', data : content},
      { name : 'resep_id', data : resep_id},
      { name : 'file', filename : file.fileName, data: file.data},
    ]).then((resp) => {
      console.log(resp)    
    }).catch((err) => {
      // ...
      console.log(err)
    })    
  }
}