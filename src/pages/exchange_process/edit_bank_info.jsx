import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Input } from "@tarojs/components";
import bankCardImg from "@/assets/common/bank_card.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import InfoListRow from "@/components/common/info_list_row";
import ExchangeStatusModal from "@/components/common/exchange_status_modal";
import { connect } from "@tarojs/redux";
import { AtDivider, AtButton } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import { updateUserInfo } from "@/actions/global_actions";
import { querybankinfo,updateBankinfo,cashRedeem } from "./service_exchange_api";
import "./exchange_info_editor.scss";
// 虚拟商品兑奖页面

@connect(
  ({ globalStore }) => ({
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
      navigationBarTitleText: "确认银行卡信息",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      // 第一次为0，添加银行卡信息页面，填写后为正常提交页面，状态1
      // 在有地址的时候默认为状态1
      infoState: 0,
      modalState:2,
      showExhangeDialog: false,
      bankinfo: {
        bankCardName: "", // 银行卡开户名
        bankCardNumber: "", // 银行卡号
        bankName: "" // 开户网点
      },
      editBank: {
        bankCardName: "",
        bankCardNumber: "",
        bankName: ""
      }
    };
  }
  componentWillMount() {
    this.getBankMsg();
  }
  getBankMsg() {
    querybankinfo().then(({ data }) => {
      if (data.bankCardNumber) {
        this.setState({
          infoState: 1,
          bankinfo: data
        });
      }
    });
  }
  editValue(key, e) {
    let { value } = e.detail;
    if(key === 'bankCardNumber'){
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
    }
    this.setState({
      editBank: {
        ...this.state.editBank,
        [key]: value
      }
    });
    return value;
  }
  submitBankinfo() {
    const { editBank } =this.state
    const {bankCardName,bankCardNumber,bankName} = editBank
    if(bankCardName&&bankCardNumber&&bankName){
      updateBankinfo(editBank).then(()=>{
        this.getBankMsg()
        setTimeout(()=>{
          this.setState({
            infoState:1
          })
        },1000)
      })
    }else{
      Taro.showToast({title:'请将银行卡信息填写完整',icon:'none'})
    }
  }
  changeEditStatus(){
    this.setState({
      infoState:0
    })
  }
  submitConvert(){
    const param={
      itemCount:this.props.goods.number,
      itemId:this.props.goods.type.itemId,
      tel:this.props.userInfo.tel
    }
    cashRedeem(param).then((res)=>{
      if(res.code=='000000'){
        this.setState({
          showExhangeDialog: true,
          modalState:2
        });
      }else if(res.code == '300003'){
      
        this.setState({
          showExhangeDialog: true,
          modalState:0
        });
      }
     
        this.props.onUpdateMsg();
    
    })
  }
  closeExhangeDialog(){
    this.setState({
      showExhangeDialog:false
    })
  }
  render() {
    const { bankinfo, editBank,modalState } = this.state;
    const { userInfo, goods } = this.props;
    return (
      <View>
        {/* 单独封装了三个状态的ExchangeModal */}
        <ExchangeStatusModal
          modalState={modalState}
          showDialog={this.state.showExhangeDialog}
          clearModal={this.closeExhangeDialog.bind(this)}
        ></ExchangeStatusModal>
        <View className='contentWrap' hidden={this.state.infoState != 0}>
          <FissionBanner type='narrow'></FissionBanner>
          <View className='whiteBoard infoInputWrap'>
            <View className='inputWrap'>
              <Input
                type='number'
                onInput={this.editValue.bind(this, "bankCardNumber")}
                value={editBank.bankCardNumber}
                placeholder='银行卡号'
                className='inputComponent'
              ></Input>
            </View>
            <View className='inputWrap'>
              <Input
                type='text'
                onInput={this.editValue.bind(this, "bankName")}
                value={editBank.bankName}
                placeholder='开户行'
                className='inputComponent'
              ></Input>
            </View>
            <View className='inputWrap'>
              <Input
                type='text'
                onInput={this.editValue.bind(this, "bankCardName")}
                value={editBank.bankCardName}
                placeholder='银行卡开户名'
                className='inputComponent'
              ></Input>
            </View>
            <View className='buttonWrap'>
              <AtButton
                className='modalConfirmBtn'
                onClick={this.submitBankinfo.bind(this)}
              >
                确认提交
              </AtButton>
            </View>
          </View>
        </View>
        <View className='contentWrap' hidden={this.state.infoState != 1}>
          <View className='whiteBoard infoContainer'>
            <View className='addressWrap' onClick={this.changeEditStatus.bind(this)}>
              <View className='locationWrap'>
                <Image src={bankCardImg} className='locationImg'></Image>
              </View>
              <View className='addressInfo'>
                <View className='firstLine'>
                  <Text className='name'>{bankinfo.bankName}</Text>
                </View>
                <View className='address'>{bankinfo.bankCardNumber}</View>
              </View>
              <View className='arrowWrap'>
                <Image
                  src={RightArrowOrangeImg}
                  className='rightArrowOrangeImg'
                ></Image>
              </View>
            </View>
            <View className='bankInfo'>
              <Text>{bankinfo.bankCardName}</Text>
              <Text>{userInfo.tel}</Text>
              <Text>{bankinfo.bankName}</Text>
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
                paraValue='提现打款到银行卡'
              ></InfoListRow>
              <AtDivider height='60' lineColor='#E1E1E1'></AtDivider>
            </View>
            <View className='buttonWrap'>
              <AtButton className='modalConfirmBtn' onClick={this.submitConvert.bind(this)}>
                确认提交
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default EditAddress;
