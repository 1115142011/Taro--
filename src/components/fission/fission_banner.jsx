import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./fission_banner.scss";
import fissionWideImg from "../../assets/common/ads_banner_wide.png";
import fissionNarrowImg from "../../assets/common/ads_banner_narrow.png";

class FissionBanner extends Component {
  constructor(props) {
    super(props);
    this.config = {};

    this.state = {
      bannerType: 0
    };
  }
  componentDidShow() {
    if (this.props.type === "narrow") {
      this.setState({
        bannerType: 1
      });
    }
  }
  gotoFissionPromotion = () => {
    Taro.navigateTo({ url: "/pages/ads/fission_promotion" });
  };

  render() {
    return (
        <View>
          {this.state.bannerType === 1 && (
            <Image
              className='adsBanner'
              mode='widthFix'
              onClick={this.gotoFissionPromotion}
              src={fissionNarrowImg}
            ></Image>
          )}
          {this.state.bannerType === 0 && (
            <Image
              className='adsBanner'
              mode='widthFix'
              onClick={this.gotoFissionPromotion}
              src={fissionWideImg}
            ></Image>
          )}
        </View>
    );
  }
}

export default FissionBanner;
