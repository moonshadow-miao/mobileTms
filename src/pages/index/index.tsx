import React, {Component} from 'react'
import {View} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import {NavigationScreenProp} from 'react-navigation'


interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

interface State {

}


@inject('common')
@observer
class Index extends Component<Props, State> {
  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View style={style.container}/>
    )
  }
}

export default Index
