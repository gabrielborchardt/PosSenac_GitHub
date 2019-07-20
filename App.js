import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import Home from './src/screens/home'
import Details from './src/screens/details'

const Root = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
        header: null
    }
  }, 
  Details : {
    screen: Details,
    navigationOptions: { 
        header: null
    } 
  },     
})

export default createAppContainer(Root)