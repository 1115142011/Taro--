import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
// import goodsImg1 from "@/assets/sugarcube_store/hair_dryer.png";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import "./goods_unit_row.scss";

/*
  noBorderBottom：是否显示底部边距

*/
class GoodsUnitRow extends Component {
  /*下面为自定义方法 */
  confirmExchange = () => {
    const { goodsID,isLink=false} = this.props;
    if(isLink) return
    Taro.navigateTo({
      url: "/pages/exchange_process/confirm_exchange?goodsID=" + goodsID
    });
  };

  render() {
    let noBorderBottom;
    if (this.props.noBorderBottom) {
      noBorderBottom = `border-bottom:#fff`;
    }
    const {
      goodsName,
      goodsPrice,
      showExchangeBtn,
      goodsValue = ""
    } = this.props;
    return (
      <View className='goodsUnitRow' style={noBorderBottom}  onClick={this.confirmExchange}>
        <Image
          className='goodsImg'
          src={this.props.imgSrc}
          // src={goodsImg1}
          mode='widthFix'
          webp lazyLoad
        />
        <View className='goodsInfo'>
          <View className='goodsName'>{goodsName}</View>
          <View className='goodsValue'>{goodsValue}</View>
          <View className='goodsPriceWrap'>
            <View className='goodsPrice'>{goodsPrice}</View>
            <Image src={cubeBtnImg} className='cubeBtnImg'></Image>
          </View>
        </View>
        <View className='exchangeBtnWrap'>
          <View hidden={!showExchangeBtn}>
            <AtButton
              className='exchangeBtn'
              size='small'
              circle
            >
              兑换
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default GoodsUnitRow;
