import React, {Component} from 'react'
import {Provider} from 'mobx-react'
import Routers from './router'
import store from './store'
import {View} from 'react-native'
import {ActivityIndicator} from '@ant-design/react-native'
import {variable} from './style'
import {observer} from 'mobx-react';

@observer
class Index extends Component {
  render() {
    return (
      <Provider {...store}>
        <View style={{flex: 1}}>
          <Routers/>
          <ActivityIndicator toast color={variable.mainColor} animating={store.common.loading} size="large" text="Loading..."/>
        </View>
      </Provider>
    )
  }
}

export default Index
