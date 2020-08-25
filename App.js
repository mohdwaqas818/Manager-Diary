import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from "./src/App";

const navigator = createStackNavigator(
  {
    App: App,
  },
  {
    initialRouteName: "App",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false
    }
  }
);

export default createAppContainer(navigator);
