import React from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';           //because we want the list of the camps to show as cards

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

function CampsiteInfo(props) {
    return <RenderCampsite campsite = {props.campsite} />;
}

export default CampsiteInfo;