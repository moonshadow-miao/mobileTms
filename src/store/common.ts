import {AsyncStorage} from 'react-native'
import {action, observable} from 'mobx';
import {STORAGE} from '../utils/const'
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

const tokenInit =  ''
const urlInit = ENV_URL.DEV
const authInit: any = null
const user: any = null

class common implements Common{
  @observable url = urlInit
  @observable token = tokenInit
  @observable auth = authInit
  @observable user = user
  @observable loading = false
  
  @action
  initState(state: any) {
    const {token, url, auth} = state
    Object.assign(this, {
      token: token || tokenInit,
      url: url || urlInit,
      user: auth || authInit
    })
  }

  @action
  changeUrl(url: ENV_URL) {
    this.url = url
    AsyncStorage.setItem(STORAGE.URL, url).then()
  }

  @action
  setToken(tokens: string) {
    this.token = tokens
    AsyncStorage.setItem(STORAGE.TOKEN, tokens).then()
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
    AsyncStorage.multiRemove([STORAGE.TOKEN, STORAGE.URL, STORAGE.AUTH]).then()
  }

  static fromJS() {
    return new common()
  }
}

const state = common.fromJS()

AsyncStorage.multiGet([STORAGE.TOKEN, STORAGE.URL, STORAGE.AUTH]).then(([[,token], [, url], [, auth]]) => {
  const init = {
    token, url, auth
  }
  state.initState(init)
})

export default state