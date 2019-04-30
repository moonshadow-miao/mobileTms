import {createAppContainer, createStackNavigator} from 'react-navigation'
import Index from '../pages/index/index'
import Login from '../pages/login/index'
import OrderList from '../pages/dispatch/orderList'

const App = createStackNavigator({
  Index: {
    screen: Index,
    navigationOptions: {header: null}
  },
  Login: {
    screen: Login,
    navigationOptions: {header: null}
  },
  OrderList: {
    screen: OrderList,
    navigationOptions: {header: null}
  }

}, {
  initialRouteName: 'OrderList',
})

// 初始化StackNavigator
export default createAppContainer(App)

