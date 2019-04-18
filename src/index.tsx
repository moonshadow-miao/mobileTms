import React, {Component} from 'react'
import {View} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from './store/common'

interface Props {
  common: Common
}

interface state {
  state: any
}

@inject('common')
@observer
class Index extends Component<Props, state> {
  render() {
    return (
      <View>

      </View>
    )
  }
}

export default Index
