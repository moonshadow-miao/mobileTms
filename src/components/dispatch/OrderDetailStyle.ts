import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  split: ViewStyle,
  orderTop: ViewStyle,
  checkDetail: ViewStyle,
  orderBottom: ViewStyle,
  detail: ViewStyle,
  expand: ViewStyle,
  detailItem: TextStyle,
  checkBox: TextStyle,
  noChecked: TextStyle,
  order: TextStyle
}

const check = {
  borderRadius: 18,
  width: 30,
  height: 30,
  borderWidth: 1,
  marginTop: 20,
  lineHeight: 30
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
    paddingLeft: 7,
    paddingRight: 7
  },
  checkBox: {
    ...check,
    textAlign: 'center'
  },
  noChecked: {
    ...check,
    textAlign: 'center',
    borderColor: variable.mainColor
  },
  detail: {
    width: 315,
    flexDirection: 'row'
  },
  detailItem: {
    lineHeight: 25
  },
  expand: {
    width: 60,
    paddingTop: 20,
    paddingLeft: 10
  },
  orderBottom: {

  }
}

export default StyleSheet.create({...style, ...common})
