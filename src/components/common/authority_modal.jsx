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

class AuthorityModal extends Component {
  render() {
    return (
      <AtModal isOpened={this.props.showDialog} closeOnClickOverlay={false} onClose={this.props.closeModal}>
        <View className='closeBtn' onClick={this.props.closeModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader>
        温馨提示
        </AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Text className='hintInfo'>
              {this.props.content}
            </Text>
            <View className='buttonWrap'>
              <View className='modalBtn'>
                <AtButton className='modalConfirmBtn' openType='openSetting' onClick={this.props.closeModal}>去设置</AtButton>
              </View>
            </View>
          </View>
        </AtModalContent>
      </AtModal>
    );
  }
}

export default AuthorityModal;
