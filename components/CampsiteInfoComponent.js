import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';           //because we want the list of the camps to show as cards
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({campsite}) {
    if(campsite) {
        return(                                         //if campsite is truthy return a Card component
            <Card
                featuredTitle = {campsite.name}
                image = {require('./images/react-lake.jpg')}
            >
                <Text style = {{margin: 10}}>               
                    {campsite.description}            {/* text will appear in this style which is the description per campsite  */}
                </Text>
            </Card>
        );
    }

    return <View />;        //returns if the campsites is falsy - did not get a valid campsite object shows empty view
}

// function CampsiteInfo(props) {       //changed function to Class componenet so we can use local store data
class CampsiteInfo extends Component {      //class - so we need to wrap everything inside {}
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return <RenderCampsite campsite = {campsite} />;        //after changing function to class, we took out props.campsite
    }
}

export default CampsiteInfo;