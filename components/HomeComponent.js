import React, { Component } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';            //Don't need ScrollView, replacing with Animated below
import { Card } from 'react-native-elements';
// import { CAMPSITES } from '../shared/campsites';
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {      //receives state as prop and returns partners data from state
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if(item) {                      //if item exists, retrun title of item and image along with item description, if not, then return empty view
        return(
            <Card
                featuredTitle={item.name}
                image = {{uri: baseUrl + item.image}}>
                <Text style = {{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}
class Home extends Component {
    constructor(props) {                            //Need constructor for the Animated 
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
    //      campsites: CAMPSITES,
    //      promotions: PROMOTIONS,
    //      partners: PARTNERS
        };
    }

    animate() {                                     //can be named anything; code for the animation part
        Animated.timing(                            //Timing for animation with two arguments
            this.state.scaleValue,                  //What we are going to change over time
            {
                toValue: 1,                         //What we want the animated value to change to from initial value 0
                duration: 1500,                     //Time to animate 0 to 1(1500 milliseconds) --- 1.5 seconds
                useNativeDriver: true               //improve performance of animation 
            }
        ).start();                                  //run this animation
    }

    componentDidMount() {                           //Start and run animation just once; when home comp mounts, animation starts
        this.animate();
    }
    
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return(         //Loads child components at once while FlatList uses Lazy loading, render part at a time on screen only to improve performance 
                        //Animated.ScrollView  ---  style: type of transform we want is scale and value is set to the state.scaleValue (0 to 1)
            <Animated.ScrollView style = {{transform: [{scale: this.state.scaleValue}]}}>        
                <RenderItem 
                    item = {this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                            isLoading={this.props.campsites.isLoading}
                            errMess={this.props.campsites.errMess}
                />
                <RenderItem 
                    item = {this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                            isLoading={this.props.promotions.isLoading}
                            errMess={this.props.promotions.errMess}
                />
                <RenderItem 
                    item = {this.props.partners.partners.filter(partner => partner.featured)[0]}
                            isLoading={this.props.partners.isLoading}
                            errMess={this.props.partners.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);