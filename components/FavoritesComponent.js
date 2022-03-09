import React, { Component } from 'react';                       //component so we can use class component
import { FlatList, View, Text, StyleSheet } from 'react-native';            
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';                          //access campsites from redux stores so we need connect function
import { Loading } from './LoadingComponent';                   //show Loading component while assets loading
import { baseUrl} from '../shared/baseUrl';                     //images from json server
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';       //when we want to dispatch action creator from component, use mapDispatchToProps

const mapStateToProps = state => {                              //will need campsite data from state and favorites
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {                                    //delete favorite action creator we want to map to props along with campsiteId as parameter; also add in connect function 
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
}

class Favorites extends Component {

    static navigationOptions = {                                //adding stack navigator with title My Favorites
        title: 'My Favorites'
    }

    render() {                                                  //if still loading, return loading component ---  if error, return error message

        const { navigate } = this.props.navigation;             //destructure out the navigation prop
        const renderFavoriteItem = ({item}) => {                //destructure current item from array -- return ListItem with title, subtitle, image (avatar) and onPress
            return (                                            //ListItem in SwipeRow so it can be swiped -- rightOpen means it opens on right side with -100 right to left pixel to swipe to open
                                            //View -- 2 of them expected by SwipeRow  -- 1st is hidden view with extra options when you swipe and 2nd contains default before you swipe
                                            //touchableOpacity is the hidden delete view
                <SwipeRow rightOpenValue = {-100} style = {styles.SwipeRow}>              
                    <View style ={styles.deleteView}>      
                        <TouchableOpacity
                            style = {styles.deleteTouchable}
                            onPress = {() => this.props.deleteFavorite(item.id)}
                        >
                            <Text style = {styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem
                            title = {item.name}
                            subtitle = {item.description}
                            leftAvatar = {{source: {uri: baseUrl + item.image}}}
                            onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}
                        />
                    </View>
                </SwipeRow>
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

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);             //connecting Favorites to mapStatetoProps