import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Picker } from "@tarojs/components";
import { AtIcon, AtModal, AtModalHeader, AtModalContent } from "taro-ui";
import buterDialog from "@/assets/user_center/butler_dialog.svg";
import { queryHousekeeper } from "@/global_api/index";
import AuthorityModal from "@/components/common/authority_modal";

import "./butler_modal.scss";

class ButlerModal extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#eeeeee"
    };
    this.state = {
      currentIndex: 0,
      AuthModal: false,
      addressSelectorChecked: {},
      stewardList: []
    };
  }
  componentWillMount() {
    this.queryListData();
  }
  onAddressChange = e => {
    this.setState({
      addressSelectorChecked: this.state.stewardList[e.detail.value],
      currentIndex: Number(e.detail.value)
    });
  };
  queryListData() {
    queryHousekeeper().then(({ data }) => {
      this.setState({
        stewardList: data,
        currentIndex: 0,
        addressSelectorChecked: data[0]
      });
    });
  }
  saveImage(imagePath) {
    const _this = this;
    Taro.authorize({
      scope: "scope.writePhotosAlbum",
      success() {
        Taro.downloadFile({
          url: imagePath,
          success: function(res) {
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                Taro.showToast({
                  title: "保存成功",
                  icon: "success",
                  duration: 2000
                });
              },
              fail: function() {
                Taro.showToast({
                  title: "图片保存失败",
                  icon: "none",
                  duration: 2000
                });
              }
            });
          }
        });
      },
      fail: function() {
        _this.setState({
          AuthModal: true
        });
      }
    });
  }
  closeAuthModal() {
    this.setState({
      AuthModal: false
    });
  }
  render() {
    const {
      stewardList,
      addressSelectorChecked,
      currentIndex,
      AuthModal
    } = this.state;
    const { clearModal, showDialog } = this.props;
    return (
      <AtModal isOpened={showDialog} closeOnClickOverlay={false}>
        <View className='closeBtn' onClick={clearModal}>
          <AtIcon value='close' size='14' color='#000'></AtIcon>
        </View>
        <AtModalHeader> 联系管家</AtModalHeader>
        <AtModalContent>
          <View className='modalContentWrap'>
            <Image src={buterDialog} className='butlerDialogImg'></Image>
            {/*  */}
            {stewardList.length === 1 && (
              <View className='address'>
                {addressSelectorChecked.houseName}
              </View>
            )}
            {stewardList.length > 1 && (
              <Picker
                mode='selector'
                rangeKey='houseName'
                value={currentIndex}
                range={stewardList}
                onChange={this.onAddressChange}
              >
                <View className='addressPicker'>
                  <View className='addressContent'>
                    {addressSelectorChecked.houseName}
                  </View>
                  <View className='toggleDown'>
                    <AtIcon
                      value='chevron-down'
                      size='14'
                      color='#9E9E9E'
                    ></AtIcon>
                  </View>
                </View>
              </Picker>
            )}

            <Image
              src={addressSelectorChecked.houseKeeperQrcode}
              className='butlerQR'
              onLongPress={this.saveImage.bind(
                this,
                addressSelectorChecked.houseKeeperQrcode
              )}
            />
            <Text className='hintInfo'>长按保存图片\n您的管家微信二维码</Text>
          </View>
        </AtModalContent>
        <AuthorityModal
          showDialog={AuthModal}
          closeModal={this.closeAuthModal.bind(this)}
          content='需要使用保存到相册权限'
        ></AuthorityModal>
      </AtModal>
    );
  }
}

export default ButlerModal;
