import Taro, { Component } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

class ApartmentList extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: "像素公寓",
      navigationBarBackgroundColor: "#eeeeee",
      backgroundColor: "#eeeeee"
    };
  }
  onShareAppMessage() {}
  render() {
    return (
      <WebView
        src='https://hrms.pixelroom.cn/tquery/#/'
        onMessage={this.handleMessage}
      />
    );
  }
}

export default ApartmentList;
