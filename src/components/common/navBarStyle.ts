import {ViewStyle, StyleSheet, TextStyle} from 'react-native'
import common from '../../style'

interface IndexStyle {
  navContainer: ViewStyle,
  title: TextStyle,
  back: ViewStyle,
  filter: ViewStyle,
  filterTitle: TextStyle,
  inputContainer: ViewStyle,
  picker: ViewStyle,
  input: TextStyle,
  search: TextStyle
}

const style: IndexStyle = {
  navContainer: {
    height: 85,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 5
  },
  title: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    textAlign: 'center'
  },
  filterTitle: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 8,
    left: 150
  },
  back: {
    paddingLeft: 15
  },
  filter: {
    flex: 1
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    height: 38,
    position: 'relative',
    padding: 0
  },
  input: {
    height: 36,
    marginLeft: 20
  },
  search: {
    position: 'absolute',
    padding: 5,
    top: 2
  },
  picker: {
    width: 60,
    height: 36
  }
}

export default StyleSheet.create({...style, ...common})
