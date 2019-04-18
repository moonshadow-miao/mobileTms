import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native'
import common from '../../style'

interface IndexStyle {
  container: ViewStyle,
  mask: ViewStyle,
  content: ViewStyle,
  title: TextStyle,
  logo: ImageStyle,
  inputItem: ViewStyle
}

const style: IndexStyle = {
  container: {
    height: '100%',
    position: 'relative'
  },
  mask: {
    opacity: 0.8,
    height: '100%',
    position: 'absolute',
    top: 0
  },
  content: {
    position: 'relative',
    zIndex: 1
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17
  },
  logo: {
    width: 275,
    height: 158,
    marginTop: 30,
    marginLeft: 60,
    borderColor: 'blue',
    borderWidth: 2,
    backgroundColor: 'red'
  },
  inputItem: {
    marginTop: 30,
    marginRight: 60,
    marginBottom: 30,
    marginLeft: 60,
    backgroundColor: '#fff',
    display: 'flex'
  }
}

export default StyleSheet.create({...style, ...common})
