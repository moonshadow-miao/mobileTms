import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native'
import common, {variable} from '../../style'

interface IndexStyle {
  container: ViewStyle,
  mask: ViewStyle,
  content: ViewStyle,
  title: TextStyle,
  logo: ImageStyle,
  inputItem: ViewStyle,
  iconContainer: ViewStyle,
  iconText: TextStyle,
  input: TextStyle,
  button: TextStyle,
  sendText: TextStyle,
  sendContainer: ViewStyle,
  picker: TextStyle
}

const style: IndexStyle = {
  container: {
    flex: 1,
    position: 'relative'
  },
  mask: {
    opacity: 0.2,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#fff',
    top: 0,
    left: 0
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: 20
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  logo: {
    width: 275,
    height: 158,
    marginTop: 30,
    marginLeft: 40
  },
  inputItem: {
    marginTop: 35,
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row'
  },
  iconContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16
  },
  input: {
    flex: 1,
    height: 50,
    ...variable.center,
    fontSize: 12
  },
  sendContainer: {
    borderLeftColor: variable.borderColor,
    borderLeftWidth: 1,
    paddingLeft: 10
  },
  sendText: {
    ...variable.center,
    color: variable.mainColor
  },
  picker: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: variable.mainColor,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    lineHeight: 30
  },
  button: {
    marginTop: 50,
    height: 38
  }
}

export default StyleSheet.create({...style, ...common})
