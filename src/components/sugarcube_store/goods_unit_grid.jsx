import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import "./goods_unit_grid.scss";
/*
  noBorderBottom：是否显示底部边距

*/
class GoodsUnitGrid extends Component {
 
  confirmExchange(){
    const { goodsID ,isLink=false} = this.props;
    if(isLink) return
    Taro.navigateTo({
      url: "/pages/exchange_process/confirm_exchange?goodsID=" + goodsID
    });
  }
  /*下面为自定义方法 */
  // 方糖商城跳转

  render() {
    return (
      <View className='goodsUnitGridWrap' onClick={this.confirmExchange}>
        <Image
          mode='widthFix'
          src={this.props.imgSrc}
          className='goodsImg'
          webp lazyLoad
        ></Image>
        <View className='goodsInfo'>
          <View className='goodsName'>{this.props.goodsName}</View>
          <View className='goodsValue'>{this.props.goodsValue}</View>
          <View>
            <View className='goodsPrice'>{this.props.goodsPrice}</View>
            <Image widthFix src={cubeBtnImg} className='cubeBtnImg'></Image>
          </View>
        </View>
      </View>
    );
  }
}

export default GoodsUnitGrid;
