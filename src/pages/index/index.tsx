import React, {Component} from 'react'
import {View, TouchableNativeFeedback, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import {NavigationScreenProp} from 'react-navigation'
import {variable} from '../../style'
import {Icon, Toast, Provider} from '@ant-design/react-native'
import NavBar from '../../components/common/navBar'

interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

@inject('common')
@observer
class Index extends Component<Props> {
  navigateTo = (page: string) => {
    if (page === 'todo') {
      Toast.fail('暂未开通，敬请期待', 1)
    }
    this.props.navigation.navigate(page)
  }

  render () {
    const {common: {auth}, navigation} = this.props
    return (
      <Provider>
        <View style={style.container}>
          <NavBar navigation={navigation} title='首页' showBack={false} />
          <View style={style.entrances}>
            {
              auth && auth.ORDER_CENTER && <TouchableNativeFeedback onPress={this.navigateTo.bind(null, 'todo')}>
                <View style={style.entrance} >
                  <Icon name="file-sync" size={50} color={variable.borderColor} />
                  <Text selectionColor={variable.mainColor} style={{...style.text, color: variable.borderColor}}>新建订单</Text>
                </View>
              </TouchableNativeFeedback>
            }
            {
              auth && auth.ORDER_ASSIGN && <TouchableNativeFeedback onPress={this.navigateTo.bind(null, 'OrderList')}>
                <View style={style.entrance} >
                  <Icon name="desktop" size={50} color='#000'/>
                  <Text style={{...style.text, color: '#000'}}>订单调度</Text>
                </View>
              </TouchableNativeFeedback>
            }
            {
              auth && auth.TRANS_CENTER && <TouchableNativeFeedback  onPress={this.navigateTo.bind(null, 'ToList')}>
                <View style={style.entrance} >
                  <Icon name="solution" size={50} color='#000' />
                  <Text style={{...style.text, color: '#000'}}>运单中心</Text>
                </View>
              </TouchableNativeFeedback>
            }
            {
              auth && auth.REPORT_CENTER && <TouchableNativeFeedback onPress={this.navigateTo.bind(null, 'todo')}>
                <View style={style.entrance} >
                  <Icon name="bar-chart" size={50} color={variable.borderColor} />
                  <Text style={{...style.text, color: variable.borderColor}}>运营报表</Text>
                </View>
              </TouchableNativeFeedback>
            }
          </View>
        </View>
      </Provider>
    )
  }
}

export default Index
