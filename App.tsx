import React, {Component} from 'react';
import {Provider} from 'mobx-react'
import Routers from './src/router'
import store from './src/store'
import {View} from 'react-native'

export default class AppNavigation extends Component {

  render () {
    return (
      <Provider {...store}>
        <View style={{flex: 1}}>
          <Routers/>
        </View>
      </Provider>
    )
  }
}
