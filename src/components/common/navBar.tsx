import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import style from './navBarStyle'
import {NavigationScreenProp} from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {Icon, InputItem} from '@ant-design/react-native'

interface Props {
  navigation: NavigationScreenProp<any, any>,
  renderPicker?: any,
  onSearch?: (value: string) => void,
  title: string,
  placeholder?: string,
  filter?: boolean,
  showBack?: boolean,
}

interface State {
  value: string
}

class NavBar extends React.PureComponent<Props, State> {
  static defaultProps = {
    filter: false,
    placeholder: '',
    showBack: true
  }

  constructor (props: Readonly<Props>) {
    super(props)
    this.state = {
      value: ''
    }
  }

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  goSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state.value)
  }

  changeInput = (value: string) => {
    this.setState({value})
  }

  clear = () => {
    this.setState({value: ''}, () => {
      this.goSearch()
    })
  }

  render () {
    const {value} = this.state
    const {title, placeholder, filter, showBack, renderPicker} = this.props
    console.log(renderPicker, 1)
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#5830ae', '#ec6e5e']}>
        {
          filter ? <View style={{...style.navContainer, paddingTop: 30}}>
            {
              showBack && <TouchableWithoutFeedback style={style.back} onPress={this.navigateBack}>
                <Icon name='left' size={35} color='#fff' />
              </TouchableWithoutFeedback>
            }
            <Text style={style.filterTitle}>{title}</Text>
            <View style={style.filter}>
              <View style={style.picker}>{renderPicker}</View>
              <View style={style.inputContainer}>
                <Icon onPress={this.goSearch} name='search' style={style.search} size={26} color='#6659c8' />
                <InputItem style={style.input} allowFontScaling={false} name='search' last clear type='text' placeholder={placeholder} value={value.toString()} onChange={this.changeInput}/>
              </View>

            </View>
          </View> : <View>
            <Text style={style.title}>{title}</Text>
          </View>
        }
      </LinearGradient>
    )
  }
}

export default NavBar
