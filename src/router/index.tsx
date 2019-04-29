import {createAppContainer, createStackNavigator} from 'react-navigation'
import Index from '../pages/index/index'
import Login from '../pages/login/index'

const App = createStackNavigator({
  Index: {
    screen: Index,
    navigationOptions: {header: null}
  },
  Login: {
    screen: Login,
    navigationOptions: {header: null}
  }
}, {
  initialRouteName: 'Index',
})

// 初始化StackNavigator
export default createAppContainer(App)

