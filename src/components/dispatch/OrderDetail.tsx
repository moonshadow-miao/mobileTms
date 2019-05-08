import React, {Component} from 'react'
import {View, Text} from 'react-native'
import style from './OrderDetailStyle'

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
  fold: boolean
}

class OrderDetail extends Component<Props, State> {
  static defaultProps = {

  }

  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {
      fold: true
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
    // const {fold} = this.state
    const split = order.status === Status.SCHEDULING
    const splitClass = split ? style.split : style.order
    return (<View style={splitClass}><Text> </Text></View>)
  }
}

// export {Order, Cargo}

export default OrderDetail
