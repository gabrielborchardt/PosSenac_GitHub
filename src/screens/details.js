import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Image from '../components/Image'
import Api from '../providers/client'

const IssuesRoute = () => (
  <View style={[styles.scene]} />
);

const PullRequestRoute = () => (
  <View style={[styles.scene]} />
);

class Detail extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'issues', title: 'ISSUES' },
      { key: 'pullrequest', title: 'PULL REQUEST' },
    ],

    user: '',
    repo: '',

    avatar: '',

    issues: [],
    
  };

  async componentDidMount () { 
        this.setState({ 
            user = this.props.navigation.state.params.user,
            repo  = this.props.navigation.state.params.repo,
        })

        this.loadIssues()

    }

    async loadIssues(){
        const issues = await Api.get('/repos/' + this.state.full_name + '/' + this.state.repo + '/issues')
        this.setState({  
            issues
        })
    }

  render() {
    return (
       
        <>
        
        <View style={styles.container}>
        
            <Image source={{uri: this.state.user.avatar}} />

            <Text style={[styles.text]}>{this.state.user.repo}</Text>
            
            <Text style={[styles.text]}>{this.state.user.description}</Text>

            <Text style={[styles.text]}>{this.state.user.qtdStars}</Text>

        </View>

        <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    issues: IssuesRoute,
                    pullrequest: PullRequestRoute,
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