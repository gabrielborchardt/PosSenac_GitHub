import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Image from '../components/Image'
import Api from '../providers/client'
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

class Detail extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'issues', title: 'ISSUES' },
      { key: 'pullrequest', title: 'PULL REQUEST' },
      { key: 'commit', title: 'COMMMIT' },
    ],

    repo: '',

    issues: [],
    pulls: [],
    commits: []
    
  };

 async componentDidMount(){

    let repo = await this.props.navigation.state.params.repo

    await this.setState({ 
        repo
    })    

    await this.changeTab(this.state.index)
}

    changeTab = async (index) => {
        this.setState({  
            index
        })

        switch (index) {
            case 0:
                await this.loadIssues()
                break;
            case 1:
                await this.loadPulls()
                    break;
            case 2:
                await this.loadCommits()
                break;                            
            default:
                break;
        }
    }

    loadIssues = async () => {
        const response = await Api.get('repos/' + this.state.repo.full_name + '/issues')
        this.setState({  
            issues: response.data
        })
    }

    loadPulls = async () => {
        const response = await Api.get('repos/' + this.state.repo.full_name + '/pulls')
        this.setState({  
            pulls: response.data
        })
    }

    loadCommits = async () => {
        const response = await Api.get('repos/' + this.state.repo.full_name + '/commits')
        this.setState({  
            commits: response.data
        })        
    }    

    IssuesRoute = () => {
        return(
            <View style={[styles.scene]}>
            <FlatList
                data={this.state.issues}
                ListEmptyComponent={<Text>Não há Issues</Text>}
                keyExtractor={(item) => item.node_id+ ''}
                renderItem={({item}) => {
                    return (<View key={item.node_id}>
                        <Card title={item.user.login} >
                            <Text>{item.title}</Text>
                        </Card>
                    </View>)
                }
                } />
            </View>
            )
    }
      
    PullRequestRoute = () => {
        return(
            <View style={[styles.scene]}>
            <FlatList
                data={this.state.pulls}
                ListEmptyComponent={<Text>Não há Pulls</Text>}
                keyExtractor={(item) => item.node_id+ ''}
                renderItem={({item}) => {
                    return (<View key={item.node_id}>
                        <Card title={item.user.login} >
                            <Text>{item.title}</Text>
                        </Card>
                    </View>)
                }
                } />
            </View>
            )
    }

    CommitRoute = () => {
        return(
            <View style={[styles.scene]}>
            <FlatList
                data={this.state.commits}
                ListEmptyComponent={<Text>Não há Commits</Text>}
                keyExtractor={(item) => item.node_id+ ''}
                renderItem={({item}) => {
                    return (<View key={item.node_id}>
                        <Card title={item.commit.author.name} >
                            <Text>{item.commit.message}</Text>
                        </Card>
                    </View>)
                }
                } />
            </View>
            )
    }

    renderScene = ({ route }) => {
        switch (route.key) {
          case 'issues':
            return this.IssuesRoute()
          case 'pullrequest':
            return this.PullRequestRoute()
          case 'commit':
            return this.CommitRoute()
          default:
            return null;
        }
      }

  render = () => {
    return (
       
        <>
        
        <View style={styles.container}>

            {
                (this.state.repo)
                ?  <Image source={{uri: this.state.repo.owner.avatar_url}} />
                :  <AI size="large" color='#fff'/>
            }

            <Text style={[styles.text]}>{this.state.repo.full_name}</Text>

            <View style={styles.header}>
                <Text style={[styles.text]}>{this.state.repo.stargazers_count} <Icon name="star" size={20} color="#c9b428" /></Text>
            </View>

        </View>

        <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index => this.changeTab(index)}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        marginBottom: 30
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
    scene: {
        flex: 1,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

const AI = styled.ActivityIndicator`
`


export default Detail