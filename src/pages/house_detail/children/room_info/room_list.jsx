import Taro, { Component } from "@tarojs/taro";
import { View, Text,Image } from "@tarojs/components";
import { RoomTags } from "../tags/tags";
import "./room.scss";

class RoomList extends Component {
  render() {
    const {roomList=[]} = this.props
    const tags = [{title:'年签',type:1},{title:'月付',type:1},{title:'限时活动',type:2}]
    return (
        <View className='listBox'>
            {
              Array(4).fill(1).map((item,index)=>{
                return(
                  <View className='roomItem' key={index+'room'}>
                  <View className='roomImage'>
                  <Image
                    className='pic'
                    mode='aspectFill'
                    src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3622364678,2343732963&fm=26&gp=0.jpg'
                  />
                  </View>
                  <View className='roomInfo'>
                    <View className='houseName'>中德英伦联邦苹果公寓-B房间</View>
                    <View className='roomDsc'>16㎡ | 4室1厅</View>
                    {
                      index===0&&(
                        <View className='roomTags'>
                          <RoomTags targsArry={tags} />
                        </View>
                      )
                    }
                  </View>
                  <View className='priceMsg'>
                    <Text >¥ 950/月</Text>
                  </View>
              </View>
                )
              })
            }
        </View>
    );
  }
}
export default RoomList;
