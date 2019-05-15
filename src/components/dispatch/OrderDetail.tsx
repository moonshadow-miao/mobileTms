import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback, Clipboard} from 'react-native'
import {Icon, Toast} from '@ant-design/react-native'
import style from './OrderDetailStyle'
import {variable} from '../../style'

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
    Clipboard.setString(this.props.order.code)
    Toast.success('订单号复制成功！', 1)
  }

  checkedOrder = () => {
    this.setState({checked: !this.state.checked})
    // this.props.onSelectOrder()
  }

  foldContent = () => {
    this.setState({fold: !this.state.fold})
  }


  cancelSplit = () => {
    const subSoCode = this.props.cargo[0].subSoCode
    this.props.onOpenModal(subSoCode)
  }

  render () {
    const {order} = this.props
    const {checked, fold} = this.state
    const split = order.status === Status.SCHEDULING
    const splitClass = split ? style.split : style.order
    return (<View style={splitClass}>
      <View style={style.orderTop}>
        <View style={style.checkDetail}>
          <TouchableWithoutFeedback onPress={this.checkedOrder}>
            {!checked ? <Icon style={style.checkBox} color={variable.mainColor} size={23} name='check'/> : <Text style={style.noChecked}/>}
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={this.copy}>
            <View style={style.detail}>
              <Text style={style.detailItem}>订单号：</Text>
              <Text style={{...style.detailItem, lineHeight: 22}}>{order.code}</Text>
              <Icon name='copy' color={variable.mainColor} size={22} />
            </View>
          </TouchableWithoutFeedback>
          <View style={style.detail}>
            <Text style={style.detailItem}>外部单号：</Text><Text style={style.detailItem}>{order.erpNo || '-'}</Text>
          </View>
          <View style={style.detail}>
            <Text style={style.detailItem}>收货方：</Text><Text numberOfLines={2} style={{...style.detailItem, width: 270}}>{order.receiverName} - {order.destLocationAddress}</Text>
          </View>
        </View>
        <View style={style.expand}>
          <TouchableWithoutFeedback onPress={this.foldContent}>
            {
              fold ? <Icon color={variable.mainColor} size={30} name='down'/> : <Icon color={variable.mainColor} name='up' size={30} />
            }
          </TouchableWithoutFeedback>
        </View>
      </View>
      {
        !fold && <View style={style.orderBottom}>
          <Text>第六季拉水电费骄傲绿色空间发生砥砺奋进</Text>
        </View>
      }
    </View>)
  }
}

// export {Order, Cargo}

export default OrderDetail
