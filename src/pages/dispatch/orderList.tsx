import React, {Component} from 'react'
import {View, TouchableNativeFeedback, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './orderListStyle'
import {NavigationScreenProp} from 'react-navigation'
import commonStyle from '../../style'
import {Provider, Picker} from '@ant-design/react-native'
import NavBar from '../../components/common/navBar'

interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

interface State {
  type: string
}

const typeList: any[] = []

@inject('common')
@observer
class Index extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props)
    this.state = {
      type: ''
    }
  }

  onChangeEnv = () => {

  }

  render () {
    const {type} = this.state
    const {navigation} = this.props
    return (
      <Provider>
        <View style={style.container}>
          <NavBar renderPicker={<Provider><Picker indicatorStyle={commonStyle.indicator} itemStyle={commonStyle.pickerItem} onChange={this.onChangeEnv} data={[typeList]} cascade={false} value={[type]} /></Provider>} placeholder='请输入单号、收发货方、详细地址' showBack={true} filter={true} navigation={navigation} title='1. 选择订单'/>
          <TouchableNativeFeedback>
            <Text>1</Text>
          </TouchableNativeFeedback>
        </View>
      </Provider>
    )
  }
}

export default Index
