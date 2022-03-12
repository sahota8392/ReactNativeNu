import React, { Component } from 'react'
import { Text, View, ScrollView, Flatlist, Modal, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';           //because we want the list of the camps to show as cards & Icon so we can have the favorites icon
import { FlatList } from 'react-native-gesture-handler';
// import { CAMPSITES } from '../shared/campsites';
// import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';      //after installation of expo install react-native-animatable


const mapStateToProps = state => {      //receives state as prop and returns partners data from state
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
};

function RenderCampsite(props) {           //changed campsite to props as we need entire props now rather than just campsite
    
    const {campsite} = props;

    //Rubberband effect when marked as favorite
    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true: false;      //parameter taking object and strucutre within it taking property dx (distance x-axis) -- true if less than -200 and false if not

    const panResponder = PanResponder.create({                      //equal to panResponder api creating 
        onStartShouldSetPanResponder: () => true,                    //object passed as argument describing what to create   -- activate pan responder to respond to gestures on comp it's used on
        onPanResponderGrant: () => {
            view.current.rubberBand(3000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        
        onPanResponderEnd: (e, gestureState) => {                   
            console.log('pan responder end', gestureState);         //object holding info that just ended - log will show what it contains
            if(recognizeDrag(gestureState)) {                       //passing gestureState object which will return return if gesture is more than 200 pixels to left or -200 pixels
                Alert.alert(                                        //if gestureState is true, this alert shows
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel',                         //array holding object that first one is Cancel to not proceed
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',                             //object saying ok to add to favorite -- checking if already favorite & if not, it will call markFavorite event handler
                            onPress: () => props.favorite ?
                                console.log('Already set as Favorite') : props.markFavorite()
                        }
                    ],
                    {cancelable: false}                         //prevents user from just exiting out of box, have to choose OK or Cancel
                );
            }
            return true;
        }
    });

    if(campsite) {
        return(                                         //if campsite is truthy return a Card component
            <Animatable.View 
                animation = 'fadeInDown' 
                duration ={2000} 
                delay={1000}
                ref = {view}
                {...panResponder.panHandlers}           //spread syntax to spread out pan responders panhandlers and then recombine them into one object so we can pass in as props for this component  --- connecting pan responder to this component
            >    
                <Card 
                        featuredTitle = {campsite.name}     
                        image = {{uri: baseUrl + campsite.image}} >
                    <Text style = {{margin: 10}}>               
                        {campsite.description}            {/* text will appear in this style which is the description per campsite  */}
                    </Text>

                    <View style = {styles.cardRow}>
                        <Icon                                                                   //Bootstrap - icon of the favorite heart symbol we want to show
                            name = {props.favorite ? 'heart' : 'heart-o'}                       //if true then the solid heart and if false, then the outlined version shows
                            type = 'font-awesome'   
                            color = '#f50'
                            raised                      //subtle shadow effecg
                            reverse                     //reverse color scheme
                            onPress = {() => props.favorite ?                                   //onPress if it's a favorite then just log that it is already a favorite otherwise mark as favorite
                                console.log('Already a Favorite') : props.markFavorite()}
                        />   

                        <Icon                                                //Pencil icon for the comments
                            name = 'pencil'
                            type = 'font-awesome'
                            color = '#5637DD'
                            raised
                            reverse
                            onPress = {() => props.onShowModal()}
                        />
                    </View>          
                </Card>  
            </Animatable.View>
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
                    <Rating                             //converting number rating to stars
                        startingValue={item.rating}
                        imageSize = {10}
                        style ={{alignItems: 'flex-start', paddingVertical: '5%'}}
                        readonly
                    />
                <Text style = {{fontSize: 12}}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation = 'fadeInUp' duration ={2000} delay={1000}>    
            <Card title = 'Comments'>
                <FlatList   
                    data = {comments}                           //render comments data into this flatlist
                    renderItem = {renderCommentItem}            //renderItem  taking the comement items above into the final form
                    keyExtractor = {item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

// function CampsiteInfo(props) {       //changed function to Class componenet so we can use local store data
class CampsiteInfo extends Component {      //class - so we need to wrap everything inside {}
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
    //         // campsites: CAMPSITES,
    //         // comments: COMMENTS,              //brought comments array into local state of comments
    //         favorite: false                  //initial state is that it is not a favorite site
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});      //will check current state of toggleModal and change to opposite 
    }

    handleComment(campsiteId) {
        // console.log(JSON.stringify(this.state));
        this.props.postComment(
            campsiteId, 
            this.state.rating, 
            this.state.author, 
            this.state.text
        );
        this.toggleModal();
    }

    //reset all form values back to initial value
    resetForm(){
        this.setState({
            rating: 5,
            author: '',
            text: ''
        })
    }

    markFavorite(campsiteId) {                        //eventHandler to toggle favorite to true when clicking icon
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {      //changed state.campsites and state.comments
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);          //filtering for particular campsite we want to render based campsiteId into comments that is below
        return (                                                //after changing function to class, we took out props.campsite and just {campsites}
            <ScrollView>
                <RenderCampsite campsite = {campsite} 
                    favorite = {this.props.favorites.includes(campsiteId)}                //passing initial state
                    markFavorite={() => this.markFavorite(campsiteId)}      //passing markFavorite as onPress
                    onShowModal = {() => this.toggleModal()}
                />  
                <RenderComments comments = {comments} />

                <Modal                                          //Modal component to add comments
                    animationType = {'slide'}
                    transparent = {false}
                    visible = {this.state.showModal}        
                    onRequestClose = {() => this.toggleModal()}
                >
                    <View style = {styles.modal}>
                        <Rating
                            showRating
                            startingValue = {this.state.rating}
                            imagesize = {40}
                            onFinishRating = {rating => this.setState({rating: rating})}
                            style = {{paddingVertical: 10}}
                        />

                        <Input 
                            placeholder='Author'
                            leftIcon = {{type: 'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle = {{paddingRight: 10}}
                            onChangeText = {(author) => this.setState({ author: author})}
                            value = {this.setState.author} 
                        />


                        <Input 
                            placeholder='Comment'
                            leftIcon = {{type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle = {{paddingRight: 10}}
                            onChangeText = {(text) => this.setState({ text: text})}
                            value = {this.setState.text} 
                        />

                        <View style = {{margin: 10}}>
                        <Button 
                                onPress = { () => {
                                    this.handleComment(
                                        campsiteId,
                                        this.state.rating,
                                        this.state.author,
                                        this.state.text
                                    );
                                    this.resetForm();
                                }}
                                color = '#5637DD'
                                title = 'Submit'
                            />
                        </View>

                        <View style = {{margin: 10}}>
                            <Button 
                                onPress = { () => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color = '#808080'
                                title = 'Cancel'
                            />
                        </View>

                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {                          //style for the view
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {                            //style for pencil modal
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);