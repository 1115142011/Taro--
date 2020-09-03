import Taro, { Component } from "@tarojs/taro";
import { Swiper, SwiperItem, View, Image, Text } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import { connect } from "@tarojs/redux";
import "./house_setting.scss";

@connect(({ houseStore }) => ({
  ...houseStore
}))
class SettingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      tabIndex: 0
    };
    this.config = {
      navigationBarBackgroundColor: "#313030",
      navigationBarTextStyle: "white",
      navigationBarTitleText: "房源配置",
      
    };
  }
  componentWillMount() {
    const { index, tab } = this.$router.params;
    this.setState(() => {
      return {
        currentIndex: +index,
        tabIndex: +tab
      };
    });
  }
  tabIndexChange(value) {
    const { constrolList } = this.props;
    this.setState(() => {
      return {
        tabIndex: value,
        currentIndex: constrolList[value].min
      };
    });
  }
  swperChange(e) {
    const { current } = e.detail;
    const { constrolList } = this.props;
    let currentTab = current;
    for (let i = 0; i < constrolList.length; i++) {
      if (current >= constrolList[i].min && current <= constrolList[i].max) {
        currentTab = i;
        break;
      }
    }
    this.setState(() => {
      return {
        tabIndex: currentTab,
        currentIndex: current
      };
    });
  }
  render() {
    const { constrolList = [], swperLis = [] } = this.props;
    const { currentIndex, tabIndex } = this.state;
    const footerList = [
      { title: "空调", number: 1 },
      { title: "书桌xxx", number: 1 },
      { title: "沙x发", number: 1 },
      { title: "茶x几", number: 1 },
      { title: "铁x锅", number: 1 },
      { title: "床", number: 1 },
      { title: "空调", number: 1 }
    ];
    return (
      <View className='houseSettingPage'>
        <View className='topBox'>
          <AtTabs
            current={tabIndex}
            tabList={constrolList}
            onClick={this.tabIndexChange.bind(this)}
            scroll
          ></AtTabs>
        </View>
        <View className='contentBox'>
          <Swiper
            className='previewImageBox'
            circular
            current={currentIndex}
            onChange={this.swperChange.bind(this)}
          >
            {swperLis.map((value, index) => {
              return (
                <SwiperItem className='swperItem' key={index + "index"}>
                  <Image
                    mode='aspectFit'
                    src={value.url}
                    style='width:100%;height:100%'
                  />
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        <View className='footerBox'>
          <View className='houseDsc'>
            <View className='descRow'>
              <Text>楼层：22/33</Text>
              <Text>居室：3室2厅1卫</Text>
              <Text>朝向：朝南</Text>
            </View>
            <View className='descRow'>
              <Text>居室：3室2厅1卫</Text>
              <Text>朝向：朝南</Text>
              <Text>楼层：22/33</Text>
            </View>
          </View>
          <View className='assetDesc'>
            {footerList.map((item, index) => {
              return (
                <View className='assetItem' key={index + "ac"}>
                  <Text>{item.title}</Text>
                  <Text className='circle'>{item.number}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
export default SettingDetails;
