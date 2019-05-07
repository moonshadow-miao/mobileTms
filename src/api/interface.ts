export interface GET_DOMAIN_LIST {
  phone: number,
  captcha: string
}

export interface LOGIN {
  domainCode: string,
  preToken: string
}

type PAGE = {
  currentPage: number,
  pageSize: number
}

export enum EnumOrder {
  all = '',
  split = 'true',
  noSplit = 'false'
}

export interface ORDER_LIST {
  page: PAGE,
  so: {
    appCodeLike: string,
    ableSplit: EnumOrder
  }
}

export interface CANCEL_SPLIT {
  subSoCode: string
}

export interface SPLIT_ORDER {
  segVos: {
    hubId: number
  },
  subSoCodes: string[]
}

export interface DRIVER_LIST {
  driverNameLike?: string,
  externalCorpName: string
}

export interface PARTNER_LIST {
  corpId: number
}

export interface VEHICLE_LIST {
  driverId: number,
  srvImplType: string
}

type driverVo = {
  name: string,
  mobilePhone: number | ''
}

type vehicleVo = {
  plateNo: string,
  type: string,
  vehicleModelId: number,
  vehicleModelName: string
}

type toiGroupObVo = {
  segIndex: number,
  subSoCode: string
}

export interface SELF_DISPATCH {
  driverId: number,
  implType: 'SELF',
  driverVo: driverVo,
  serviceProviderId: number,
  serviceProviderName: string,
  secondoryDriverId?: number | '',
  secondoryDriverName?: string | '',
  vehicleVo: vehicleVo,
  toiGroupObVos: toiGroupObVo[]
}

export interface TNET_DISPATCH {
  serviceProviderId: number,
  serviceProviderName: string,
  implType: 'TNET',
  toiGroupObVos: toiGroupObVo[]
}

export interface OUTER_DISPATCH {
  driverId: number | '',
  implType: 'OUTER',
  driverVo: {
    name: string,
    mobilePhone: number | ''
  },
  serviceProviderId: number,
  serviceProviderName: string,
  secondoryDriverId: number | '',
  secondoryDriverName: string,
  vehicleVo: {
    plateNo: string,
    type: string,
    vehicleModelId: number | '',
    vehicleModelName: string
  },
  toiGroupObVos: toiGroupObVo[]
}

export interface TO_LIST {
  so: {
    appCodeLike: string,
    statusEnrouteList: string[]
  },
  page: PAGE
}

export interface RECALL_TO {
  id: number,
  optlock: number
}
