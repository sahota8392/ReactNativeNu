import React from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderCampsites({campsite}) {
    if(campsite) {
        return(
            <Card
                featuredTitle = {campsite.name}
                image = {require('./images/react-lake.jpg')}
            >
                <Text style = {{margin: 10}}>               
                    {campsite.description}            /* text will appear in this style which is the description per campsite  */
                </Text>
            </Card>
        );
    }

    return <View />;
}

function CampsiteInfo(props) {
    return <RenderCampsites campsite = {props.campsite} />;
}

export default CampsiteInfo;