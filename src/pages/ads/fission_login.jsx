import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bgCircle from "@/assets/ads/bg_circle.svg";
import { AtAvatar, AtButton, AtDivider } from "taro-ui";
import { connect } from "@tarojs/redux";
import FissionLoginModal from "@/components/common/fission_login_modal";
import { phoneAuthCode} from "@/global_api/index";
import { SAVE_USER_INFO } from "@/actions/global_actions";
import { acceptInvite, queryRoomList,getReferrerByMobile } from "./ads_service_api";

import "./fission_login.scss";

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
class FissionLogin extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "邀好友住像素",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#fdd835",
    };
    this.state = {
      tel: "",
      smsCode: "",
      inviteAvatar: "",
      name: "",
      resultModal: false,
      count: 60,
      modalState: 0, // 1更换 0 绑定 3 推荐人是自己 4 推荐人重复绑定 2已签约无法绑定
      currentRecommendTel: '', // 推荐人code
      currentRecommendCode:'',// 推荐人 tel
      prevRecommendName:'',// 上一个推荐人
      rooms: [],
      currentUser:{}// 当前用户信息
    };
    this._mytimer;
    this._userMsgLoad=false
  }
  componentWillMount() {
    const { header, code, name,tel } = this.$router.params;
    this.setState({
      currentRecommendCode: code,
      inviteAvatar: header,
      name: name,
      currentRecommendTel:tel
    });
    this.queryHouse();
  }
  getAuthCode = () => {
    if (!this.state.tel) {
      Taro.showToast({
        title: "请先填写手机号",
        icon: "none"
      });
      return;
    }
    const param = {
      tel: this.state.tel,
      type: 2
    };
    this.timer(this.state.count);
    phoneAuthCode(param)
      .then(() => {
        Taro.showToast({
          title: "验证码已发送",
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
  };
  tleChange = e => {
    const { value } = e.detail;
    this.setState(()=>{
      return{
        tel: value
      }
    });
    return value;
  };
  codeChange = e => {
    const { value } = e.detail;
    this.setState({
      smsCode: value
    });
    return value;
  };
  getWxuserMsg = e => {
    const { tel, smsCode, currentRecommendCode } = this.state;
    if (!tel || !smsCode) {
      Taro.showToast({
        title: "账号或密码不能为空！",
        icon: "none"
      });
      return;
    }
    const { userInfo } = e.detail;
    if (userInfo) {
      const { nickName, avatarUrl, gender} = userInfo;
      let param = {
        referrer: currentRecommendCode, // 推荐人编码
        tel: tel, // 电话号码
        smsCode: smsCode, // 验证码
        nickName: nickName, //微信昵称
        avatar: avatarUrl, // 微信头像
        sex: gender //性别
      };
      this.queryUserMsg(tel,param)
    }else{
      Taro.showToast({title:'获取用户信息失败，请稍后再试'})
    }
  };
  // 绑定邀请人
  bindInvitation(param){
    acceptInvite(param).then(res => {
      if (res.code == "000000") {
        this.setState({
          resultModal: true,
          modalState: 0
        });
      } else if (res.code == "000001") {
        Taro.showToast({
          title: "更换绑定人成功即将跳转用户中心...",
          icon: "none",
          duration: 2800
        });
        setTimeout(() => {
          Taro.switchTab({ url: "/pages/index/index" });
        }, 3000);
      } else if (res.code == "300005") {
        this.setState({
          resultModal: true,
          modalState: 2
        });
      } else {
        Taro.showToast({ title: res.msg, icon: "none" });
      }
      if(res.data){
        this.props.onSaveMsg(res.data);
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
  toHomeList() {
    Taro.switchTab({ url: "/pages/apartment_list/apartment_list" });
  }
  // 查询旧推荐人信息
  queryUserMsg(phoneNumber,nextParam) {
    const param = {
      tel: phoneNumber
    };
    getReferrerByMobile(param).then(result => {
        if(result.code=='000000'){ 
          const {referrerCode,signFlag,referrerName} = result.data
          const {currentRecommendCode,currentRecommendTel} = this.state // 当前邀请人code tel
          if(signFlag===1){ // 当前用户已签约
            this.setState({
              resultModal: true,
              modalState: 2
            });
          }else{// 当前用户未签约
                if(referrerCode){// 有邀请人
                    if(currentRecommendCode===referrerCode){ // 重复邀请
                      this.setState({
                        prevRecommendName:referrerName,
                        resultModal: true,
                        modalState: 4,
                      });
                    }else{ // 更换绑定 
                      this.setState({
                        prevRecommendName:referrerName,
                        resultModal: true,
                        modalState: 1,
                        currentUser:nextParam
                      });
                    }
                }else{ // 当前用户没有接受过邀请
                  if(currentRecommendTel==phoneNumber){// 当前邀请人是自己
                    this.setState({
                      prevRecommendName:referrerName,
                      resultModal: true,
                      modalState: 3,
                    });
                  }else{
                    this.bindInvitation(nextParam)
                  }
                }
          }
        }else{
          Taro.showToast({title:result.msg,icon:'none'})
        }
    
    })
  }
  // 查询房源列表
  queryHouse() {
    const params = {
      query_term: undefined, // 收索关键词参数
      district_id: undefined, // 行政区id
      pid: undefined, // 片区id
      community_id: undefined, // 小区id
      rent_mode: -1, // 整租/分租，
      room_num: undefined,
      page_size: 10,
      min_rent: -1,
      max_rent: -1
    };
    queryRoomList(params).then(res => {
      this.setState({
        rooms: res.rooms.slice(0,5)
      });
    });
  }
  affirmChange(){
    const param = this.state.currentUser
    this.bindInvitation(param)
  }
  closeResultModal(){
    this.setState({
      resultModal:false,
    })
  }
  render() {
    const {
      tel,
      smsCode,
      inviteAvatar,
      name,
      resultModal,
      modalState,
      rooms,
      prevRecommendName,
      count
    } = this.state;
    return (
      <View className='page-wrap' style={`height:${Taro.getSystemInfoSync().windowHeight}`}>
        <FissionLoginModal
          name={name}
          replaceName={prevRecommendName}
          modalState={modalState}
          showDialog={resultModal}
          changeUser={this.affirmChange.bind(this)}
          clear={this.closeResultModal.bind(this)}
        ></FissionLoginModal>
        <View className='top-content '>
          <Image className='top-bg-pic' src={bgCircle} />
          <View className='avatar-wrap'>
            <AtAvatar
              size='large'
              circle
              image={inviteAvatar}
              className='avatar-img'
            ></AtAvatar>
            <Text className='top-text'>您的好友{name}\n邀请您入住像素公寓</Text>
          </View>
        </View>
        <View className='top-bg-box'></View>
        <View className='form-content'>
          <View className='login-component-wrap'>
            <Input
              name='phone'
              type='number'
              value={tel}
              placeholder='请输入手机号'
              onInput={this.tleChange}
              maxLength={11}
              className='login-input'
            />
          </View>
          <View className='login-component-wrap'>
            <Input
              value={smsCode}
              name='phone'
              type='number'
              onInput={this.codeChange}
              maxLength={6}
              placeholder='请输入验证码'
              className='login-input'
            />
            {count >= 60 ? (
              <AtButton
                size='small'
                circle
                className='getAuthCode'
                onClick={this.getAuthCode}
              >
                获取验证码
              </AtButton>
            ) : (
              <AtButton size='small' circle className='hintMsg getAuthCode'>
                重新获取（{count}）
              </AtButton>
            )}
          </View>
          <View className='login-component-wrap'>
            <AtButton
              openType='getUserInfo'
              onGetUserInfo={this.getWxuserMsg}
              className='accept-btn'
            >
              接受邀请
            </AtButton>
          </View>
        </View>
        <View className='detail-content'>
          <View className='detail-wrap'>
            <AtDivider
              content='活动细则'
              fontColor='#ff9900'
              lineColor='#FDC42A'
            />
            <Text>
              1、您的好友正在邀请您入住像素公寓，通过上方邀请功能使用您的手机并完成验证即可与您的好友完成好友绑定关系；\n
              2、绑定成功后若您在活动有效期内成功完成签约（租期大于6个月），则您的好友将获得相应奖励；\n
              注：活动期间内您可以更换绑定人，但一次只能与一名好友进行绑定。
            </Text>
          </View>
        </View>
        <View className='apartment-content' style={`height:${Taro.getSystemInfoSync().windowHeight-400}px`}>
          <View className='divider-wrap'>
            <AtDivider
              content='优质房源'
              fontColor='#ff9900'
              lineColor='#FDC42A'
            />
          </View>
          <View className='apartment-links'>
            {rooms.map((item) => {
              return (
                <View
                  className='apartment-link'
                  key={item.room_id}
                  onClick={this.toHomeList.bind(this)}
                >
                  <Image
                    className='apartment-img'
                    src={item.image}
                    mode='aspectFill'
                  ></Image>
                  <View className='apartment-info'>
                    <View className='apartment-address'>{item.full_name}</View>
                    <View className='apartment-props'>
                      {item.house_info.community.district.name +
                        " " +
                        item.house_info.community.area_name}
                      |{item.area < 8 ? 8 : item.area}㎡|
                      {item.house_info.layout}
                    </View>
                    <View className='apartment-price'>￥{item.sale_price}元/月</View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default FissionLogin;
