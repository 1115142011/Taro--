import {
  SAVE,
  DELETE
} from '../constants/house_action_name'

export const saveMsg = (param) => {
  return {
    type: SAVE,
    payload:param
  }
}
export const deleteMsg = () => {
  return {
    type: DELETE
  }
}

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
