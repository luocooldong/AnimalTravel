import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { add, subtract } from '../actions'
import { getPosts, likePost, unlikePost } from '../actions/post'
import styles from '../styles'

class Home extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    likePost = (post) => {
        const { uid } = this.props.user
        if (post.likes.includes(uid)) {
            this.props.unlikePost(post)
        } else {
            this.props.likePost(post)
        }
    }

    navigateMap = (item) => {
        console.log(this.props.navigation)
        this.props.navigation.navigate('Map',
            { location: item.postLocation }
        )
    }

    render() {
        if (this.props.post === null) return null
        return (
            <View style={styles.container}>
                {/* <Text>Home</Text>
                <Text>How many apps are we going to build? {this.props.counter}</Text>
                <Button title='Add' onPress={() => this.props.add()} />
                <Button title='Subtract' onPress={() => this.props.subtract()} /> */}

                <FlatList
                    data={this.props.post.feed}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const liked = item.likes.includes(this.props.user.uid)
                        return (
                            <View>
                                <View style={[styles.row, styles.center]}>
                                    <View style={[styles.row, styles.center]}>
                                        <Image style={styles.roundImage} source={item.photo ? { uri: item.photo } : require('../assets/images/robot-dev.png')} />
                                        <View>
                                            <Text>{item.username}</Text>
                                            <TouchableOpacity onPress={() => this.navigateMap(item)} >
                                                <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Ionicons style={{ margin: 5 }} name='ios-flag' size={25} />
                                </View>

                                <TouchableOpacity onPress={() => this.likePost(item)} >
                                    <Image style={styles.postPhoto} source={{ uri: item.postPhoto }} />
                                </TouchableOpacity>

                                <View style={styles.row}>
                                    <Ionicons style={{ margin: 5 }} color={liked ? '#db565b' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                                    <Ionicons style={{ margin: 5 }} name='ios-chatbubbles' size={25} />
                                    <Ionicons style={{ margin: 5 }} name='ios-send' size={25} />
                                </View>
                                <Text>{item.postDescription}</Text>
                            </View>
                        )
                    }

                    }
                />

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ add, subtract, getPosts, likePost, unlikePost }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        counter: state.counter,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)