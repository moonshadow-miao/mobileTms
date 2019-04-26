import {createAppContainer, createStackNavigator} from 'react-navigation'
import Login from '../pages/login/index'
import {View, Text} from 'react-native'
import React from 'react'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

const App = createStackNavigator({
  Index: {
    screen: Login,
    navigationOptions: {header: null}
  },
  Details: DetailsScreen
}, {
  initialRouteName: 'Index',
})

// 初始化StackNavigator
export default createAppContainer(App)
