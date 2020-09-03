import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import muscleImg from "@/assets/common/muscle.svg";
import CommonUtils from "@/utils/common_utils";

import { queryRedeemList } from "./user_service_api";
import "./my_exchange.scss";

class MyExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的兑换",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      pageNo: 1,
      pageSize: 10,
      isAll: false,
      isloading: false,
      dataList: []
    };
  }
  componentDidMount() {
    this.queryListData();
  }
  queryListData() {
    const { dataList, pageNo, pageSize } = this.state;
    this.setState({
      isloading: true
    });
    queryRedeemList({ pageNo, pageSize }).then(({ data }) => {
      const tempArry = dataList.concat(data.list);
      this.setState({
        pageNo: pageNo + 1,
        dataList: tempArry,
        isAll: tempArry.length === data.totalCount,
        isloading: false
      });
    });
  }
  getMore() {
    if (this.state.isAll) return;
    this.queryListData();
  }
  toDetails(goodsId) {
    Taro.navigateTo({
      url: "/pages/user_center/exchange_detail?goodsId=" + goodsId
    });
  }
  render() {
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(120);
    const { dataList, isloading } = this.state;
    return (
      <View className='contentWrap' style={wrapHeight}>
        <View className='fissionBannerWrap'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='myExchangeList'>
          {dataList.length != 0 && !isloading && (
            <ScrollView
              scrollY
              className='listWrap'
              onScrollToLower={this.getMore.bind(this)}
              style={listHeight}
            >
              {dataList.map((val, index) => (
                <View
                  key={index + "index"}
                  className='myExchangeUnit'
                  onClick={this.toDetails.bind(this, val.redeemId)}
                >
                  <View className='unitLeft'>
                    <View className='unitName'>{val.item.name}</View>
                    <View className='unitType'>
                      {val.itemType === 1 ? "现金奖品" : "实体奖品"}
                    </View>
                    <View className='unitConditionWrap'>
                      <View className='exchangeTime'>
                        {val.createTime} 申请兑换
                      </View>
                      <View className='exchangeStatus'>
                        {val.sendStatus === 1
                          ? "待发货"
                          : val.sendStatus === 2
                          ? "已发货"
                          : "发货失败"}
                      </View>
                    </View>
                  </View>
                  <View className='unitRight'>×{val.itemCount}</View>
                </View>
              ))}
              <View className='moreHintMsg'>
                {isloading && (
                  <AtActivityIndicator
                    mode='center'
                    content='加载中...'
                  ></AtActivityIndicator>
                )}
              </View>
            </ScrollView>
          )}
          {/* 以下为缺省状态 */}
          {dataList.length === 0 && !isloading &&  (
            <View className='defaultContent'>
              <Image src={muscleImg} className='defaultImg'></Image>
              <Text className='defaultInfo'>暂时还未兑换奖品，继续加油咯~</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default MyExchange;
