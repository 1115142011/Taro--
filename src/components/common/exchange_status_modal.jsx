import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import prizeImg from "@/assets/common/prize.svg";
import purseImg from "@/assets/common/purse.svg";
import cryImg from "@/assets/common/cry.svg";
import { connect } from "@tarojs/redux";
import "./exchange_status_modal.scss";
// 兑奖结算的弹窗
@connect( ({globalStore}) => ({
  goods:globalStore.goods
}))
class ExchangeStatusModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
  }
  backIndex(){
    Taro.switchTab({url:'/pages/index/index'})
  }
  toShare(){
    Taro.navigateTo({url:'/pages/ads/fission_promotion'})
  }
  render() {
    const {showDialog,modalState,clearModal}= this.props
    return (
      <AtModal isOpened={showDialog} closeOnClickOverlay={false}>

        {/* 无法兑换 */}
        <View hidden={modalState != 0}>
          <View
            className='closeBtn'
            onClick={clearModal}
            hidden={modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>
          <AtModalHeader>温馨提示</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={cryImg} className='modalPic'></Image>
              <Text className='modalContent'>
                您的方糖不够，尚不能兑换该奖品
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton onClick={this.toShare.bind(this)} className='modalConfirmBtn'>
                    立即推荐赚方糖
                  </AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>

          {/* 申请成功 */}
        <View hidden={modalState != 1}>
          <View
            className='closeBtn'
            onClick={clearModal}
            hidden={modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>
          <AtModalHeader>申请成功</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={prizeImg} className='modalPic'></Image>
              <Text className='modalContent'>
                我们已收到您的兑奖申请，\n兑奖记录可在“我的兑换”中查看，\n奖品将于
                <Text className='orange'>7</Text>日内发出，\n请注意查收
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton onClick={this.backIndex.bind(this)} className='modalConfirmBtn'>返回个人中心</AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>
        <View hidden={modalState != 2}>
          <View
            className='closeBtn'
            onClick={clearModal}
            hidden={modalState}
          >
            <AtIcon value='close' size='14' color='#000'></AtIcon>
          </View>


          <AtModalHeader>申请成功</AtModalHeader>
          <AtModalContent className='atModalContent'>
            <View className='modalContentWrap'>
              <Image src={purseImg} className='modalPic'></Image>
              <Text className='modalContent'>
                我们已收到您的兑奖申请，\n兑奖记录可在“我的兑换”中查看，\n款项将于
                <Text className='orange'>7</Text>个工作日到账，\n请注意查收
              </Text>
              <View className='buttonWrap'>
                <View className='modalBtn'>
                  <AtButton onClick={this.backIndex.bind(this)} className='modalConfirmBtn'>返回个人中心</AtButton>
                </View>
              </View>
            </View>
          </AtModalContent>
        </View>
      </AtModal>
    );
  }
}

export default ExchangeStatusModal;
