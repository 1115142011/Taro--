// import { AtTabBar } from "taro-ui";
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import myCenterIcon from "@/assets/index/myCenterIcon.svg";
// import myCenterFocusIcon from "@/assets/index/myCenterFocusIcon.svg";
// import pixelroomIcon from "@/assets/index/pixelroomIcon.svg";
// import pixelroomFocusIcon from "@/assets/index/pixelroomFocusIcon.svg";

import "./index.scss";
import UserCenter from "../user_center/user_center";
// import ApartmentList from "../apartment_list/apartment_list";

class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "像素公寓",
      navigationBarBackgroundColor: "#fdd835",
      backgroundColor: "#fdd835"
    };
  }
  render() {
    return (
      <View className='index'>
        <UserCenter></UserCenter>
        <View
          className='linearColorView'
          style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
        >
          o(*￣▽￣*)o
        </View>
      </View>
    );
  }
}

export default Index;
