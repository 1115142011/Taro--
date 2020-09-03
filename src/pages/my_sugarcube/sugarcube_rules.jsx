import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ParaDisplay from "@/components/common/para_display";

class SugarcubeRules extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "方糖规则",
      navigationBarBackgroundColor: "#eeeeee"
    };
  }
  render() {
    return (
      <View sytle='width:100%'>
        <ParaDisplay
          title='什么是像素方糖？'
          content='像素方糖为像素公寓线上专属虚拟货品，用以兑换奖品。不可转让，不可用于其他非像素公寓授权场景应用。'
        ></ParaDisplay>
        <ParaDisplay
          title='方糖能为我带来什么？'
          content='方糖目前可以在方糖商城中兑换奖品，日后还会有更多福利提供，多多累积，惊喜不断，敬请期待。'
        ></ParaDisplay>
        <ParaDisplay
          title='如何获得方糖？'
          content={
            "推荐好友入住像素公寓成功即可得方糖。\n像素公寓在租租客每推荐成功1位即可获得2000方糖（=200元现金）；\n非在租租客每推荐成功1位获得1000方糖（=100元现金）。"
          }
        ></ParaDisplay>
        <ParaDisplay
          title='其他规则'
          content={
            "1、像素公寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其获得方糖的资格；\n2、每个用户仅限使用1个账号参与积分活动（同一账号、手机号、移动设备、银行卡、身份证以及其他信息相同均视为同一账号）；\n3、如有任何问题欢迎致电客服热线 400 806 3399 （服务时间为每天：08:30-17:45）"
          }
        ></ParaDisplay>
      </View>
    );
  }
}

export default SugarcubeRules;
