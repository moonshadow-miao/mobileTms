import React, {Component} from 'react'
import {View, TouchableNativeFeedback, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './orderListStyle'
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
  constructor(props: Readonly<Props>) {
    super(props)
    console.log(variable, Icon, Toast)
  }

  render () {
    const {navigation} = this.props
    return (
      <Provider>
        <View style={style.container}>
          <NavBar showBack={true} filter={true} navigation={navigation} title='1. 选择订单'/>
          <TouchableNativeFeedback>
            <Text>1</Text>
          </TouchableNativeFeedback>
        </View>
      </Provider>
    )
  }
}

export default Index
