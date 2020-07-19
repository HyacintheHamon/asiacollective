import { Dimensions } from 'react-native';
import { NavigationActions, StackActions } from "react-navigation";


let _navigator;

setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

replace = (routeName, params) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })]
  });

  _navigator.dispatch(resetAction);
};

forceReplace = (routeName, _nav) => {
   navigate(routeName);
   replace(routeName);
}

back = key => {
  _navigator.dispatch(
    NavigationActions.back({
      key
    })
  );
};

export default {
  navigate,
  replace,
  back,
  setTopLevelNavigator,
  forceReplace
};
