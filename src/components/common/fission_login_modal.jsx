import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import iceCream from "@/assets/ads/ice_cream.svg";
import "./fission_login_modal.scss";

class FissionLoginModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#fdd835"
    };
  }
  toUserCenter(){
    Taro.switchTab({url:"/pages/index/index"})
  }
  toHouse(){
    Taro.switchTab({url:"/pages/apartment_list/apartment_list"})
  }
  render() {
    const{ name,replaceName='',clear} = this.props
    let modalDataArray = [
      {
        title: "绑定成功",
        content: `恭喜您！已成功接受${name}的邀请,快去选房入住吧`
      },
      {
        title: "更换绑定",
        content: `您已接受过 ${replaceName} 的邀请，是否将邀请人更换为 ${name}`
      },
      {
        title: "温馨提示",
        content: "您已成功入住像素公寓,\n无法接受邀请。"
      },
      {
        title: "温馨提示",
        content: "推荐人与被推荐人不能相同"
      },
      {
        title: "温馨提示",
        content: `您已接受过 ${replaceName} 的邀请，无法再次绑定`
      }
    ];
     // 0:绑定成功 1：更换绑定 2：温馨提示
    const{modalState,changeUser,showDialog} = this.props
    return (
      <AtModal isOpened={showDialog} closeOnClickOverlay={false}>
        {/* <View className='closeBtn' onClick={this.hideDialog}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View> */}
        <AtModalHeader>
          {modalDataArray[modalState].title}
        </AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Image
              hidden={modalState == 1 || modalState == 2}
              src={iceCream}
              className='modalPic'
            ></Image>
            <Text className='hintInfo'>
              {modalDataArray[modalState].content}
            </Text>
            <View className='buttonWrap'>

            <View
              className='modalBtn'
              hidden={
                 modalState == 0 || modalState == 2
                }
            >
              <AtButton className='modalCancelBtn' onClick={clear}>取消</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState != 1}>
                <AtButton className='modalConfirmBtn' onClick={changeUser}>确认更换</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState != 0}>
                <AtButton className='modalConfirmBtn' onClick={this.toHouse.bind(this)} >去逛逛</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState !=3}>
                <AtButton onClick={this.toUserCenter.bind(this)} className='modalConfirmBtn'>去往个人中心</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState != 4}>
                <AtButton onClick={this.toUserCenter.bind(this)} className='modalConfirmBtn'>去往个人中心</AtButton>
              </View>
              <View className='modalBtn' hidden={modalState !=2}>
                <AtButton onClick={this.toUserCenter.bind(this)} className='modalConfirmBtn'>去往个人中心</AtButton>
              </View>
            </View>

          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default FissionLoginModal;
