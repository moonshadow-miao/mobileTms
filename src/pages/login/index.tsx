import React, {Component} from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import commonStyle, {variable} from '../../style'
// @ts-ignore
import logo from '../../assets/images/logoTnet.png'
import {Button, InputItem, Icon, Picker, Provider, Toast, List} from '@ant-design/react-native'
import LinearGradient from 'react-native-linear-gradient'
import {ENV_LABEL, ENV_URL} from '../../utils/const'
import {API_GET_VALID_CODE} from '../../api'

interface Props {
  common: Common
}

type inputNumber = number | ''

interface State {
  tel: inputNumber,
  validCode: string,
  text: string,
  envRange: Option[],
  domainList: any[],
  domainCode: inputNumber,
  showModal: boolean
}

type Option = {
  label: ENV_LABEL,
  value: ENV_URL
}

type InputType = 'tel' | 'validCode'

let timeOut: number
// const IsDev: boolean = process.env.NODE_ENV === 'development'
// let PreToken: string

const SendCode: (props: { sendValid: any }) => JSX.Element = (props: { sendValid: any}) => (<View style={style.sendContainer}>
  <TouchableWithoutFeedback onPress={props.sendValid}>
    <Text style={style.sendText}>发送验证码</Text>
  </TouchableWithoutFeedback>
</View>)


@inject('common')
@observer
class Index extends Component<Props, State> {
  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {
      tel: '',
      validCode: '',
      text: '发送验证码',
      envRange: [{label: ENV_LABEL.DEV, value: ENV_URL.DEV}, {label: ENV_LABEL.UAT, value: ENV_URL.UAT}, {label: ENV_LABEL.DEMO, value: ENV_URL.DEMO}, {label: ENV_LABEL.PRODUCT, value:ENV_URL.PRODUCT}],
      domainList: [],
      domainCode: '',
      showModal: false
    }
  }

  changeInput: (key: InputType, value: string) => void = (key, value) => {
    const state = this.state
    this.setState({...state, [key]: +value || ''})
  }

  onChangeEnv = ([url]: ENV_URL[] = []) => {
    const {common} = this.props
    common.changeUrl(url)
  }

  sendValid = () =>{
    const {text, tel} = this.state
    if (!tel) {
      Toast.fail('请输入手机号码', 1)
      return
    }
    if (tel.toString().length !== 11 ) {
      Toast.fail('请输入正确的手机号码', 1)
      return
    }
    if (text !== '发送验证码') return
    API_GET_VALID_CODE(`/app/mobile/auth/sendSms/${tel}`).then(() => {
      Toast.success('发送成功', 1)
    })
    this.setState({text: 30 + 's后重试'})
    let time: number = 30
    // @ts-ignore
    timeOut = setInterval(() => {
      if (time === 0) {
        this.setState({text: '发送验证码'})
        clearInterval(timeOut)
        return
      }
      time--
      const text = time + 's后重试'
      this.setState({text})
    }, 1000)
  }

  getDomain = () => {
    console.log(1)
    const {validCode} = this.state
    if (!validCode) {
      // Taro.atMessage({message: '请输入验证码', type: 'warning'})
      return
    }
    // this.props.common.openLoading()
    // API_GET_DOMAIN_LIST({phone: tel, captcha: validCode}).then(({vo: {domains = [], preToken}}) => {
    //   PreToken = preToken
    //   if (!domains || !domains.length) {
    //     Taro.atMessage({message: '您的手机号没有在TNET中注册', type: 'warning'})
    //     this.props.common.closeLoading()
    //     return
    //   }
    //   if (domains.length > 1) {
    //     const domainList = domains.map(item => ({label: item.name, value: item.code}))
    //     this.props.common.closeLoading()
    //     this.setState({domainList, domainCode: domains[0].code, showModal: true})
    //     return
    //   }
    //   this.login(domains[0].code, true).then()
    // }).catch(() => {
    //   this.props.common.closeLoading()
    // })
  }

  async login(domainCode: number, redirect: any) {
    if (!redirect) { return }
    if (!domainCode) {
      // Taro.atMessage({message: '请选择登录的公司', type: 'warning'})
      return
    }
    // const {common} = this.props
    // common.openLoading()
    // const res = await API_LOGIN({domainCode, preToken: PreToken})
    // common.setToken()
    // common.closeLoading()
    // await Taro.showToast({title: '登录成功', icon: 'success', duration: 1000})
    // await common.getAuthAndUser()
    // await Taro.switchTab({url: '../index/index'})
  }

  // selectDomain = (domainCode: number) => {
  //   // this.setState({domainCode})
  // }


  render () {
    const {tel, envRange, validCode} = this.state
    const {url} = this.props.common
    const env = envRange.find(item => item.value === url)
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} style={style.container} colors={['#3023ae', '#ec6e5e']}>
        <View style={style.mask} />
        <View style={style.content}>
          <View style={{padding: 32}}><Text style={style.title}>登 录</Text></View>
          <Image style={style.logo} source={logo} />
          <List></List>
          <View style ={style.inputItem} key='tel'>
            <View style={style.iconContainer}>
              <Icon name="mobile" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>手机：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} name='tel' last clear type='text' placeholder='请输入手机号码' value={tel.toString()} onChange={this.changeInput.bind(null, 'tel')}/>
            </View>
          </View>
          <View style ={style.inputItem} key='code'>
            <View style={style.iconContainer}>
              <Icon name="lock" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>验证码：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} name='tel' last clear type='digit' placeholder='请输入验证码' value={validCode.toString()} onChange={this.changeInput.bind(null, 'validCode')} extra={<SendCode sendValid={this.sendValid}/>} />
            </View>
          </View>
          <Button delayPressIn={0} delayPressOut={0} style={style.button} type="primary"  onPress={this.getDomain}>登录</Button>
        </View>
        <Provider>
          <Picker indicatorStyle={commonStyle.indicator} itemStyle={commonStyle.pickerItem} onChange={this.onChangeEnv} data={[envRange]} cascade={false} value={[url]}>
            <Text style={style.picker}>环境选择：{env.label}</Text>
          </Picker>
        </Provider>
      </LinearGradient>
    )
  }
}

export default Index
