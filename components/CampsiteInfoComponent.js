import React, { Component } from 'react'
import { Text, View, ScrollView, Flatlist } from 'react-native';
import { Card, Icon} from 'react-native-elements';           //because we want the list of the camps to show as cards & Icon so we can have the favorites icon
import { FlatList } from 'react-native-gesture-handler';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';

function RenderCampsite(props) {           //changed campsite to props as we need entire props now rather than just campsite
    
    const {campsite} = props;

    if(campsite) {
        return(                                         //if campsite is truthy return a Card component
            <Card 
                    featuredTitle = {campsite.name}     
                    image = {require('./images/react-lake.jpg')}>
                <Text style = {{margin: 10}}>               
                    {campsite.description}            {/* text will appear in this style which is the description per campsite  */}
                </Text>
                <Icon                                                                   //Bootstrap - icon of the favorite heart symbol we want to show
                    name = {props.favorite ? 'heart' : 'heart-o'}                       //if true then the solid heart and if false, then the outlined version shows
                    type = 'font-awesome'   
                    color = '#f50'
                    raised                      //subtle shadow effecg
                    reverse                     //reverse color scheme
                    onPress = {() => props.favorite ?                                   //onPress if it's a favorite then just log that it is already a favorite otherwise mark as favorite
                        console.log('Already a Favorite') : props.markFavorite()}
                />   
            </Card>
        );
    }

    return <View />;        //returns if the campsites is falsy - did not get a valid campsite object shows empty view
}

function RenderComments({comments}) {                                                       //function to show the comments of each campsite

    const renderCommentItem = ({item}) => {
        return(                                                     //First will be text, then rating and then audthor/date
            <View style = {{margin: 10}}>
                <Text style = {{fontSize: 14}}>{item.text}</Text>                           
                <Text style = {{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style = {{fontSize: 12}}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title = 'Comments'>
            <FlatList   
                data = {comments}                           //render comments data into this flatlist
                renderItem = {renderCommentItem}            //renderItem  taking the comement items above into the final form
                keyExtractor = {item => item.id.toString()}
            />
        </Card>
    );
}

// function CampsiteInfo(props) {       //changed function to Class componenet so we can use local store data
class CampsiteInfo extends Component {      //class - so we need to wrap everything inside {}
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,              //brought comments array into local state of comments
            favorite: false                  //initial state is that it is not a favorite site
        };
    }

    markFavorite() {                        //eventHandler to toggle favorite to true when clicking icon
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);          //filtering for particular campsite we want to render based campsiteId into comments that is below
        return (                                                //after changing function to class, we took out props.campsite and just {campsites}
            <ScrollView>
                <RenderCampsite campsite = {campsite} 
                    favorite = {this.state.favorite}                //passing initial state
                    markFavorite={() => this.markFavorite()}      //passing markFavorite as onPress
                />  
                <RenderComments comments = {comments} />
            </ScrollView>
        );
    }
}

export default CampsiteInfo;