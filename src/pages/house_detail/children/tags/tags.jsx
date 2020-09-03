import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./tags.scss";

class Tags extends Component {


  setClassName=(type)=>{
    switch (type) {
      case 1:
        return `tagItem`
      case 2:
        return `tagItem orangeTag`
      case 3:
        return `tagItem yello`
      default:
        return `tagItem`
    }
  }
  render() {
    const clasNameArr=['tagItem','orangeTag']
    const {targsArry=[]} = this.props
    return (
        <View className='tagsBox'>
          {
            targsArry.map((item, index) => {
              return (
                <Text
                  className={this.setClassName(item.type)}
                  key={index + "index"}
                >
                  {item.title}
                </Text>
              );
            })}
        </View>
    );
  }
}
export default Tags;
