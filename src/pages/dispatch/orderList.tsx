import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './orderListStyle'
import {NavigationScreenProp} from 'react-navigation'
import commonStyle from '../../style'
import {Provider, Picker} from '@ant-design/react-native'
import NavBar from '../../components/common/navBar'
import {API_ORDER_LIST} from '../../api/index'
import {EnumOrder} from '../../api/interface'
import OrderDetail, {Status} from '../../components/dispatch/OrderDetail'

interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

type Label = {
  label: string,
  value: EnumOrder
}

type Order = {
  code: string,
  subSoCode: string,
  corpId: number,
  corpName: string,
  destLocationAddress: string,
  domainId: number,
  erpNo: string,
  id: number,
  innerPackCount: number,
  itemCount: number,
  receiverName: string,
  shipperName: string,
  sourceLocationAddress: string,
  volume: number,
  weight: number,
  status: Status
}

type Cargo = {
  code: string,
  domainId: number,
  id: number,
  innerPackCount: number,
  itemCount: number,
  itemName: string,
  scheduleType: any,
  soId: number,
  soiId: number,
  subSoCode: string,
  volume: number,
  weight: number,
}

interface OrderInfo {
  gnode: Order,
  list: Cargo[],
  fold: boolean,
  checked: boolean
}

interface State {
  type: EnumOrder,
  appCodeLike: '',
  orderList: OrderInfo[],
  currentPage: number,
  totalCount: number
}

const typeList: Label[] = [{label:'全部', value: EnumOrder.all}, {label:'已拆分', value: EnumOrder.split}, {label:'未拆分', value: EnumOrder.noSplit}]
const pageSize = 10

@inject('common')
@observer
class Index extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props)
    this.state = {
      type: EnumOrder.all,
      appCodeLike: '',
      orderList: [],
      currentPage: 1,
      totalCount: 0
    }
  }

  onChangeStatus = ([item]: any) => {
    this.setState({type: item}, () => {
      this.goSearch().then()
    })
  }

  goSearch: (appCodeLike?: string) => Promise<any> = (appCodeLike = this.state.appCodeLike) => {
    const {type} = this.state
    return API_ORDER_LIST({page: {currentPage: 1, pageSize}, so: {appCodeLike, ableSplit: type}}, true).then(({vo: {list = []}}) => {
      const orderList: OrderInfo[] = list.map((item: { checked: boolean }) => {
        item.checked = false
        return item
      })
      this.setState({orderList, currentPage: 1})
    })
  }

  render () {
    const {type, orderList} = this.state
    const {navigation} = this.props
    const label = typeList.find(item => item.value === type).label
    return (
      <Provider>
        <View style={style.container}>
          <NavBar renderPicker={
            <Picker indicatorStyle={commonStyle.indicator} itemStyle={commonStyle.pickerItem} onChange={this.onChangeStatus} data={[typeList]} cascade={false} value={[type]}>
              <Text style={style.label}>{label}</Text>
            </Picker>
          } placeholder='请输入单号、收发货方、详细地址' showBack={true} filter={true} navigation={navigation} title='1. 选择订单'/>
          <FlatList data={orderList} renderItem={({item}) => <OrderDetail checked={item.checked} order={item.gnode} cargo={item.list} key={item.gnode.id} />} />
        </View>
      </Provider>
    )
  }
}

export default Index
