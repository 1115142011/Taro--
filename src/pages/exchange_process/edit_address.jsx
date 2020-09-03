import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import locationImg from "@/assets/common/location.svg";
import noLocationImg from "@/assets/common/no_location.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import InfoListRow from "@/components/common/info_list_row";
import { AtDivider, AtButton } from "taro-ui";
import ExchangeStatusModal from "@/components/common/exchange_status_modal";
import FissionBanner from "@/components/fission/fission_banner";
import { connect } from "@tarojs/redux";
import AuthorityModal from "@/components/common/authority_modal";
import { updateUserInfo } from "@/actions/global_actions";
import { entityRedeem } from "./service_exchange_api";

import "./exchange_info_editor.scss";
// 实体商品编辑地址的页面

@connect(({ globalStore }) => ({
  ...globalStore
}),
dispatch => ({
  onUpdateMsg() {
    dispatch(updateUserInfo());
  }
})
)
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "确认收货地址",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      // 第一次为0，添加微信地址页面，点击选择后跳转选择地址页面，选择后跳转回并切换状态1
      // 在有地址的时候默认为状态1
      addressState: 0, //0 无货地址
      modalState: 1,
      AuthModal: false,
      showExhangeDialog: false,
      address: {},
      receptionAddress: ""
    };
  }
  closeAuthModal(){
    this.setState({
      AuthModal: false,
    })
  }
  closeExhangeDialog(){
    this.setState({
      showExhangeDialog:false
    })
  }
  getAddress() {
    const _this = this;
    Taro.chooseAddress({
      success: function(result) {
        _this.setState({
          address: result,
          receptionAddress:
            result.provinceName +
            result.cityName +
            result.countyName +
            result.detailInfo,
          addressState: 1
        });
      },
      fail: function(err) {
        if(err.errMsg=='chooseAddress:fail auth deny'){
          _this.setState({
            AuthModal: true
          });
        }
      }
    });
  }
  convertGift() {
    const param = {
      address: this.state.receptionAddress,
      itemCount: this.props.goods.number,
      itemId: this.props.goods.type.itemId,
      name: this.state.address.userName,
      tel:this.state.address.telNumber?this.state.address.telNumber: this.props.userInfo.tel
    };
    entityRedeem(param).then(( res) => {
      if (res.code == "300003") {
        this.setState({
          showExhangeDialog: true,
          modalState: 0
        });
      } else if (res.code == "000000") {
        this.setState({
          showExhangeDialog: true,
          modalState: 1
        });
      }
      this.props.onUpdateMsg();
    });
  }
 
  render() {
    const { goods, userInfo } = this.props;
    const { address, receptionAddress, AuthModal } = this.state;
    return (
      <View>
        {/* 单独封装了三个状态的ExchangeModal */}
        <ExchangeStatusModal
          showDialog={this.state.showExhangeDialog}
          modalState={this.state.modalState}
          clearModal={this.closeExhangeDialog.bind(this)}
        ></ExchangeStatusModal>
        <View className='contentWrap' hidden={this.state.addressState != 0}>
          <FissionBanner type='narrow'></FissionBanner>
          <View className='whiteBoard confirmWrap'>
            <View className='infoWrap'>
              <Image className='infoImg' src={noLocationImg}></Image>
              <Text className='infoContent'>暂时没有收货地址</Text>
            </View>
            <View className='buttonWrap'>
              <AtButton
                openSetting
                full
                onClick={this.getAddress.bind(this)}
                className='modalConfirmBtn'
              >
                使用微信地址
              </AtButton>
            </View>
          </View>
        </View>
        <View className='contentWrap' hidden={this.state.addressState != 1}>
          <View className='whiteBoard'>
            <View className='addressWrap'  onClick={this.getAddress.bind(this)}>
              <View className='locationWrap'>
                <Image src={locationImg} className='locationImg'></Image>
              </View>
              <View className='addressInfo'>
                <View className='firstLine'>
                  <Text className='name'>{address.userName}</Text>
                  <Text className='phoneNum'>{address.telNumber?address.telNumber:userInfo.tel}</Text>
                </View>
                <View className='address'>{receptionAddress}</View>
              </View>
              <View className='arrowWrap'>
                <Image
                  src={RightArrowOrangeImg}
                  className='rightArrowOrangeImg'
                ></Image>
              </View>
            </View>

          </View>
          <View className='whiteBoard confirmWrap'>
            <View className='exchangeTitle'>兑换奖品</View>

            <View className='goodsUnitWrap'>
              <GoodsUnitRow
                noBorderBottom
                imgSrc={goods.type.image}
                goodsID={goods.type.itemId}
                goodsType={goods.type.type}
                goodsName={goods.type.name}
                goodsValue={`价值 ${goods.type.price} 元`}
                goodsPrice={goods.type.redeemPrice}
                showExchangeBtn={false}
              ></GoodsUnitRow>
            </View>
            <View className='InfoListWrap'>
              <InfoListRow
                paraName='兑换数量'
                paraValue={goods.number}
              ></InfoListRow>
              <InfoListRow
                paraName='配送方式'
                paraValue='快递免邮'
              ></InfoListRow>
              <AtDivider height='60' lineColor='#E1E1E1'></AtDivider>
            </View>
            <View className='buttonWrap'>
              <AtButton
                className='modalConfirmBtn'
                onClick={this.convertGift.bind(this)}
              >
                确认提交
              </AtButton>
            </View>
          </View>
        </View>
        <AuthorityModal showDialog={AuthModal} closeModal={this.closeAuthModal.bind(this)} content='需要使用您的通讯地址，用于收取快递'></AuthorityModal>
      </View>
    );
  }
}

export default EditAddress;
