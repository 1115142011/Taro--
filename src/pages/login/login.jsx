import Taro, { Component } from "@tarojs/taro";
import logo from "@/assets/login/window_logo.png";
import welcomeText from "@/assets/login/welcome_text.svg";
import bottomLogo from "@/assets/login/login_bottom_logo.svg";
import alertIcon from "@/assets/login/alert_icon.svg";
import { AtButton, AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import { View, Image, Text } from "@tarojs/components";
import { phoneAuthCode } from "@/global_api/index";
import AuthorityWechatModal from "@/components/common/authority_wechat_modal";
import { SAVE_USER_INFO } from "@/actions/global_actions";
import { decodePhoneNumber, enterInfo } from "./service_api";
import "./login.scss";

@connect(
  ({ globalStore }) => ({
    ...globalStore
  }),
  dispatch => ({
    onSaveMsg(data) {
      dispatch(SAVE_USER_INFO(data));
    }
  })
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.config = {
      // navigationStyle: "custom"
      navigationBarTitleText: " "
    };
    this.state = {
      path: "",
      account: "",
      password: "",
      loading: false,
      hasAuthCode: true,
      disableLogin: true,
      wxMobile: "",
      wxModal: false,
      count: 60,
      requestFlag:null
    };
    this._mytimer;
  }

  componentWillMount() {
    const source =this.$router.params.path
    this.setState(()=>{
      return{
        path: source
      }
    });
    
    if (this.props.userInfo) {
      Taro.switchTab({ url: "/pages/index/index" });
    }
  }
  shouldComponentUpdate(nextProps,nextState) {
    if (nextProps.userInfo&&!nextState.path) {
      Taro.switchTab({ url: "/pages/index/index" });
      return false;
    }
    return true;
  }
  accountChange(value) {
    this.setState({
      account: value,
      hasAuthCode: !(value.length === 11)
    });
    return value;
  }
  passwordChange(value) {
    this.setState({
      password: value,
      disableLogin: !(value.length === 6 && this.state.account.length === 11)
    });
    return value;
  }
  checkedProtocol() {
    Taro.navigateTo({
      url: "/pages/login/agreement"
    });
  }
  getAuthCode() {
    this.timer(this.state.count);
    const param = {
      tel: this.state.account,
      type: 1
    };
    phoneAuthCode(param)
      .then(() => {
        Taro.showToast({
          title: "验证码已发送",
          duration: 2000,
          icon: "none"
        });
      })
      .catch(() => {
        if (this._mytimer) {
          clearTimeout(this._mytimer);
          this.setState({
            count: 60
          });
        }
      });
  }
  // 倒计时
  timer(value) {
    if (value <= 0) {
      if (this._mytimer) clearTimeout(this._mytimer);
      this.setState({
        count: 60
      });
      return;
    } else {
      this.setState({
        count: value - 1
      });
      this._mytimer = setTimeout(() => {
        this.timer(value - 1);
      }, 1000);
    }
  }
  getPhoneNumber(e) {
    this.setState({
      loading: true
    });
    const { encryptedData, iv } = e.detail;
    try {
      if (encryptedData && iv) {
        decodePhoneNumber({ encryptedData, iv }).then(({ data }) => {
          this.setState({
            loading: false,
            wxModal: true,
            wxMobile: data.phoneNumber
          });
        });
      }
    } finally {
      this.setState({
        loading: false
      });
    }
  }
  getWxuserMsg(e) {
    const { disableLogin } = this.state;
    if (disableLogin) {
      Taro.showToast({
        title: "账号或密码不能为空！",
        icon: "none"
      });
      return;
    }
    const { userInfo } = e.detail;
    if (userInfo) {
      const { account, password} = this.state;
      const { nickName, avatarUrl, gender } = userInfo;
      let param = {
        tel: account,
        smsCode: password,
        nickName,
        avatar: avatarUrl,
        sex: gender,
        type: 1
      };
      this.loginFN(param)
    }
  }
  useWxlogin(e) {
    const { userInfo } = e.detail;
    if (userInfo) {
      const { wxMobile } = this.state;
      const { nickName, avatarUrl, gender } = userInfo;
      let param = {
        tel: wxMobile,
        nickName,
        avatar: avatarUrl,
        sex: gender,
        type: 2
      };
      this.loginFN(param)
    }
  }
  closeAuthModal() {
    this.setState({
      wxModal: false
    });
  }
  loginFN(param){
    const {requestFlag,path} = this.state
    if(requestFlag) return
     this.setState(()=>{
       return{
        requestFlag:true
       }
     })
      enterInfo(param).then(( res) => {

        this.setState(()=>{
          return{
            requestFlag:true
           }
        })
        
        if (res.code=='000000') {
          this.props.onSaveMsg(res.data);
          if (path) {
            Taro.redirectTo({ url: path });
          } else {
            Taro.switchTab({ url: "/pages/index/index" });
          }
        }else{
          Taro.showToast({title:res.msg||'登陆失败',icon:'none'})
        }
      })
      .catch(()=>{
        this.setState(()=>{
          return{
            requestFlag:false
           }
        })
      })
    
  }
  render() {
    const { count, hasAuthCode, wxModal } = this.state;
    let windowHeightStyle = `height:${Taro.getSystemInfoSync().windowHeight}px`;
    return (
      <View className='login-wrap' style={windowHeightStyle}>
        <AuthorityWechatModal
          showDialog={wxModal}
          closeModal={this.closeAuthModal.bind(this)}
          getMsg={this.useWxlogin.bind(this)}
        ></AuthorityWechatModal>
        <View className='circle'></View>
        <View className='form-top-circle'></View>
        <Image className='title-pic' src={welcomeText} />
        <Image className='top-logo' src={logo} mode='widthFix' />
        {/* 中间表单 */}
        <View className='content-wrap'>
          <View className='form-box'>
            <View className='form-desc'>
              <Image className='point-icon' src={alertIcon} />
              在租租客请使用签约手机号登录，收益可翻倍！
            </View>
            <View className='login-box'>
              <AtInput
                name='value'
                type='number'
                className='input-box'
                border={false}
                placeholder='手机号'
                maxLength={11}
                required
                value={this.state.account}
                onChange={this.accountChange.bind(this)}
              ></AtInput>
              {count >= 60 ? (
                <AtButton
                  size='small'
                  circle
                  disabled={hasAuthCode}
                  border={false}
                  onClick={this.getAuthCode.bind(this)}
                  className='getAuthCode'
                >
                  获取验证码
                </AtButton>
              ) : (
                <AtButton size='small' circle className='hintMsg getAuthCode'>
                  重新获取（{count}）
                </AtButton>
              )}
              <AtInput
                name='smsCode'
                type='number'
                className='input-box'
                border={false}
                placeholder='验证码'
                maxLength={6}
                required
                value={this.state.password}
                onChange={this.passwordChange.bind(this)}
              />
              <AtButton
                full
                size='small'
                openType='getUserInfo'
                onGetUserInfo={this.getWxuserMsg.bind(this)}
                className='login-btn'
              >
                同意协议并登录
              </AtButton>

              <AtButton
                full
                openType='getPhoneNumber'
                size='small'
                className='wx-login'
                loading={this.state.loading}
                type='primary'
                onGetPhoneNumber={this.getPhoneNumber.bind(this)}
              >
                微信一键登录
              </AtButton>
              <View className='form-hint'>
                为了保障您的个人隐私及其他权益，请点击同意按钮之前认真阅读
                <Text
                  className='protocol-link'
                  onClick={this.checkedProtocol.bind(this)}
                >
                  《像素公寓服务协议》
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* 底部图标 */}
        <View className='center bottom-box'>
          <Image src={bottomLogo} className='bottom-logo' />
        </View>
      </View>
    );
  }
}

export default Login;
