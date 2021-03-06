import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
// import { PARTNERS } from '../shared/partners';            Removed since we will fetch data from json server via redux instead
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';      //after installation of expo install react-native-animatable

const mapStateToProps = state => {      //receives state as prop and returns partners data from state
    return {
        partners: state.partners
    };
};

function Mission() {
    return(
        <Text style = {{margin: 10}}>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
        </Text>
    )
}

class About extends Component {
    // constructor(props) {
    //     super(props);                No longer using local state to manage partners data after Redux
    //     this.state = {
    //         partners: PARTNERS
    //     };
    // }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({item}) => {
            return(
                <ListItem
                    title = {item.name}
                    subtitle = {item.description}
                    leftAvatar = {{source: {uri: baseUrl + item.image}}}        //getting image from server + relative image path stored in item.image
                    // leftAvatar = {{source: require('./images/bootstrap-logo.png')}}
                />                    
            );
        };

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }

                                                                                                //Animatable.View --- animation style, style is for 2 second and will wait 1 second to start
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation = 'fadeInDown' duration ={2000} delay={1000}>    
                        <Mission />
                        <Card
                            title='Community Partners'>
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }

        return(
            <ScrollView>
                <Animatable.View animation = 'fadeInDown' duration ={2000} delay={1000}>    
                    <Card title = 'Our Mission'>
                    <Mission />
                    </Card>

                    <Card title = 'Community Partners'>
                        <FlatList
                            data = {this.props.partners.partners}           //changed from state.partners -- current is partners.partners since 1st refers to entire part of state & 2nd is partner's data array
                            renderItem = {renderPartner}
                            keyExtractor = {item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);     //connecting About component to redux store so it receives partners props