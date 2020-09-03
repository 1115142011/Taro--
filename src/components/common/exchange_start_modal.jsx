import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import { connect } from "@tarojs/redux";
import "./exchange_start_modal.scss";
// 开始兑奖的弹窗
@connect(({ globalStore }) => ({
  goods: globalStore.goods
}))
class ExchangeStartModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      showFissionLoginDialog: this.props.showDialog
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      showFissionLoginDialog: nextProps.showDialog
    });
  }
  hideDialog = () => {
    this.setState({
      showFissionLoginDialog: false
    });
  };
  startExchange = () => {
    const type = this.props.goods.type.type;
    if (type === 1) {
      // 现金商品
      Taro.navigateTo({ url: "/pages/exchange_process/edit_bank_info" });
    } else if (type === 2) {
      // 实体商品
      Taro.navigateTo({ url: "/pages/exchange_process/edit_address" });
    }
  };
  setFalse() {
    this.setState({
      showFissionLoginDialog: false
    });
  }
  render() {
    const { number, type } = this.props.goods;
    return (
      <AtModal isOpened={this.state.showFissionLoginDialog}>
        <View className='closeBtn' onClick={this.hideDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>兑换申请</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <View className='hintInfo'>
              <View className='infoRow'>
                确认消耗
                <Text className='orange'>{number * type.redeemPrice}</Text>
                <Image src={cubeBtnImg} className='cubeBtnImg'></Image>
              </View>
              <View>
                兑换
                <Text className='goodsName'>{type.name}</Text>
                  <Text className='orange'> x{number}</Text>
              </View>
            </View>
            <View className='goodsImageWrap'>
              <Image
                className='goodsImage'
                src={type.image}
                mode='widthFix'
                webp
                lazyLoad
              ></Image>
            </View>

            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton
                  className='modalConfirmBtn'
                  onClick={this.startExchange}
                >
                  开始兑换
                </AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default ExchangeStartModal;
