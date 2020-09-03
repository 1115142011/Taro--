import request from "@/utils/request";

// 商品详情
export  function queryGiftDetails (param) {
  return request({
    url: '/hrms-rcmdapi/shop-items/shop-item-get',
    method: 'POST',
    showLoading: true,
    data:param
  });
}
// 兑换实体商品
export function entityRedeem (param) {
  return request({
    url: '/hrms-rcmdapi/shop-items/entity-item-redeem',
    method: 'POST',
    data: param
  });
}
// 获取银行卡信息
export  function querybankinfo (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-bankinfo-get',
    method: 'POST',
    showLoading: true,
    data:param
  });
}
// 修改银行卡信息
export  function updateBankinfo (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-bankinfo-update',
    method: 'POST',
    data:param
  });
}
// 兑换现金商品
export  function cashRedeem (param) {
  return request({
    url: '/hrms-rcmdapi/shop-items/cash-item-redeem',
    method: 'POST',
    data:param
  });
}

