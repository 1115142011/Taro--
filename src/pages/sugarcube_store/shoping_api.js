import request from "@/utils/request";

// 商品详情
export default function queryGiftList (param) {
  return request({
    url: '/hrms-rcmdapi/shop-items/shop-item-list',
    method: 'POST',
    data:param
  });
}