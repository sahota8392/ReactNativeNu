import React, { Component } from 'react';                       //component so we can use class component
import { FlatList, View, Text } from 'react-native';            
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';                          //access campsites from redux stores so we need connect function
import { Loading } from './LoadingComponent';                   //show Loading component while assets loading
import { baseUrl} from '../shared/baseUrl';                     //images from json server

const mapStateToProps = state => {                              //will need campsite data from state and favorites
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {                                //adding stack navigator with title My Favorites
        title: 'My Favorites'
    }

    render() {                                                  //if still loading, return loading component ---  if error, return error message

        const { navigate } = this.props.navigation;             //destructure out the navigation prop
        const renderFavoriteItem = ({item}) => {                //destructure current item from array -- return ListItem with title, subtitle, image (avatar) and onPress
            return (
                <ListItem
                    title = {title.name}
                    subtitle = {item.description}
                    leftAvatar = {{source: {uri: baseUrl + item.image}}}
                    onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}
                />
            );
        }

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
        return(                                    //no loading/error at this point  -- pass data prop for campsites to render
            <FlatList
                data = {this.props.campsites.campsites.filter(              //take array of campsites from prop and filter for campsites where campsite id matches to list of favorites
                    campsite => this.props.favorites.includes(campsite.id)      //checks each favorite if it includes the ID of the campsite
                )}
                renderItem = {renderFavoriteItem}                               
                keyExtractor = {item => item.id.toString()}                 //passing each item to function and extracting id from each to use as unique key of each item
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);             //connecting Favorites to mapStatetoProps