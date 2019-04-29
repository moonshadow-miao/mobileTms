import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import {NavigationScreenProp} from 'react-navigation'
import {variable} from "../../style";
import {Icon} from '@ant-design/react-native'


interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

@inject('common')
@observer
class Index extends Component<Props> {
  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {}
  }

  navigateTo = (page: any) => {
    console.log(page)
  }

  render () {
    const auth = this.props.common.auth
    console.log(auth)
    return (
      <View style={style.container}>
        <View style={style.entrances}>
          {
            auth && auth.ORDER_CENTER && <TouchableWithoutFeedback  onPress={this.navigateTo.bind(null, 'todo')}>
              <View style={style.entrance} >
                <Icon name="file-sync" size={50} color={variable.borderColor} />
                <Text style={{...style.text, color: variable.borderColor}}>新建订单</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          {
            auth && auth.ORDER_ASSIGN && <TouchableWithoutFeedback onPress={this.navigateTo.bind(null, '/pages/dispatch/orderList')}>
              <View style={style.entrance} >
                <Icon name="desktop" size={50} color='#000'/>
                <Text style={{...style.text, color: '#000'}}>订单调度</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          {
            auth && auth.TRANS_CENTER && <TouchableWithoutFeedback  onPress={this.navigateTo.bind(null, '/pages/transCenter/toList')}>
              <View style={style.entrance} >
                <Icon name="solution" size={50} color='#000' />
                <Text style={{...style.text, color: '#000'}}>运单中心</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          {
            auth && auth.REPORT_CENTER && <TouchableWithoutFeedback onPress={this.navigateTo.bind(null, 'todo')}>
              <View style={style.entrance} >
                <Icon name="bar-chart" size={50} color={variable.borderColor} />
                <Text style={{...style.text, color: variable.borderColor}}>运营报表</Text>
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
      </View>
    )
  }
}

export default Index
