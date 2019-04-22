// import {API_USER_AUTH} from 'api'
import {action, observable} from 'mobx';
// import {STORAGE} from '../utils/const'
import {ENV_URL} from '../utils/const'

type User = {
  roleNames: string,
  domainName: string,
  cellPhone: number,
  domainId: number,
  domainCode: number,
  domainType: string,
  loginName: string
}

export interface Common {
  url: ENV_URL,
  token: string,
  loading: boolean,
  auth: any,
  user: User,
  changeUrl: (url: ENV_URL) => void,
  setToken: (token: string) => void,
  openLoading: Function,
  closeLoading: Function,
  emptyUser: () => void,
  // getAuthAndUser: () => Promise<any> | undefined
  getAuthAndUser: () => void
}

const token =  ''
const url = ENV_URL.DEV
const auth: any = null
const user: any = null

export default class common implements Common{
  @observable url = url
  @observable token = token
  @observable auth = auth
  @observable user = user
  @observable loading = false

  @action
  changeUrl(url: ENV_URL) {
    this.url = url
    // Taro.setStorageSync(STORAGE.URL, url)
  }

  @action
  setToken(tokens: string) {
    this.token = tokens
    // Taro.setStorageSync(STORAGE.TOKEN, tokens)
  }

  @action
  openLoading() {
    this.loading = true
  }

  @action
  closeLoading() {
    this.loading = false
  }

  @action
  getAuthAndUser() {
    if (!this.token || this.token === 'undefined') {
      // Taro.reLaunch({url: 'pages/login/index'}).then()
      return
    }
    // return API_USER_AUTH().then(({vo, vo: {userFunctionTree: {functionMap = null} = {}} = {}}) => {
    //   const {roleNames, domainName, cellPhone, domainId, domainCode, domainType, loginName} = vo
    //   this.auth = functionMap
    //   this.user = {roleNames, domainName, cellPhone: +cellPhone, domainId, domainCode, domainType, loginName}
    //   Taro.setStorageSync(STORAGE.AUTH, functionMap)
    //   Taro.setStorageSync(STORAGE.USER, this.user)
    // }).catch(() => {
    //   Taro.reLaunch({url: 'pages/login/index'}).then()
    // })
  }

  @action
  emptyUser() {
    this.token = ''
    this.auth = ''
    this.user = null
    // Taro.removeStorageSync(STORAGE.TOKEN)
    // Taro.removeStorageSync(STORAGE.AUTH)
    // Taro.removeStorageSync(STORAGE.USER)
  }

  static fromJS() {
    return new common()
  }

}
