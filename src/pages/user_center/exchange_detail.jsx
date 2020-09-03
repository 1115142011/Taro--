import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import GoodsUnitRow from "@/components/sugarcube_store/goods_unit_row";
import ParaDisplay from "@/components/common/para_display";
import { queryRedeemDetails } from "./user_service_api";
import "./exchange_detail.scss";

class ExchangeDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "兑换详情",
      navigationBarBackgroundColor: "#eeeeee"
    };
    this.state = {
      detailsData:{}
    };
  }
  componentWillMount() {
    const param={
      redeemId:this.$router.params.goodsId
    }
    queryRedeemDetails(param).then(({data})=>{
      this.setState({
        detailsData:data
      })
    })
  }

  render() {
    const {detailsData } = this.state
    const {item} = this.state.detailsData
  
    return (
     <View>
       {
         item&&<View className='contentWrap'>
         <View className='whiteBoard'>
           <GoodsUnitRow
             noBorderBottom
             imgSrc={item.image}
             goodsID={item.itemId}
             goodsType={item.type}
             goodsName={item.name}
             goodsValue={`价值 ${item.price} 元`}
             goodsPrice={item.redeemPrice}
             showExchangeBtn={false}
           ></GoodsUnitRow>
         </View>
         <View className='paraWrap'>
           <ParaDisplay
             title='奖品介绍'
             content={item.content}
           ></ParaDisplay>
         </View>
         <View className='paraWrap'>
           <ParaDisplay
             title='兑换时间'
             content={detailsData.createTime}
           ></ParaDisplay>
         </View>
         <View className='paraWrap'>
           <ParaDisplay title='兑换数量' content={detailsData.itemCount}></ParaDisplay>
         </View>
         <View className='paraWrap'>
           <ParaDisplay title='兑换状态' content={detailsData.sendStatus===1?'待发货':detailsData.sendStatus===2?'已发货':'发货失败'}></ParaDisplay>
         </View>
         <View className='paraWrap'>
           <ParaDisplay
             title='兑换说明'
             content={
               `1.兑换成功后，可在“我的兑换”中查看\n2.此奖品每兑换1件将消耗${item.redeemPrice}方糖，兑换成功后方糖不予退还；\n3.此奖品默认申请兑换后7天发货，有任何疑问，欢迎致电客服热线 400 806 3399 （服务时间为每天：08:30-17:45）`
             }
           ></ParaDisplay>
         </View>
       </View>
       }
       {
         !item&&<View>数据加载中</View>
       }
     </View>
     
    );
  }
}

export default ExchangeDetail;
