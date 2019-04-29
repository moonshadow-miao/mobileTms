import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  container: ViewStyle,
  iconfont: TextStyle,
  hover: TextStyle,
  disable: TextStyle,
  text: TextStyle,
  entrances: ViewStyle,
  entrance: ViewStyle
}

const style: IndexStyle = {
  container: {
    flex: 1,
    position: 'relative'
  },
  entrances: {
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  entrance: {
    width: 120,
    marginTop: 35,
    ...variable.center
  },
  iconfont: {
    fontSize: 45
  },
  hover: {
    color: variable.mainColor
  },
  text: {
    lineHeight: 35,
    fontSize: 16,
    textAlign: 'center'
  },
  disable: {
    color: '#a4a4a4'
  }
}

export default StyleSheet.create({...style, ...common})
