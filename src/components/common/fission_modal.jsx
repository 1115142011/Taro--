import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon, AtModal, AtModalHeader, AtModalContent } from "taro-ui";
import "./fission_modal.scss";

class FissionModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
  }
 
  render() {
    const {showDialog,clearModal} = this.props
    return (
      <AtModal isOpened={showDialog} closeOnClickOverlay={false}>
        <View className='closeBtn' onClick={clearModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader> 活动规则</AtModalHeader>
        <AtModalContent className='atModalContent'>
          <View className='modalContentWrap'>
            <Text className='address'>
              邀请流程：\n
              1.您可在此活动页面内阅读活动细则，并点击下方“微信好友”按钮转发分享至好友\n
              2.您的好友可通过该分享页面接受邀请，与您进行好友绑定、填写手机号及验证码完成绑定关系；\n
              3.好友绑定成功后，若在活动有效期内成功签约（签约时间大于6个月）则认定您的邀请成功；\n
              4.像素租客每成功邀请一位好友将获得2000颗“像素方糖”奖励，非像素租客每成功邀请一位好友将获得1000颗“像素方糖”奖励。奖励会发放至您参与活动手机号的账户内，请使用此手机号登录“像素公寓”小程序，“个人中心”内查看并消费。\n
              注：\n
              好友可以更换绑定人，一人只能绑定一人；每个用户每个月最多可获得10名好友带来的奖励。\n
              其他：\n
              1.像素公寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格；\n
              2.在法律许可的范围内，像素公寓留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利；\n
              3.因不可抗力事件使本活动不能实现，像素公寓不承担责任。\n
              不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件；\n
              4.活动最终解释权归像素公寓所有。\n
            </Text>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default FissionModal;
