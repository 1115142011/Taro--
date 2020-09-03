import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInputNumber } from "taro-ui";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";

import ParaDisplay from "@/components/common/para_display";
import ExchangeRulesLink from "@/components/common/exchange_rules_link"
import ExchangeStartModal from "@/components/common/exchange_start_modal"
import { connect } from "@tarojs/redux";
import { catchDoods,exchangeNumber } from "@/actions/global_actions";
import "./confirm_exchange.scss";
import  {queryGiftDetails} from "./service_exchange_api";

@connect( () => ({}),
  dispatch=>({
  onSaveGoodMsg(data){
    dispatch(catchDoods(data))
  },
  onSaveGoodsNumber(data){
    dispatch(exchangeNumber(data))
  }
}))
class ConfirmExchange extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "兑换奖品",
      navigationBarBackgroundColor: "#eeeeee"
    };

    this.state = {
      value: 1,
      detailsData:{},
      showStartDialog:false
    };
  }
  componentWillMount(){
    const goodsId = this.$router.params.goodsID
    this.queryData(goodsId)
  }
  queryData(id){
    const param={
      itemId:id
    }
    queryGiftDetails(param).then(({data})=>{
      this.setState({
        detailsData:data
      })
      this.props.onSaveGoodMsg(data)
    })
  }
  handleChange = value => {
    this.setState({
      value,
      showStartDialog:false
    });
    this.props.onSaveGoodsNumber(value)
  };

  showStartModal=()=>{
    if(this.state.value===0){
      Taro.showToast({title:'请选择兑换数量！',icon:'none'})
      return
    }
    this.setState({
      showStartDialog:true
    })
  }


  render() {
    const {detailsData} = this.state
    return (
     <View>
      {
        detailsData&& <View className='contentWrap'>
        <ExchangeStartModal modalState={false} showDialog={this.state.showStartDialog}></ExchangeStartModal>
        <View className='whiteBoard'>
          <GoodsUnitRow
            noBorderBottom
            imgSrc={detailsData.image}
            goodsID={detailsData.itemId}
            goodsType={detailsData.type}
            goodsName={detailsData.name}
            goodsValue={`价值 ${detailsData.price} 元`}
            goodsPrice={detailsData.redeemPrice}
            showExchangeBtn={false}
            isLink
          ></GoodsUnitRow>
        </View>
        <ExchangeRulesLink></ExchangeRulesLink>
        <View className='paraWrap'>
          <ParaDisplay
            title='奖品介绍'
            content={detailsData.content}
          ></ParaDisplay>
        </View>
        <View className='paraWrap'>
          <ParaDisplay
            title='兑换说明'
            content={
              `1.兑换成功后，可在“我的兑换”中查看\n2.此商品每兑换1件将消耗 ${detailsData.redeemPrice} 方糖，兑换成功后方糖不予退还;\n有任何疑问，欢迎致电客服热线 400 806 3399 （服务时间为每天：08:30-17:45）`
            }
          ></ParaDisplay>
        </View>
        <View className='bottomWrap'>
          <View className='exchangeNumber'>
            <View>兑换数量</View>
            <AtInputNumber
              min={0}
              max={10}
              step={1}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </View>
          <View className='confirmExchangeBtnWrap'>
            <AtButton   className='confirmExchangeBtn' full onClick={this.showStartModal}>
              立即兑换
            </AtButton>
          </View>
        </View>
      </View>
      }
     </View>
    );
  }
}

export default ConfirmExchange;
