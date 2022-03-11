import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
// import { ListItem } from 'react-native-elements';
import { Tile } from 'react-native-elements';               //changed ListItem to Tile for Redux
// import { CAMPSITES } from '../shared/campsites';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';      //after installation of expo install react-native-animatable

const mapStateToProps = state => {      //receives state as prop and returns partners data from state
    return {
        campsites: state.campsites
    };
};

class Directory extends Component {     //changed function to class component to store state data

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         campsites: CAMPSITES        //add campsite data to local state
    //     };
    // }

    static navigationOptions = {        //Configuring text for the title header
        title: 'Directory'
    }

render() {
    const { navigate } = this.props.navigation;         //destructing navigation from the navigation prop since that's what we need 
    const renderDirectoryItem = ({item}) => {
        return(
            <Animatable.View animation = 'fadeInRightBig' duration ={2000} delay={2000}>    
                <Tile                                           //changed ListItem to Tile component
                    title = {item.name}                         //name of item will be title
                    caption = {item.description}               //description as subtitle
                    featured
                    onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}   //updated onPress since the props.onPress -below- was calling onCampsite from Main component and we deleted that
                    imageSrc = {{uri: baseUrl + item.image}}
                    // onPress = {() => props.onPress(item.id)}    //when pressed on mobile device, this will trigger oncampsite event handler that we passed in props and gave name onPress as well
                    // leftAvatar = {{ source: require('./images/react-lake.jpg')}}    //leftAvatar is prop requiring object so we use two sets of {}; 1st{} embed JavaScript in JSX and 2nd{} to define object literal
                />
            </Animatable.View>
        );
    };

    if (this.props.campsites.isLoading) {
        return <Loading />;
    }
    if (this.props.campsites.errMess) {
        return (
            <View>
                <Text>{this.props.campsites.errMess}</Text>
            </View>
        );
    }
    
    return (
        <FlatList
            data = {this.props.campsites.campsites}                    //campsites data is to this.state so we don't use props.campsite
            // data = {props.campsites}                        //where it's getting data from
            renderItem = {renderDirectoryItem}              //how to render each item in list, function above
            keyExtractor = {item => item.id.toString()}     //unique key in React Native - using id
        />
    );      
    }
}

export default connect(mapStateToProps)(Directory);