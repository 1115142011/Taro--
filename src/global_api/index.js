import request from "@/utils/request";

// 获取 tokens
export function getToken () {
  return request({
    url: '/hrms-rcmdapi/auth/token',
    method: 'GET',
    showLoading: true
  });
}
/*
 * 获取 openId
 * @param {}
 */
export function getOpenId(param) {
  return request({
    url: "/hrms-rcmdapi/auth/openid",
    method: "POST",
    showLoading: true,
    data: param
  });
}
/**
 * 手机号获取验证码
 * @param {string} tel
 * @param {number} type 1|2|3
 */
export function phoneAuthCode (param) {
  return request({
    url: '/hrms-rcmdapi/auth/send-code',
    method: 'POST',
    data:param
  });
}
/**
 * 获取用户微信息
 */
export function queryUserInfo (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-get',
    method: 'POST',
    data:param
  });
}
// 解绑微信
export function wxUnbind (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-wx-unbind',
    method: 'POST',
    data: param
  });
}
// 获取签约账户的房源管家
export function queryHousekeeper (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-housekeeper',
    method: 'POST',
    data: param
  });
}
// 解绑用户手机号
export function unBindPhone (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-tel-unbind',
    method: 'POST',
    data: param
  });
}
// 绑定信新手机
export function bindPhoneNumber (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-tel-bind',
    method: 'POST',
    data: param
  });
}
// // 查询用户 推荐人信息
// export function queryReferrer (param) {
//   return request({
//     url: '/hrms-rcmdapi/customer/cust-referrer-get',
//     method: 'POST',
//     data: param
//   });
// }
// 实名认证
export function customAuth (param) {
  return request({
    url: '/hrms-rcmdapi/auth/cust-auth',
    method: 'POST',
    data: param
  });
}



