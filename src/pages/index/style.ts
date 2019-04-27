import {ViewStyle, StyleSheet} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  container: ViewStyle
}

const style: IndexStyle = {
  container: {
    flex: 1,
    position: 'relative',
    borderColor: variable.borderColor
  }
}

export default StyleSheet.create({...style, ...common})
