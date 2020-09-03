import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView,Map } from "@tarojs/components";
import { AtIcon,AtButton } from "taro-ui";
import SwiperComponent from "./children/image_swiper/swiper_component";
import Tags from "./children/tags/tags";
import RoomList from "./children/room_info/room_list";
import TenantList from "./children/tenant/tenant_list";
import "./index.scss";

class indexBox extends Component {
  constructor(...argus) {
    super(argus);
    this.state = {
      list: [
        {
          type: "room",
          name: "房间",
          image: [
            {
              url:
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1737072847,1699534261&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3026939796,485761977&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1790098750,3789999894&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2724053067,272554101&fm=26&gp=0.jpg",
              type: "room"
            }
          ]
        },

        {
          type: "kitchen",
          name: "厨房",
          image: [
            {
              url:
                "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3622364678,2343732963&fm=26&gp=0.jpg",
              type: "kitchen"
            },
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3301205675,3537689501&fm=26&gp=0.jpg",
              type: "kitchen"
            },
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=234585439,3333907919&fm=26&gp=0.jpg",
              type: "kitchen"
            },
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3231060375,387609897&fm=26&gp=0.jpg",
              type: "kitchen"
            }
          ]
        },
        {
          type: "toilet",
          name: "公共区",
          image: [
            {
              url:
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3199883312,3460992016&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2288421538,423072610&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1026276292,1285250363&fm=26&gp=0.jpg",
              type: "room"
            },
            {
              url:
                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3850224711,2561767926&fm=26&gp=0.jpg",
              type: "room"
            }
          ]
        }
      ],
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
      windowHeight: Taro.getSystemInfoSync().windowHeight
    };
    this.config = {
      navigationStyle: "custom"
    };
  }


  callSalesman(phone){
    Taro.makePhoneCall({
      phoneNumber: phone 
    })
  }

  render() {
    const { list, statusBarHeight, windowHeight } = this.state;
    const tags = [
      { title: "标签", type: 3 },
      { title: "首月立减", type: 3 },
      { title: "年签", type: 3 },
      { title: "月付", type: 1 },
      { title: "限时活动", type: 2 }
    ];
    const markers = [
      {id:1,latitude:30.537079,longitude:104.054538,title:'欧香小镇',callout:{content:'欧香小镇',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:2,latitude:30.567418,longitude:104.042006,title:'凯德世纪名邸',callout:{content:'凯德世纪名邸',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:3,latitude:30.552083,longitude:104.079235,title:'英郡一期',callout:{content:'英郡一期',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:4,latitude:30.563165,longitude:104.051418,title:'清凤时代城（公）',callout:{content:'清凤时代城（公）',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:5,latitude:30.54966,longitude:104.044275,title:'合能璞丽',callout:{content:'合能璞丽',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:6,latitude:30.661384,longitude:104.137675,title:'成华奥园广场',callout:{content:'成华奥园广场',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:8,latitude:30.675434,longitude:104.125487,title:'蓝润V客东区',callout:{content:'蓝润V客东区',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:9,latitude:30.554508,longitude:104.090692,title:'红树湾',callout:{content:'红树湾',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
      {id:10,latitude:30.553615,longitude:104.101573,title:'祥和佳苑',callout:{content:'祥和佳苑',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}}

    ]
    const includePoints=[ 
    {id:5,latitude:30.54966,longitude:104.044275,title:'合能璞丽',callout:{content:'合能璞丽',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
    {id:6,latitude:30.661384,longitude:104.137675,title:'成华奥园广场',callout:{content:'成华奥园广场',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
    {id:8,latitude:30.675434,longitude:104.125487,title:'蓝润V客东区',callout:{content:'蓝润V客东区',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}},
 
    {id:10,latitude:30.553615,longitude:104.101573,title:'祥和佳苑',callout:{content:'祥和佳苑',display:'ALWAYS',anchorY:-20,bgColor:'#FDD835',color:'#eeeee',padding:8}}]
    return (
      <View className='indexPage'>
        <View
          style={{ height: statusBarHeight + "px", background: "#ffffff" }}
        ></View>
        <ScrollView
          className='scrollBox'
          scrollY
          style={`height:${windowHeight - statusBarHeight}px`}
        >
          <SwiperComponent lis={list}></SwiperComponent>
          <View className='houseInfo'>
            <View className='houseName'>中德英伦联邦苹果公寓-A主卫</View>
            <View className='housePrice'>
              <Text className='orange'>
                ¥ 1030 <Text className='smallFont'>/月</Text>
              </Text>
              <Text className='priceHint'>（季付价）</Text>
            </View>
            <View className='payModeExplain'>
              <Text className='hintText'>押金及服务费相关规则</Text>
              <View className='linkTag'>
                <Text className='linkText'>付款方式</Text>
                <AtIcon value='chevron-right' size='20' color='#D2D2D2' />
              </View>
            </View>
            <View className='attachedTags'>
              <Tags targsArry={tags} />
            </View>
            <View className='roomExplain'>
              <View className='msgItem'>
                <View className='msgTitle'>区域</View>
                <View className='desc'>高新区-中和</View>
              </View>
              <View className='msgItem'>
                <View className='msgTitle'>面积</View>
                <View className='desc'>9.5㎡</View>
              </View>

              <View className='msgItem'>
                <View className='msgTitle'>户型</View>
                <View className='desc'>5室1厅2卫</View>
              </View>
            </View>

            <View className='otherRoomsMsg'>
              <View className='largeTitle'>房屋信息</View>
              <RoomList roomList={[]} />
              <View className='tenantBox'>
                <TenantList></TenantList>
              </View>
            </View>
            <View className='localtionMsg'>
              <View className='largeTitle'>位置信息</View>
              <View className='map'>




              <Map className='map' enableOverlooking style={{height:'100%',width:'100%'}} longitude={104.051418} latitude={30.563165} markers={markers} includePoints={includePoints}></Map>
              
              
              
              
              
              </View>
            </View>

            <View className='districtRomm'>
            <View className='largeTitle'>该小区其它房源</View>
              <RoomList roomList={[]} />
            </View>
          </View>
        </ScrollView>
        <View className='footerBox'>
          <AtButton className='bookedBtn'>
          
            <AtIcon value='credit-card' className='btnInnerIcon'></AtIcon>  
          
            预约看房
          </AtButton>
          <AtButton className='callBtn' onClick={this.callSalesman.bind(this,'18200296606')}> <AtIcon value='phone' className='btnInnerIcon' ></AtIcon>联系TA</AtButton>
        </View>
      </View>
    );
  }
}
export default indexBox;
