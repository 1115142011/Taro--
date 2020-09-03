import { combineReducers } from 'redux'
import houseStore from './house_store'
import  globalStore from "./global_store";

export default combineReducers({
  houseStore,
  globalStore
})
