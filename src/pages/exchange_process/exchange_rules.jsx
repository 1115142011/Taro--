import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ParaDisplay from "@/components/common/para_display";
import "./confirm_exchange.scss";

class ConfirmExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "兑奖规则",
      navigationBarBackgroundColor: "#eeeeee"
    };
  }
  render() {
    return (
      <View sytle='width:100%'>
        <ParaDisplay
          title='如何兑换？'
          content={
            "奖品可在像素方糖商城里凭借像素方糖兑换。\n不可现金兑换，购买。不可用于其他非像素公寓授权场景应用。"
          }
        ></ParaDisplay>
        <ParaDisplay
          title='奖品介绍'
          content='一经兑换，不退不换。'
        ></ParaDisplay>
        <ParaDisplay
          title='奖品介绍'
          content={
            "1、像素公寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其获得方糖的资格。\n2、在法律许可的范围内，像素公寓留变更、调整、终止本兑奖的权利以及调整或变换活动奖品的权利。\n3、如有任何问题欢迎致电客服热线 400 806 3399 （服务时间为每天：08:30-17:45）"
          }
        ></ParaDisplay>
      </View>
    );
  }
}

export default ConfirmExchange;
