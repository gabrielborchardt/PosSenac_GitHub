import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import Home from './src/screens/home'

const Root = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Root)