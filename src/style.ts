import {TextStyle, ViewStyle} from 'react-native'

interface CommonStyle {
  container: ViewStyle,
  pickerItem: TextStyle,
  indicator: TextStyle
}

export const variable: Variable = {
  mainColor: '#6659c8',
  borderColor: '#b7bcc0',
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const common: CommonStyle = {
  container: {
    flex: 1,
    position: 'relative'
  },
  pickerItem: {
    lineHeight: 30,
    fontSize: 16
  },
  indicator: {
    color: variable.mainColor
  }
}

interface Variable {
  mainColor: string,
  borderColor: string,
  center: ViewStyle
}


export default common
