import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import rightArrowImg from "@/assets/common/right_arrow.svg";
import SugarcubeBtn from "@/components/sugarcube_store/sugarcube_btn";
import ExchangeRulesLink from "@/components/common/exchange_rules_link";
import { AtActivityIndicator } from "taro-ui";
import { connect } from "@tarojs/redux";
import "./goods_container.scss";
import GoodsUnitRow from "./goods_unit_row";
import GoodsUnitGrid from "./goods_unit_grid";
/*
    功能：
    方糖商城的商品列表模块。

    属性定义：
    containerTitle: 模块标题
    showSugarcubeBtn: 是否展示我的方糖按钮，跳转进入“我的方糖”页;
    showViewMoreLink: 是否展示查看更多连接，跳转进入“方糖商城”瀑布列表页。
    type='list': 商品以列表方式显示
    type='waterfall'商品以瀑布页方式显示
    dataList 数据列表 [] 
  */
@connect(({ globalStore }) => ({
  ...globalStore
}))
class GoodsContainer extends Component {
  gotoSugarcubeStore = () => {
    if (this.props.showViewMoreLink) {
      Taro.navigateTo({
        url: "/pages/sugarcube_store/sugarcube_store_waterfall"
      });
    }
  };
  render() {
    const { dataList = [], unitType } = this.props;
    return (
      <View className='goodsContainer'>
        <View className='shopListHeader' onClick={this.gotoSugarcubeStore}>
          <View className='listHeaderTitle'>{this.props.containerTitle}</View>
          <View className='listHeaderFunctionWrap'>
            <View hidden={!this.props.showSugarcubeBtn}>
              {this.props.userInfo && (
                <SugarcubeBtn number={this.props.userInfo.score}></SugarcubeBtn>
              )}
            </View>
            <View hidden={!this.props.showViewMoreLink}>
              <View className='viewMoreLink'>
                查看更多
                <Image
                  lazyLoad
                  src={rightArrowImg}
                  className='rightArrow'
                ></Image>
              </View>
            </View>
          </View>
        </View>
        {unitType === "list" &&
          //通过一个const数组直接循环显示列表，noBorderBottom进行末尾边界样式处理
          dataList.map((item, index) => (
            <GoodsUnitRow
              key={item.itemId}
              noBorderBottom={index === dataList.length - 1}
              imgSrc={item.image}
              goodsID={item.itemId}
              goodsType={item.type}
              goodsName={item.name}
              goodsValue={`价值 ${item.price} 元`}
              goodsPrice={item.redeemPrice}
              showExchangeBtn
            ></GoodsUnitRow>
          ))}

        {unitType === "waterfall" && (
          <View>
            <ExchangeRulesLink></ExchangeRulesLink>
            <View className='waterfallWrap'>
              <View className='waterfallColumn' id='leftCloumn'>
                {dataList.map((item, i) => {
                  if (i % 2 != 0) {
                    return (
                      <GoodsUnitGrid
                        key={item.itemId + "1"}
                        imgSrc={item.image}
                        goodsID={item.itemId}
                        goodsType={item.type}
                        goodsName={item.name}
                        goodsValue={`价值 ${item.price} 元`}
                        goodsPrice={item.redeemPrice}
                      ></GoodsUnitGrid>
                    );
                  }
                })}
              </View>
              <View className='waterfallColumn' id='rightColumn'>
                {dataList.map((item, i) => {
                  if (i % 2 === 0) {
                    return (
                      <GoodsUnitGrid
                        key={item.itemId + "2"}
                        imgSrc={item.image}
                        goodsID={item.itemId}
                        goodsType={item.type}
                        goodsName={item.name}
                        goodsValue={`价值 ${item.price} 元`}
                        goodsPrice={item.redeemPrice}
                      ></GoodsUnitGrid>
                    );
                  }
                })}
              </View>
            </View>
            <View className='loadMoreBox'>
              {this.props.isAll && !this.props.isLoading && (
                <View className='noMore'>没有更多了~</View>
              )}
              <AtActivityIndicator
                isOpened={this.props.isLoading}
                mode='center'
                content='加载中...'
              ></AtActivityIndicator>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default GoodsContainer;
