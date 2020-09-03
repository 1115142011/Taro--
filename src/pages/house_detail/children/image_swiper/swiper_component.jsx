import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { saveMsg } from "@/actions/house_actions";
import {
  Swiper,
  SwiperItem,
  View,
  Image,
  ScrollView,
  Text
} from "@tarojs/components";

import "./swiper_component.scss";


@connect( () => ({}),
  dispatch=>({
    onSaveImage(data){
    dispatch(saveMsg(data))
  }
}))
class SwiperBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      swperLis:[],
      constrolList:[]
    };
  }
 
 
  componentWillMount(){
    const {lis,onSaveImage}=this.props
    const {listArry,categoryLis} = this.getSwperList(lis)
    this.setState(()=>{
      return{
        swperLis:listArry,
        constrolList:categoryLis
      }
    })
    onSaveImage({swperLis:listArry,constrolList:categoryLis})
  }
  // swperindex 改变
  currentChange(e) {
    const {current} = e.detail
   this.setState({
    currentIndex:current
   })
  }
  // 设置总数据
  getSwperList(arr=[]){
    let listArry = []
    let categoryLis=[]
    arr.forEach((item=>{
      if(item.image&&item.image.length>0){
        categoryLis.push({
          name:item.name,
          title:`${item.name}（${item.image.length}）`,
          min:listArry.length,
          max:listArry.length + item.image.length-1,
          number:item.image.length
          })
          listArry.push(...item.image)
      }
    }))
    return {listArry,categoryLis}
  }
  // 类别点击、
  cateGoryClick(item){
    this.setState({
      currentIndex:item.min
    })
   
  }
  toHouseSetting(){
    const {currentIndex,constrolList} =this.state
    let tabIndex = 0
    for(let i=0;i<constrolList.length;i++){
      if(currentIndex>=constrolList[i].min&&currentIndex<=constrolList[i].max){
        tabIndex = i
        break
      }
    }
  
    Taro.navigateTo({url:`/pages/house_detail/setting_detail/house_setting?index=${currentIndex}&tab=${tabIndex}`})
  }
  render() {
    const { currentIndex ,swperLis,constrolList} = this.state;
    return (
      <View className='swperBox'>
        <Swiper
          className='swperBox'
          autoplay
          circular
          skipHiddenItemLayout
          current={currentIndex}
          onChange={this.currentChange.bind(this)}
        >
          {
            swperLis.map((value,index)=>{
              return(
                <SwiperItem className='swperItem' key={index+'index'} onClick={this.toHouseSetting.bind(this)}>
                <Image
                  className='pic'
                  mode='aspectFill'
                  src={value.url}
                />
              </SwiperItem>
              )
            })
          }
         
        
        </Swiper>
        <View className='categoryControl'>
          <ScrollView className='categoryBox' scrollX>
            {
              constrolList.map((item, i) => {
                return (
                  <View
                    className={
                      currentIndex >=item.min&&currentIndex<=item.max ? "isCurrenrt categoryItem" : "categoryItem"
                    }
                    key={i+'cid'}
                    onClick={this.cateGoryClick.bind(this,item)}
                  >
                    <Text className='categoryName'>{item.name}</Text>
                    <Text className='highlightIcon'></Text>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default SwiperBox;
