import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import cubeBtnImg from "@/assets/common/cube_icon.svg";
import rightArrowImg from "@/assets/common/right_arrow.svg";
import "./sugarcube_btn.scss";

class SugarcubeBtn extends Component {
  gotoMySugarcube = () => {
    Taro.navigateTo({ url: "/pages/my_sugarcube/my_sugarcube" });
  };

  render() {
    return (
      
      <View className='surgarCubeBtn'  onClick={this.gotoMySugarcube}>
        
        <Image className='cubeBtnImg' src={cubeBtnImg} ></Image>
        
          <View className='cubeValue'>{this.props.number}</View>
        <Image className='rightArrow' src={rightArrowImg} ></Image>
      </View>
    );
  }
}

export default SugarcubeBtn;
