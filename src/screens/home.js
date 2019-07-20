import React, { Component} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import api from '../providers/client'
import { WHEN_PASSCODE_SET_THIS_DEVICE_ONLY } from 'expo-secure-store';

export default class App extends Component {
  
  state = {
    user: 'vcc',
    userRepositorios: []
  }

  componentDidMount() {
    this.search()
  }

  loadRepository() {
    return [{id: '1', title: 'Teste1', mensage: 'dsjflkdjaklfdja'},
    {id: '2', title: 'Teste2', mensage: 'dslkajfdlkajflkdajfdkaj'},
    {id: '3', title: 'pesquisa', mensage: 'dspokrçafkk55ajfdkaj'}]
  }

  async search(event) {
    console.log(event)
    console.log(this.state.user)
    const response = await api.get(`users/${this.state.user}/repos`);
    const {data} = response;
    console.log(data)
    this.setState({userRepositorios: data})

  }
  
 
render() {
   return (
   <View style={styles.container}>
     <Text>Pesquisar</Text>
      <TextInput onChangeText={this.search}/>
     <FlatList
     data={this.state.userRepositorios}
     ListEmptyComponent={<Text>Não há Repositorios Castradas</Text>}
     keyExtractor={(item) => item.id}
     renderItem={({item}) => 
     <View key={item.id}>
       <Card title={item.full_name} >
        <Text>{item.description}</Text>
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
   justifyContent: 'center',
 },
});