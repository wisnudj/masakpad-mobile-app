import { combineReducers } from 'redux'

var initialState = {
  openingVisible: true,
  mainVisible: false,
  access_token: 'kosong chui',
  recook: [],
  resep: []
}

var reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SIGN_IN':
      if(action.payload.acces_token.SUCCESS) {
        state.openingVisible = false
        state.mainVisible = true,
        state.access_token = action.payload.acces_token.SUCCESS.access_token
        return {...state}
      }
    case 'GET_RESEP':
      state.resep = action.payload.resep.SUCCESS.reverse()
      return {...state}
    case 'GET_RECOOK':
      state.recook = action.payload.recook.SUCCESS
      return {...state}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reducer
})

export default rootReducer
