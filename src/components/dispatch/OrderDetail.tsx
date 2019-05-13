import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Icon} from '@ant-design/react-native'
import style from './OrderDetailStyle'
import {variable} from "../../style";

export enum Status {
  SCHEDULING = 'SCHEDULING',
  UNSCHEDULED = 'UNSCHEDULED'
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

type Props = {
  order: Order,
  cargo: Cargo[],
  key: number,
  checked: boolean,
  onSelectOrder?: (checked: boolean) => void,
  onOpenModal?: (subSoCode: string) => void
}

type State = {
  fold: boolean,
  checked: boolean
}

class OrderDetail extends Component<Props, State> {
  static defaultProps = {

  }

  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {
      fold: true,
      checked: false
    }
  }

  copy = (e: any) => {
    e.stopPropagation()
    // const code = this.props.order.code
    // code && Taro.setClipboardData({data: code}).then()
  }

  checkedOrder = (checked: boolean) => {
    this.props.onSelectOrder(checked)
  }

  foldContent = (fold: boolean) => {
    this.setState({fold})
  }

  cancelSplit = () => {
    const subSoCode = this.props.cargo[0].subSoCode
    this.props.onOpenModal(subSoCode)
  }

  render () {
    const {order} = this.props
    const {checked} = this.state
    const split = order.status === Status.SCHEDULING
    const splitClass = split ? style.split : style.order
    return (<View style={splitClass}>
      <View style={style.orderTop}>
        <View style={style.checkDetail}>
          {checked ? <Icon style={style.checkBox} size={28} name='check'/> : <Text style={style.noChecked}/>}
        </View>
        <View>
          <View style={style.detail}>
            <Text style={style.detailItem}>订单号：</Text><Text style={{...style.detailItem, lineHeight: 22}}>{order.code}<Icon name='copy' style={{paddingTop: 5}} color={variable.mainColor} size={18} /></Text>
          </View>
          <View style={style.detail}>
            <Text style={style.detailItem}>外部单号：</Text><Text style={style.detailItem}>{order.erpNo || '-'}</Text>
          </View>
          <View style={style.detail}>
            <Text style={style.detailItem}>外部单号：</Text><Text style={style.detailItem}>{order.receiverName} - {order.destLocationAddress}</Text>
          </View>
        </View>
      </View>
    </View>)
  }
}

// export {Order, Cargo}

export default OrderDetail
