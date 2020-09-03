
import request from "@/utils/request";

// 获取 tokens
export default function queryScoreDetails (param) {
  return request({
    url: '/hrms-rcmdapi/customer/cust-score-list',
    method: 'POST',
    data:param
  });
}
