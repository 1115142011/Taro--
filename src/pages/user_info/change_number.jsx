import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import { phoneAuthCode, unBindPhone, bindPhoneNumber } from "@/global_api/index";
import { connect } from "@tarojs/redux";
import { SAVE_USER_INFO } from "@/actions/global_actions";
import "./change_number.scss";

@connect(
  ({ globalStore }) => ({
    userInfo: globalStore.userInfo || {}
  }),
  dispatch => ({
    onSaveMsg(data) {
      dispatch(SAVE_USER_INFO(data));
    }
  })
)
class ChangeNumber extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: " ",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      oldPhoneCode: "",
      newPhone: "",
      newSmsCode: "",
      oldCount: 60,
      count: 60
    };
    this._mytimerOld;
    this._mytimerNew;
  }

  changeNumber() {
    const { oldPhoneCode, newPhone, newSmsCode } = this.state;
    if (oldPhoneCode && newPhone && newSmsCode) {
      unBindPhone({ smsCode: oldPhoneCode }).then(res => {
        if (res.code == "000000") {
          const param = {
            smsCode: newSmsCode,
            tel: newPhone,
            unbindToken: res.data.unbindToken
          };
          bindPhoneNumber(param).then(result => {
            if (result.code == "000000") {
              const { data } = result;
              this.props.onSaveMsg(data);
              Taro.showToast({ title: "手机号换绑成功", duration: 3000 });
              setTimeout(() => {
                Taro.navigateBack();
              }, 3000);
            } else {
              Taro.showToast({ title: result.msg, icon: "none" });
            }
          });
        } else {
          Taro.showToast({ title: res.msg, icon: "none" });
        }
      });
    } else {
      Taro.showToast({ title: "请将信息填写完整！", icon: "none" });
    }
  }
  getOldPhoneCode() {
    let param = {
      type: 3,
      tel: this.props.userInfo.tel
    };
    this.timer(this.state.oldCount);
    phoneAuthCode(param)
      .then(res => {
        if (res.code == "000000") {
          Taro.showToast({ title: "验证码已成功发送", icon: "none" });
        }
      })
      .catch(() => {
        if (this._mytimerOld) {
          clearTimeout(this._mytimerOld);
          this.setState({
            oldCount: 60
          });
        }
      });
  }
  getNewPhoneCode() {
    const { newPhone } = this.state;
    if(!newPhone) {
      Taro.showToast({title:'请填写手机号',icon:'none'})
      return
    }
    let param = {
      tel: newPhone,
      type: 4
    };
    this.newTimer(this.state.count);
    phoneAuthCode(param).then(res => {
      if (res.code == "000000") {
        Taro.showToast({ title: "验证码已成功发送", icon: "none" });
      }
    })
    .catch(() => {
      if (this._mytimerNew) {
        clearTimeout(this._mytimerNew);
        this.setState({
          oldCount: 60
        });
      }
    });
  }
  editValue(key, value) {
    this.setState({
      [key]: value
    });
    return value;
  }
  // 老手机验证码倒计时
  timer(value) {
    if (value <= 0) {
      if (this._mytimerOld) clearTimeout(this._mytimerOld);
      this.setState({
        oldCount: 60
      });
      return;
    } else {
      this.setState({
        oldCount: value - 1
      });
      this._mytimerOld = setTimeout(() => {
        this.timer(value - 1);
      }, 1000);
    }
  }
  // 新手机验证码倒计时
  newTimer(value) {
    if (value <= 0) {
      if (this._mytimerNew) clearTimeout(this._mytimerNew);
      this.setState({
        count: 60
      });
      return;
    } else {
      this.setState({
        count: value - 1
      });
      this._mytimerNew = setTimeout(() => {
        this.newTimer(value - 1);
      }, 1000);
    }
  }
  render() {
    const { oldPhoneCode, newPhone, newSmsCode, oldCount, count } = this.state;
    const { tel } = this.props.userInfo;
    return (
      <View>
        {tel && (
          <View className='buttonWrap'>
            <AtForm>
              <AtInput
                title='原手机验证'
                border={false}
                type='phone'
                placeholder={`${tel.substring(0, 3)}**${tel.substring(
                  7,
                  11
                )}的验证码`}
                value={oldPhoneCode}
                onChange={this.editValue.bind(this, "oldPhoneCode")}
              >
                {oldCount >= 60 ? (
                  <AtButton
                    size='small'
                    circle
                    onClick={this.getOldPhoneCode.bind(this)}
                    className='getAuthCode'
                  >
                    获取验证码
                  </AtButton>
                ) : (
                  <AtButton size='small' circle className='hintMsg getAuthCode'>
                    重新获取（{oldCount}）
                  </AtButton>
                )}
              </AtInput>
              <View className='formDivider'></View>

              <AtInput
                title='新手机号码'
                border={false}
                type='phone'
                placeholder='不要输入原手机'
                value={newPhone}
                onChange={this.editValue.bind(this, "newPhone")}
              >
        
                {count >= 60 ? (
                   <AtButton
                     size='small'
                     circle
                     onClick={this.getNewPhoneCode.bind(this)}
                     className='getAuthCode'
                   >
                   获取验证码
                 </AtButton>
                ) : (
                  <AtButton size='small' circle className='hintMsg getAuthCode'>
                    重新获取（{count}）
                  </AtButton>
                )}
              </AtInput>
              <AtInput
                title='新验证码'
                type='password'
                value={newSmsCode}
                placeholder='新手机收到的验证码'
                onChange={this.editValue.bind(this, "newSmsCode")}
              />
            </AtForm>
            <View className='changeNumBtnWrap'>
              <AtButton
                className='userInfoBtn'
                onClick={this.changeNumber.bind(this)}
              >
                换绑手机
              </AtButton>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default ChangeNumber;
