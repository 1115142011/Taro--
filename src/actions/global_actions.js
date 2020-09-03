
import { queryUserInfo } from "@/global_api/index";

import { SET_USER_INFO,CACHE_GOODS,EXCHANGE_NUMBER,UPDATE_USER_INFO} from "../constants/global_type";

export const SAVE_USER_INFO = (param) => {
  return {
    type: SET_USER_INFO,
    payload:param
  };
};
export const catchDoods = (param) => {
  return {
    type: CACHE_GOODS,
    payload:param
  };
};
export const exchangeNumber = (param) => {
  return {
    type: EXCHANGE_NUMBER,
    payload:param
  };
};
export const update = (param) => {
  return {
    type: UPDATE_USER_INFO,
    payload:param
  };
};
// 异步的action
export function updateUserInfo() {
  return dispatch =>{
    queryUserInfo().then(({data})=>{
      return  dispatch(update(data));
    })
  }
}
// // 查询当前用户的 推荐人
// export function selfRecommend() {
//   return dispatch =>{
//     queryReferrer().then(({data})=>{
//       return  dispatch(update(data));
//     })
//   }
// }
