import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm, AtRadio } from "taro-ui";
import { customAuth } from "@/global_api/index";
import { connect } from "@tarojs/redux";
import { SAVE_USER_INFO } from "@/actions/global_actions";
// import "../change_number.scss";
import "./user_authentication.scss";

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
      navigationBarBackgroundColor: "#fdd835",
      navigationBarTitleText: "租客认证"
    };

    this.state = {
      idCard: "",
      againIdCard: "",
      submitActive: false,
      certType: 0
    };
    this._mytimerOld;
    this._mytimerNew;
  }
  //  输入
  editValue(key, value) {
    this.setState({
      [key]: value
    });
    return value;
  }
  //  单选
  certTypeChange(value) {
    this.setState({
      certType: value
    });
  }
  // 验证身份证号
  validateIdcard(value) {
    return !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
  }
  // 提交
  submitIdCard() {
    const { certType, idCard, submitActive, againIdCard } = this.state;
    if (submitActive) return;
    if (this.validateIdcard(idCard) || this.validateIdcard(againIdCard)) {
      Taro.showToast({ title: "证件号码格式错误，请确认", icon: "none" });
      return;
    } else if (idCard != againIdCard) {
      Taro.showToast({ title: "两次输入不一致，请确认", icon: "none" });
      return;
    }
    this.setState({
      submitActive: true
    });
    customAuth({ certNum: idCard, certType }).then(res => {
      this.setState({
        submitActive: false
      });
      if (res.code == "000000") {
        Taro.navigateToMiniProgram({
          appId: "wxa1439f77c6d06a15",
          path: "pages/result-loading/result-loading?verifyUrl=" + res.data,
          envVersion: "release",
          success(result) {
            console.log("跳转成功", result);
            // 打开成功
          },
          fail: function() {
            Taro.showToast({ title: "服务器忙，请稍后再试" });
          }
        });
      } else {
        Taro.showToast({ title: "服务器忙，请稍后再试" });
      }
    })
    .catch(()=>{
      this.setState({
        submitActive: false
      });
    })
  }
  render() {
    const { certType, againIdCard, submitActive } = this.state;
    const { tel } = this.props.userInfo;
    return (
      <View>
        {tel && (
          <View className='pageWrap'>
            <AtForm className='form-box'>
              <View className='hint-title'>证件类型</View>
              <AtRadio
                options={[
                  { label: "居民身份证", value: 0 },
                  { label: "其它证件类型", value: 1 }
                ]}
                value={certType}
                onClick={this.certTypeChange.bind(this)}
              />
              <AtInput
                title='证件号码'
                border={false}
                type='idcard'
                placeholder='证件号码'
                value={this.state.idCard}
                onChange={this.editValue.bind(this, "idCard")}
              ></AtInput>

              <AtInput
                title='再次确认'
                border={false}
                type='idcard'
                placeholder='再次输入证件号码'
                value={againIdCard}
                onChange={this.editValue.bind(this, "againIdCard")}
              ></AtInput>
            </AtForm>
            <View className='formDivider'></View>
            <View className='changeNumBtnWrap'>
              <AtButton
                className='userInfoBtn'
                onClick={this.submitIdCard.bind(this)}
                loading={submitActive}
              >
                开始认证
              </AtButton>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default ChangeNumber;
