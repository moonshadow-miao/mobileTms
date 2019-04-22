import {PRODUCT_URL} from '../utils/const'
import {common} from '../store'

interface FetchOptions {
  url: string,
  method?: 'GET' | 'POST',
  data: any,
  formData?: boolean,
  query?: boolean,
  loading?: boolean
}

const Fetch: (option: FetchOptions) => Promise<any> = ({url, method = 'POST', data, formData = false, query = false, loading = false}) => {
  loading && common.openLoading()
  const URL_PRE = __DEV__? common.url : PRODUCT_URL
  url = URL_PRE + url
  const headers =  {
    'content-type': formData ? 'application/x-www-form-urlencoded' : 'application/json',
    'MOBILE-TOKEN': common.token
  }
  if (query) {
    url += '?'
    for (let key  in data) {
      const value = data[key]
      url += key + '=' + value + '&'
    }
    url = url.slice(0, -1)
  }
  return fetch(url,{method, headers, body: data}).then((res: any) => {
    loading && common.closeLoading()
    if (res.status && res.status !== 200) {
      throw Error(res.message)
    }
    if (!res.success) {
      if (res.errorCode === 'ILLEGAL_IDENTITY_AUTHENTICATION') {

      }
      throw Error(res.messages && res.messages.toString())
    }
    return res
  }).catch((err: any) => {
    loading && common.closeLoading()
    // const msg = err.message || err.errMsg
    throw Error(err)
  })
}

export default Fetch
