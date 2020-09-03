import Taro, { Component } from "@tarojs/taro";
import { View} from "@tarojs/components";
import "./info_list_row.scss";
// 行数据键值对展示 如： 数量 1
class InfoListRow extends Component {
  gotoFissionPromotion = () => {
    Taro.navigateTo({ url: "/pages/ads/fission_promotion/fission_promotion" });
  };

  render() {
    return (
        <View className='paraWrap'>
          <View className='paraName'>{this.props.paraName}</View>
          <View className='paraValue'>{this.props.paraValue}</View>
        </View>
    );
  }
}

export default InfoListRow;
