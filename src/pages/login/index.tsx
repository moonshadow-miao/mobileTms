import React, {Component} from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import commonStyle, {variable} from '../../style'
// @ts-ignore
import logo from '../../assets/images/logoTnet.png'
import {Button, InputItem, Icon, Picker, Provider, Toast, Modal} from '@ant-design/react-native'
import LinearGradient from 'react-native-linear-gradient'
import {ENV_LABEL, ENV_URL} from '../../utils/const'
import {API_GET_VALID_CODE, API_GET_DOMAIN_LIST, API_LOGIN} from '../../api/index'
import {NavigationScreenProp} from 'react-navigation'

interface Props {
  common: Common,
  navigation: NavigationScreenProp<any, any>
}

type inputNumber = number | ''

interface State {
  tel: inputNumber,
  validCode: string,
  text: string,
  envRange: Option[],
  domainCode: inputNumber
}

type Option = {
  label: ENV_LABEL,
  value: ENV_URL
}

type InputType = 'tel' | 'validCode'

let timeOut: number
let PreToken: string

const SendCode: (props: {sendValid: any, text: string}) => JSX.Element = props => (<View style={style.sendContainer}>
  <TouchableWithoutFeedback onPress={props.sendValid}>
    <Text style={style.sendText}>{props.text}</Text>
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
      domainCode: ''
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
    const {validCode, tel} = this.state
    if (!validCode) {
      Toast.fail('请输入验证码', 1)
      return
    }
    this.props.common.openLoading()
    API_GET_DOMAIN_LIST({phone: +tel, captcha: validCode}).then(({vo: {domains = [], preToken}}) => {
      PreToken = preToken
      if (!domains || !domains.length) {
        Toast.fail('您的手机号没有在TNET中注册', 1)
        this.props.common.closeLoading()
        return
      }
      if (domains.length > 1) {
        const domainList = domains.map((item: {name: string, code: number}) => ({text: item.name, onPress: () => this.login(item.code).then()}))
        this.props.common.closeLoading()
        Modal.operation(domainList)
        return
      }
      this.login(domains[0].code, true).then()
    }).catch(() => {
      this.props.common.closeLoading()
    })
  }

  async login(domainCode: number, redirect?: any) {
    if (!redirect) { return }
    const {common} = this.props
    common.openLoading()
    const res = await API_LOGIN({domainCode, preToken: PreToken})
    common.setToken(res)
    common.closeLoading()
    Toast.success('登录成功', 1)
    await common.getAuthAndUser()
    this.props.navigation.navigate('Details')
  }

  render () {
    const {tel, envRange, validCode, text} = this.state
    const {url} = this.props.common
    const env = envRange.find(item => item.value === url)
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} style={style.container} colors={['#3023ae', '#ec6e5e']}>
        <View style={style.mask} />
        <View style={style.content}>
          <View style={{padding: 32}}><Text style={style.title}>登 录</Text></View>
          <Image style={style.logo} source={logo} />
          <View style ={style.inputItem} key='tel'>
            <View style={style.iconContainer}>
              <Icon name="mobile" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>手机：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} maxLength={11} name='tel' last clear type='number' placeholder='请输入手机号码' value={tel.toString()} onChange={this.changeInput.bind(null, 'tel')}/>
            </View>
          </View>
          <View style ={style.inputItem} key='code'>
            <View style={style.iconContainer}>
              <Icon name="lock" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>验证码：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} name='tel' last clear type='number' placeholder='请输入验证码' value={validCode} onChange={this.changeInput.bind(null, 'validCode')} extra={<SendCode text={text} sendValid={this.sendValid}/>} />
            </View>
          </View>
          <Button delayPressIn={0} delayPressOut={0} style={style.button} type="primary"  onPress={this.getDomain}>登录</Button>
        </View>
        {
          __DEV__  && <Provider>
            <Picker indicatorStyle={commonStyle.indicator} itemStyle={commonStyle.pickerItem} onChange={this.onChangeEnv} data={[envRange]} cascade={false} value={[url]}>
              <Text style={style.picker}>环境选择：{env.label}</Text>
            </Picker>
          </Provider>
        }
      </LinearGradient>
    )
  }
}

export default Index
