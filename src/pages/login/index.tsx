import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Common} from '../../store/common'
import style from './style'
import {variable} from '../../style'
// @ts-ignore
import logo from '../../assets/images/logoTnet.png'
import {Button, InputItem, Icon} from '@ant-design/react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  common: Common
}

enum ENV {
  DEV = 'DEV',
  UAT = 'UAT',
  DEMO = 'DEMO',
}

type inputNumber = number | ''

interface State {
  tel: inputNumber,
  validCode: string,
  text: string,
  envRange: ENV[],
  domainList: any[],
  domainCode: inputNumber,
  showModal: boolean
}

// type Option = {
//   label: string,
//   value: string
// }

type InputType = 'tel' | 'validCode'

let timeOut: number
// const IsDev: boolean = process.env.NODE_ENV === 'development'
// let PreToken: string

const SendCode: () =>  JSX.Element = () => (<View style={style.sendContainer}>
  <Text style={style.sendText}>发送验证码</Text>
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
      envRange: [ENV.DEV, ENV.UAT, ENV.DEMO],
      domainList: [],
      domainCode: '',
      showModal: false
    }
  }

  changeInput: (key: InputType, value: any) => void = (key, value) => {
    // @ts-ignore
    this.setState({[key]: value})
  }

  // @ts-ignore
  onChangeEnv = ({detail}) => {
    const {common} = this.props
    const {value} = detail
    common.changeUrlPre(value)
  }

  sendValid = () =>{
    const {text, tel} = this.state
    if (!tel) {
      // Taro.atMessage({message: '请输入手机号码', type: 'warning'})
      return
    }
    if (tel.toString().length !== 11 ) {
      // Taro.atMessage({message: '请输入正确的手机号码', type: 'warning'})
      return
    }
    if (text !== '发送验证码') return
    // API_GET_VALID_CODE(`/app/mobile/auth/sendSms/${tel}`).then(() => {
    //   Taro.atMessage({message: '发送成功', type: 'success'})
    // })
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
    const {validCode} = this.state
    if (!validCode) {
      // Taro.atMessage({message: '请输入验证码', type: 'warning'})
      return
    }
    this.props.common.openLoading()
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
    const {tel} = this.state
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} style={style.container} colors={['#3023ae', '#ec6e5e']}>
        <View style={style.mask} />
        <View style={style.content}>
          <View style={{padding: 32}}><Text style={style.title}>登 录</Text></View>
          <Image style={style.logo} source={logo} />
          <View style ={style.inputItem}>
            <View style={style.iconContainer}>
              <Icon name="mobile" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>手机：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} name='tel' last clear type='phone' placeholder='请输入手机号码' value={tel.toString()} onChange={this.changeInput.bind(null, 'tel')}/>
            </View>
          </View>
          <View style ={style.inputItem}>
            <View style={style.iconContainer}>
              <Icon name="lock" size="md" color={variable.mainColor}/>
              <Text style={style.iconText}>验证码：</Text>
            </View>
            <View style={style.input}>
              <InputItem allowFontScaling={false} name='tel' last clear type='phone' placeholder='请输入验证码' value={tel.toString()} onChange={this.changeInput.bind(null, 'tel')} extra={<SendCode/>} />
            </View>
          </View>
          <Button style={style.button} type="primary"  onPress={this.getDomain}>登录</Button>
        </View>
      </LinearGradient>
    )
  }
}

export default Index
