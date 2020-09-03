import request from "@/utils/request";

/**
 * 微信绑定手机号解密
 * @param {string} encryptedData 
 * @param {string} iv  
 */
export function decodePhoneNumber (param) {
  return request({
    url: '/hrms-rcmdapi/auth/decrypt-tel',
    method: 'POST',
    data:param
  });
}
/**
 * 用户注册/登录
 * @param  {number} type 
 * @param  {string} tel 
 * @param  {string} smsCode 
 * @param  {string} nikName 
 * @param  {string} avatar 
 * @param  {number} sex 
 */

export function enterInfo (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-add',
    method: 'POST',
    data: param
  });
}
