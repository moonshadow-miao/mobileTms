import {createAppContainer, createStackNavigator} from 'react-navigation'
// import Index from '../index'
import Login from '../pages/login/index'
import {View, Text} from 'react-native'
import React from 'react'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

const App = createStackNavigator({
  Index: {
    screen: Login,
  },
  Details: DetailsScreen
}, {
  initialRouteName: 'Index'
})

// 初始化StackNavigator
export default createAppContainer(App)
