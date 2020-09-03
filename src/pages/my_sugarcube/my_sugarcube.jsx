import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import FissionBanner from "@/components/fission/fission_banner";
import CubeIconImg from "@/assets/common/cube_icon.svg";
import RightArrowImg from "@/assets/common/right_arrow.svg";
import RightArrowOrangeImg from "@/assets/common/right_arrow_orange.svg";
import CommonUtils from "@/utils/common_utils";
import { connect } from "@tarojs/redux";
import muscleImg from "@/assets/common/muscle.svg";
import noOutcomeImg from "@/assets/common/no_outcome.svg";
import queryScoreDetails from "./my_sugarcube_api";
import "./my_sugarcube.scss";

@connect(({ globalStore }) => ({
  ...globalStore
}))
class MySugarcube extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "我的方糖",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee",
      // navigationStyle:"custom"
    };

    this.state = {
      type: 0,
      incomeList:[],// 收入
      expendList:[] // 支出
    };
  }
  componentWillMount() {
    this.queryData(1);
    this.queryData(2);
  }
  gotoSugarcubeStore = () => {
    Taro.navigateTo({
      url: "/pages/sugarcube_store/sugarcube_store_waterfall"
    });
  };

  gotoSugarcubeRules = () => {
    Taro.navigateTo({ url: "/pages/my_sugarcube/sugarcube_rules" });
  };

  handleTabClick = value => {
    this.setState({
      type:value
    })
  };
  queryData(type) {
    queryScoreDetails({ type: type, pageNo: 1, pageSize:100 }).then(
      ({ data }) => {
        if(type===1){// 收入
          this.setState({
            incomeList: data.list,
           
          });
        }else{// 支出
          this.setState({
            expendList: data.list,
          });
        }
      
      }
    );
  }

  // 适配包裹高度及列表高度的方法,通过系统windowheight计算包裹页面元素的wrap高度和明细列表高度，动态适配
  render() {
    const tabList = [{ title: "收入" }, { title: "支出" }];
    // CommonUtils.getInstance().formatHeight(列表上方的占用高度，需要根据不同页面进行有效适配)
    let [wrapHeight, listHeight] = CommonUtils.getInstance().formatHeight(312);
    const { incomeList,expendList } = this.state;
    return (
      // 最大的包裹，通过屏幕高度适配列表高度
      <View className='mySugarcubeWrap' style={wrapHeight}>
        <View className='fissionBannerContainer'>
          <FissionBanner type='narrow'></FissionBanner>
        </View>
        <View className='sugarcubeBalanceWrap'>
          <View
            className='sugarcubeRulesLink'
            onClick={this.gotoSugarcubeRules}
          >
            方糖规则
            <Image src={RightArrowImg} className='rightArrowImg'></Image>
          </View>
          <View className='balanceTitle'>
            当前拥有方糖
            <Image src={CubeIconImg} className='cubeIconImg'></Image>
          </View>
          {this.props.userInfo && (
            <View className='sugarcubeBalanceValue'>
              {this.props.userInfo.score}
            </View>
          )}

          <View
            className='sugarcubeStoreLink'
            onClick={this.gotoSugarcubeStore}
          >
            方糖商城
            <Image
              src={RightArrowOrangeImg}
              className='rightArrowOrangeImg'
            ></Image>
          </View>
        </View>
        <View className='balanceDetail'>
          <View className='balanceDetailHeader'>
            <View className='detailHeaderTitle'>方糖明细</View>
          </View>
          {expendList.length===0 &&incomeList.length===0&&(
            <View className='detailBlankContainer'>
              <Image src={muscleImg} className='defaultImg'></Image>
              <Text className='defaultInfo'>您暂时还没有方糖，继续加油咯~</Text>
            </View>
          )}
          {(expendList.length>0 ||incomeList.length>0) && (
            <AtTabs
              current={this.state.type}
              tabList={tabList}
              onClick={this.handleTabClick}
            >
              <AtTabsPane
                current={this.state.type}
                index={0}
                sytle='display:flex'
              >
                {/* 需要通过listHeight动态匹配屏幕高度适配列表高度  */}
                <View className='tabDetailListWrap' style={listHeight}>
                  {incomeList.map(item => (
                    <View
                      key={item.id}
                      className='tabDetailListUnit incomeListUnit'
                    >
                      <View className='detailInfoWrap'>
                        <View className='detailInfo'>{item.title}</View>
                        <View className='detailTime'>{item.createTime}</View>
                      </View>
                      <View className='detailBalanceChange'>+{item.score}</View>
                    </View>
                  ))}
                </View>
              </AtTabsPane>


              <AtTabsPane current={this.state.type} index={1}>
                <View className='tabDetailListWrap' style={listHeight}>
                  {(expendList.length>0 ||incomeList.length>0)&&(
                           expendList.map(item => (
                            <View
                              key={item.id}
                              className='tabDetailListUnit outcomeListUnit'
                            >
                              <View className='detailInfoWrap'>
                                <View className='detailInfo'>{item.title}</View>
                                <View className='detailTime'>{item.createTime}</View>
                              </View>
                              <View className='detailBalanceChange'>
                                -{item.score}
                              </View>
                            </View>
                          ))
                  )}
  
                  {expendList.length === 0 && (
                    <View className='detailBlankContainer'>
                      <Image src={noOutcomeImg} className='defaultImg'></Image>
                      <Text className='defaultInfo'>您还没有支出哦~</Text>
                    </View>
                  )}
                </View>
              </AtTabsPane>
            </AtTabs>
          )}
        </View>
      </View>
    );
  }
}

export default MySugarcube;
