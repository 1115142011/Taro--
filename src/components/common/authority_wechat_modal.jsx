import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtButton
} from "taro-ui";
import "./fission_login_modal.scss";

class AuthorityWechatModal extends Component {
  render() {
    return (
      <AtModal
        isOpened={this.props.showDialog}
        closeOnClickOverlay={false}
        onClose={this.props.closeModal}
      >
        <View className='closeBtn' onClick={this.props.closeModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>温馨提示</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Text className='hintInfo'>需要使用您的微信信息</Text>
            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton
                  className='wxModalConfirmBtn'
                  openType='getUserInfo'
                  onGetUserInfo={this.props.getMsg}
                >
                  授权用户信息
                </AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default AuthorityWechatModal;
