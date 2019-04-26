import Fetch from './fetch'
import * as INTERFACE from './interface'

const loading: boolean = true

export default {}
/**获取验证码*/
export const API_GET_VALID_CODE = (url: string) => Fetch({url, data: null, method: 'GET'})

/**退出登录*/
export const API_LOGIN_OUT = () => Fetch({url: '/app/mobile/auth/logout', data: null})

/**根据手机号码，验证码获取域列表及preToken*/
export const API_GET_DOMAIN_LIST = (data: INTERFACE.GET_DOMAIN_LIST) => Fetch({url: '/app/mobile/auth/fetchPreToken', data, query: true})

/**preToken进行登录，获取token*/
export const API_LOGIN = (data: { preToken: string; domainCode: number }) => Fetch({url: '/app/mobile/auth/login', data, query: true})

/**获取用户权限*/
export const API_USER_AUTH = () => Fetch({url: '/app/mobile/user/current', data: null})

/**获取订单调度列表*/
export const API_ORDER_LIST = (data: INTERFACE.ORDER_LIST, Loading = false) => Fetch({url: '/app/mobile/to/getSoGroupList', data, loading: Loading})

/**撤回拆分*/
export const API_CANCEL_SPLIT = (data: INTERFACE.CANCEL_SPLIT) => Fetch({url: '/app/mobile/to/revokeToi', data, query: true, loading})

/**获取中转站点*/
export const API_ALL_HUBS = () => Fetch({url: '/app/mobile/common/getAllHubs', data: null})

/**运单拆分*/
export const API_SPLIT_ORDER = (data: INTERFACE.SPLIT_ORDER) => Fetch({url: '/app/mobile/to/scheduleAddrGroup', data, loading})

/**获取司机列表*/
export const API_DRIVER_LIST = (data: INTERFACE.DRIVER_LIST) => Fetch({url: '/app/mobile/common/getDrivers', data, query: true})

/**获取调度承运商*/
export const API_PARTNER_LIST = (data: INTERFACE.PARTNER_LIST) => Fetch({url: '/app/mobile/common/getInAndExternalPartnerShips', data, query: true})

/**获取车牌列表*/
export const API_VEHICLE_LIST = (data: INTERFACE.VEHICLE_LIST) => Fetch({url: '/app/mobile/common/getVehicles', data, query: true})

/**获取车型列表*/
// export const API_VEHICLE_MODEL_LIST = () => Fetch({url: '/app/mobile/common/getVehicleModels', data: {}, })

/**合单调度*/
export const API_SELF_DISPATCH = (data: INTERFACE.SELF_DISPATCH) => Fetch({url: '/app/mobile/to/combineSchedule', data, loading})
export const API_TNET_DISPATCH = (data: INTERFACE.TNET_DISPATCH) => Fetch({url: '/app/mobile/to/combineSchedule', data, loading})
export const API_OUTER_DISPATCH = (data: INTERFACE.OUTER_DISPATCH) => Fetch({url: '/app/mobile/to/combineSchedule', data, loading})

/**获取运单中心*/
export const API_TO_LIST = (data: INTERFACE.TO_LIST) => Fetch({url: '/app/mobile/to/searchByPage', data, loading})

/**撤回运单*/
export const API_RECALL_TO = (data: INTERFACE.RECALL_TO) => Fetch({url: '/app/mobile/to/cancelToConfirm', data: {transOrderVos : data}, loading})
