import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import style from './navBarStyle'
import {NavigationScreenProp} from 'react-navigation'
import LinearGradient from "react-native-linear-gradient";
import {Icon} from '@ant-design/react-native'

interface Props {
  navigation: NavigationScreenProp<any, any>,
  title: string,
  showBack?: boolean
}

class NavBar extends React.PureComponent<Props> {
  static defaultProps = {
    showBack: true
  }

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const {title, showBack} = this.props
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#5830ae', '#ec6e5e']}>
        <View style={style.navContainer}>
          {
            showBack && <TouchableWithoutFeedback style={style.back} onPress={this.navigateBack}>
              <Icon name='left' size={35} color='#fff' />
            </TouchableWithoutFeedback>
          }
          <Text style={style.title}>{title}</Text>
        </View>
      </LinearGradient>
    )
  }
}

export default NavBar
