import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./exchange_rules_link.scss";

class ExchangeRulesLink extends Component {
  gotoExchangeRules = () => {
    Taro.navigateTo({ url: "/pages/exchange_process/exchange_rules"});
  };

  render() {
    return (
      <View className='linkWrap'>
        <View className='exchangeRuleLink'>
          <AtIcon value='alert-circle' size='16' color='#FF7600'></AtIcon>
          <View className='exchangeRuleText' onClick={this.gotoExchangeRules}>
            兑奖规则
          </View>
        </View>
      </View>
    );
  }
}

export default ExchangeRulesLink;
