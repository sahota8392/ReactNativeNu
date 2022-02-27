import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

function RenderItem({item}) {
    if(item) {                      //if item exists, retrun title of item and image along with item description, if not, then return empty view
        return(
            <Card
                featuredTitle={item.name}
                image = {require('./images/react-lake.jpg')}>
                <Text style = {{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS
        };
    }
    
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return(         //Loads child components at once while FlatList uses Lazy loading, render part at a time on screen only to improve performance 
            <ScrollView>        
                <RenderItem 
                    item = {this.state.campsites.filter(campsite => campsite.featured)[0]}/>
                <RenderItem 
                    item = {this.state.promotions.filter(promotion => promotion.featured)[0]}/>
                <RenderItem 
                    item = {this.state.partners.filter(partner => partner.featured)[0]}/>
            </ScrollView>
        );
    }
}

export default Home;