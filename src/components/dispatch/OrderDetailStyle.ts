import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  split: ViewStyle,
  order: TextStyle
}

const style: IndexStyle = {
  split: {
    flex: 1,
    position: 'relative',
    ...variable.center
  },
  order: {
    color: '#a4a4a4'
  }
}

export default StyleSheet.create({...style, ...common})
