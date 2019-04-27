import {NavigationActions} from 'react-navigation'

let _navigator: {dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void}

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef
}

function navigate(routeName: any, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({routeName, params})
  )
}

export default {navigate, setTopLevelNavigator}