import {PRODUCT_URL} from '../utils/const'
import {common} from '../store'
import {Toast} from '@ant-design/react-native'
// import {} from 'react-navigation'

interface FetchOptions {
  url: string,
  method?: 'GET' | 'POST',
  data: any,
  formData?: boolean,
  query?: boolean,
  loading?: boolean
}

const Fetch: (option: FetchOptions) => Promise<any> = ({url, method = 'POST', data: body, formData = false, query = false, loading = false}) => {
  loading && common.openLoading()
  const URL_PRE = __DEV__? common.url : PRODUCT_URL
  url = URL_PRE + url
  const headers =  {
    'content-type': formData ? 'application/x-www-form-urlencoded' : 'application/json',
    'MOBILE-TOKEN': common.token
  }
  if (query) {
    url += '?'
    for (let key  in body) {
      const value = body[key]
      url += key + '=' + value + '&'
    }
    url = url.slice(0, -1)
  }
  const params = body ? {method, headers} : {method, headers, body}
  return fetch(url, params).then(res => res.json()).then((res: any) => {
    loading && common.closeLoading()
    if (res.status && res.status !== 200) {
      throw Error(res.message)
    }
    if (!res.success) {
      if (res.errorCode === 'ILLEGAL_IDENTITY_AUTHENTICATION') {

        return
      }
      throw Error(res.messages && res.messages.toString())
    }
    return res
  }).catch((err: any) => {
    loading && common.closeLoading()
    const msg = err.message || err.errMsg
    Toast.fail(msg, 1)
    throw Error(msg)
  })
}

export default Fetch
