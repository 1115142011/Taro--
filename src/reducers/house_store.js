import { SAVE, DELETE } from '../constants/house_action_name'

const INITIAL_STATE = {
 
}

export default function saveHouseData (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        ...action.payload
      }
     case DELETE:
       return {
         ...state,
         imageData:null
       }
     default:
       return state
  }
}
