export enum ENV_LABEL {
  DEV = 'DEV',
  UAT = 'UAT',
  DEMO = 'DEMO',
  PRODUCT = 'PRODUCT'
}

export enum ENV_URL {
  DEV = 'http://10.30.4.60:8080',
  UAT = 'http://10.30.4.159:8080',
  DEMO = 'http://10.30.4.189:8080',
  PRODUCT = 'https://apptnet.800best.com'
}

export const STORAGE = {
  URL: __DEV__ ? 'url' : ENV_LABEL.PRODUCT + 'url',
  TOKEN: __DEV__ ? 'token' : ENV_LABEL.PRODUCT + 'token',
  USER: __DEV__ ? 'user' : ENV_LABEL.PRODUCT + 'user',
  AUTH: __DEV__ ? 'auth' : ENV_LABEL.PRODUCT + 'auth'
}

export const PRODUCT_URL = ENV_URL.PRODUCT// 生产环境的地址
