import request from "@/utils/request";

/**
 * 接受邀请
 * @param  {number} type 
 * @param  {string} tel 
 * @param  {string} smsCode 
 * @param  {string} nikName 
 * @param  {string} avatar 
 * @param  {number} sex 
 * @param  {string} code
 */

export  function acceptInvite (param) {
  return request({
    url: '/hrms-rcmdapi/customer/accept-reg',
    method: 'POST',
    data: param
  });
}
export  function accptInvite (param) {
  return request({
    url: '/hrms-rcmdapi/customer/accept-reg',
    method: 'POST',
    data: param
  });
}
// 查询房源列表
export function queryRoomList (param) {
  return request({
    url: '/hrmsapi/v1/house/room/query',
    method: 'POST',
    data:param
  });
}
// 拖过手机号查询推荐人及签约状态
export function  getReferrerByMobile(param) {
  return request({
    url: '/hrms-rcmdapi/customer/mobile-referrer-get',
    method: 'POST',
    data:param
  });
}
