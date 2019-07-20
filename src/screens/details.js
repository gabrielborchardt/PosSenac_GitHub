import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Image from '../components/Image'
import Api from '../providers/client'
import { stringify } from 'qs';

const IssuesRoute = () => (
    <View style={[styles.scene]} />
  );
  
  const PullRequestRoute = () => (
    <View style={[styles.scene]} />
  );
  
  const CommitRoute = () => (
      <View style={[styles.scene]}>
      <FlatList
          data={[]}
          ListEmptyComponent={<Text>Não há Commits</Text>}
          keyExtractor={(item) => item.node_id}
          renderItem={({item}) => 
          <View key={item.node_id}>
          <Card title={item.commit.author.name} >
              <Text>{item.commit.message}</Text>
          </Card>
          </View>} />
      </View>
    );

class Detail extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'issues', title: 'ISSUES' },
      { key: 'pullrequest', title: 'PULL REQUEST' },
      { key: 'commit', title: 'COMMMIT' },
    ],

    user: '',
    repo: '',

    issues: [],
    pullRequest: [],
    commits: []
    
  };

 async componentDidMount(){

    const user = {"avatar_url": "https://avatars2.githubusercontent.com/u/16567302?v=4"}
    const repo = {"full_name": "gabrielborchardt/ApiLocadora", "stargazers_count": 0}

    await this.setState({ 
        user,
        repo 
    })    

    this.loadCommits()
 }


//   async componentDidMount () { 
    
//         const user = this.props.navigation.state.params.user 
//         const repo = this.props.navigation.state.params.repo
        
//         this.setState({ 
//                 user,
//                 repo 
//         })
    
//         this.loadIssues()
//     }

    async loadIssues(){
        const issues = await Api.get('/repos/' + this.state.repo.full_name + '/issues')
        this.setState({  
            issues
        })
    }

    async loadCommits(){
        let commits = await Api.get('repos/' + this.state.repo.full_name + '/commits')
        console.log('commits: ' + JSON.stringify(commits))
        this.setState({  
            commits
        })        
    }    
        
  render() {
    return (
       
        <>
        
        <View style={styles.container}>
        
            <Image source={{uri: this.state.user.avatar_url}} />

            <Text style={[styles.text]}>{this.state.repo.full_name}</Text>

            <Text style={[styles.text]}>{this.state.repo.stargazers_count}</Text>

        </View>

        <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    issues: IssuesRoute,
                    pullrequest: PullRequestRoute,
                    commit: CommitRoute
                })}
                onIndexChange={index => this.setState({ index })}
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
});


export default Detail