import React, { Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import api from '../providers/client'
import Input from '../components/Input'

export default class App extends Component {
  
  state = {
    user: '',
    userRepositorios: []
  }
  
  async componentDidMount(){
    await this.search()
  }

  search = async () => {
    try {

      let response = await api.get(`users/${this.state.user}/repos`)

      if(response.data[0].id)
        this.setState({userRepositorios: response.data})
    
    } catch (error) {
      this.setState({userRepositorios: []})
    }
  }
  
  handleChange = type => async text => {
    await this.setState({[type]: text})

    await this.search()
  }
 
render() {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Pesquisar</Text>
      
      <Input 
        placeholder="Usuário"
        value={this.state.user}
        onChangeText={this.handleChange('user')}
      />

      <FlatList
        data={this.state.userRepositorios}
        ListEmptyComponent={<Text>Não há Repositorios Castradas</Text>}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
        <View key={item.id}>
          <Card title={item.full_name} >
            <Text>{item.description}</Text>
            <Text>{item.stargazers_count}</Text>
          </Card>
        </View>} />
    </View>
 )};
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'space-between',
   flexDirection: 'column'
 },
 input:{
   borderWidth: 2
 },
 text:{
   alignSelf: 'flex-start',
   marginTop: 10,
   marginLeft: 35
 }
});