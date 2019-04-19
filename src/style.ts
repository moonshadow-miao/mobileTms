import {ViewStyle} from 'react-native'

interface CommonStyle {
  container: ViewStyle
}

const common: CommonStyle = {
  container: {
    flex: 1,
    position: 'relative'
  }
}

interface Variable {
  mainColor: string,
  borderColor: string,
  center: ViewStyle
}

export const variable: Variable = {
  mainColor: '#6659c8',
  borderColor: '#b7bcc0',
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default common
