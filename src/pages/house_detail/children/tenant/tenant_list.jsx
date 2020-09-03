import Taro, { Component } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";

import "./tenant.scss";

class Tenant extends Component {
  render() {
    const { tenantList = [] } = this.props;

    return (
      <View className='listBox'>
       {
         Array(3).fill(1).map((item,index)=>{
           return(
            <View className='tenantItem' key={index+'i'}>
            <View className='leftBox'>
              <View className='iconBox'>
                <AtIcon value='user' size='24' />
              </View>
              <View className='roomName'>C房间</View>
            </View>
            <View className='rightBox'>男 | 射手座 | 设计师</View>
          </View>
           )
         })
       }
      </View>
    );
  }
}
export default Tenant;
