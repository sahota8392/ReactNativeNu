//No state data so only component in this project that does not need to be connected to redux
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';      //after installation of expo install react-native-animatable
import * as MailComposer from 'expo-mail-composer';         //after expo install expo-mail-composer - we are importing all as MailComposer

class Contact extends Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {                                    //for sharing via email - defaul set below when sharing email
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co'],    //array of emails and the recipient it will email to
            subject: 'Inquiry',
            body: 'To Whom It May Concern:'
        })
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation = 'fadeInDown' duration ={2000} delay={1000}>    
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

                            <Button 
                                title = 'Send Email'
                                buttonStyle = {{backgroundColor: '#5637DD', margin: 40}}
                                icon = {<Icon
                                            name = 'envelope-o'
                                            type = 'font-awesome'
                                            color = '#fff'
                                            iconStyle={{marginRight: 10}}
                                        />
                                }
                                onPress = {() => this.sendMail()}
                            />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;