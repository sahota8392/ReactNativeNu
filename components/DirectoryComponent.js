import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {
        return(
            <ListItem
                title = {item.name}                         //name of item will be title
                subtitle = {item.description}               //description as subtitle
                onPress = {() => props.onPress(item.id)}    //when pressed on mobile device, this will trigger oncampsite event handler that we passed in props and gave name onPress as well
                leftAvatar = {{ source: require('./images/react-lake.jpg')}}    //leftAvatar is prop requiring object so we use two sets of {}; 1st{} embed JavaScript in JSX and 2nd{} to define object literal
            />
        );
    };

    return (
        <FlatList
            data = {props.campsites}                        //where it's getting data from
            renderItem = {renderDirectoryItem}              //how to render each item in list, function above
            keyExtractor = {item => item.id.toString()}     //unique key in React Native - using id
        />
    );
}

export default Directory;