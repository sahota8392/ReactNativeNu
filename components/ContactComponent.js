//No state data so only component in this project that does not need to be connected to redux
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return(
            <ScrollView>
                <Card
                    title = 'Contact information' 
                    wrapperStyle = {{margin: 20}}>
                        <Text>
                            1 NuCamp Way {"\n"}
                            Seattle, WA 98001 {"\n"}
                            U.S.A. {"\n"}
                            {"\n"}
                            Phone: 1-206-555-1234 {"\n"}
                            Email: campsites@nucamp.co
                        </Text>
                </Card>
            </ScrollView>
        );
    }
}

export default Contact;