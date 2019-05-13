import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  split: ViewStyle,
  orderTop: ViewStyle,
  checkDetail: ViewStyle,
  detail: ViewStyle,
  detailItem: TextStyle,
  checkBox: TextStyle,
  noChecked: TextStyle,
  order: TextStyle
}

const check = {
  borderRadius: 18,
  width: 36,
  height: 36,
  borderWidth: 1,
  marginTop: 20,
  lineHeight: 36
}

const style: IndexStyle = {
  split: {
    flex: 1,
    position: 'relative',
    ...variable.center,
    paddingBottom: 35
  },
  order: {
    color: '#a4a4a4',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: variable.borderColor,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  orderTop: {
    flexDirection: 'row'
  },
  checkDetail: {
    flexDirection: 'row'
  },
  checkBox: {
    ...check,
    textAlign: 'center',
    backgroundColor: variable.mainColor
  },
  noChecked: {
    ...check,
    textAlign: 'center',
    borderColor: variable.mainColor
  },
  detail: {
    width: 285,
    flexDirection: 'row'
  },
  detailItem: {
    lineHeight: 25,
  }
}

export default StyleSheet.create({...style, ...common})
