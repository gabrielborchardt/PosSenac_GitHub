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
      title: "BUSCAR REPOSITÓRIOS"
    }
  }, 
  Details : {
    screen: Details,
    navigationOptions: { 
      title: "USUÁRIO"
    } 
  },     
})

export default createAppContainer(Root)