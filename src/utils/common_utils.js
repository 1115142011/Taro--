import Taro, { Component } from "@tarojs/taro";

class CommonUtils extends Component {
  static getInstance() {
    if (!CommonUtils.instance) {
      CommonUtils.instance = new CommonUtils();
    }
    return CommonUtils.instance;
  }
  // 抽离出适配页面包裹高度及内部滚动列表高度的方法，不完美，需要优化 2020-08-03 TODO
  // CommonUtils.getInstance().formatHeight(列表上方的占用高度，需要根据不同页面进行有效适配)
  formatHeight = occupiedHeight => {
    let windowHeight = Taro.getSystemInfoSync().windowHeight;
    let windowWidth = Taro.getSystemInfoSync().windowWidth;
    let wrapHeightStyle = `height:${windowHeight - 15}px`;
    let listHeightStyle = `height:${windowHeight -
      parseInt((windowWidth / 375) * occupiedHeight)}px`;
    return [wrapHeightStyle, listHeightStyle];
  };
  getHeadrHeight = () => {
    return Taro.getSystemInfoSync().statusBarHeight + 40;
  };
}

export default CommonUtils;
