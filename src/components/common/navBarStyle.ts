import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common from '../../style'

interface IndexStyle {
  navContainer: ViewStyle,
  title: TextStyle,
  back: ViewStyle
}

const style: IndexStyle = {
  navContainer: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textAlign: 'center'
  },
  back: {
    paddingLeft: 10
  }
}

export default StyleSheet.create({...style, ...common})