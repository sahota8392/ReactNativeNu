import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {     //changed function to class component to store state data

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES        //add campsite data to local state
        };
    }

    static navigationOptions = {        //Configuring text for the title header
        title: 'Directory'
    }

render() {
    const { navigate } = this.props.navigation;         //destructing navigation from the navigation prop since that's what we need 
    const renderDirectoryItem = ({item}) => {
        return(
            <ListItem
                title = {item.name}                         //name of item will be title
                subtitle = {item.description}               //description as subtitle
                onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}   //updated onPress since the props.onPress -below- was calling onCampsite from Main component and we deleted that
                // onPress = {() => props.onPress(item.id)}    //when pressed on mobile device, this will trigger oncampsite event handler that we passed in props and gave name onPress as well
                leftAvatar = {{ source: require('./images/react-lake.jpg')}}    //leftAvatar is prop requiring object so we use two sets of {}; 1st{} embed JavaScript in JSX and 2nd{} to define object literal
            />
        );
    };

    return (
        <FlatList
            data = {this.state.campsites}                    //campsites data is to this.state so we don't use props.campsite
            // data = {props.campsites}                        //where it's getting data from
            renderItem = {renderDirectoryItem}              //how to render each item in list, function above
            keyExtractor = {item => item.id.toString()}     //unique key in React Native - using id
        />
    );      
    }
}

export default Directory;