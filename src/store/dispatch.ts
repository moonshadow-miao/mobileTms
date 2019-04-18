import {action, observable} from 'mobx';
// import {API_ALL_HUBS} from 'api'

type Order = {
  segIndex: number,
  subSoCode: string
}

type Options = {
  name: string,
  index: number,
  id: number
}

export interface Dispatch {
  dispatchOrders: Order[],
  serviceProviderId: number,
  serviceProviderName: string,
  toCode: string,
  setDispatchOrders: (orderList: Order[], id: number, name: string) => void,
  setToCode: (toCode: string) => void,
  emptyDispatchOrder: (toCode: string) => void,
  getHubs: () => void,
  hubList: Options[]
}

export default class dispatch implements Dispatch{
  @observable dispatchOrders: Order[] = []
  @observable serviceProviderId = -1
  @observable serviceProviderName = ''
  @observable hubList: Options[] = []
  @observable  toCode = ''

  @action
  setDispatchOrders(orderList: Order[], serviceProviderId: number, serviceProviderName: string) {
    this.dispatchOrders = orderList
    this.serviceProviderId = serviceProviderId
    this.serviceProviderName = serviceProviderName
  }

  @action
  setToCode (toCode: string) {
    this.toCode = toCode
  }

  @action
  emptyDispatchOrder(toCode: string) {
    this.dispatchOrders = []
    this.serviceProviderId = -2
    this.serviceProviderName = ''
    this.setToCode(toCode)
  }

  @action
  getHubs () {
    // API_ALL_HUBS().then(({voList}) => {
    //   this.hubList = voList.map((item, index) => ({name: item.name, id: item.id, index}))
    // })
  }

  static fromJS() {
    return new dispatch()
  }
}
