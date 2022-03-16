import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {                  //will hold username & PW empty strings
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {        //included as a screen in the navigation with a title
        title: 'Login'
    }

    handleLogin() {                     //EventHandler will be called when the button is pressed
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {                                                  //if remember me checkbox is checked, save the username/pw
            SecureStore.setItemAsync('userinfo', JSON.stringify(                    //first argument is userinfo which is the key
                {username: this.state.username, password: this.state.password}))    //passing values we want to store but need to convert to strings
                .catch(error => console.log('Could not save user info', error));    //if there is an error -- console log the error of not saving user info
        } else {                                                                   
            SecureStore.deleteItemAsync('userinfo')                                 //do not save the userinfo if the remember me checbox is not selected
                .catch(error => console.log('Could not delete user info', error));  //if there is an error, log the error in the console
        }
    }

//Ensure userinfo retrieved from SecureStore when component mounts
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')                           //check for any data saved in userinfo -- returns value if stored
            .then(userdata => {                                        //access the previous stored data using javascript -- userdata is just intermediary name
                const userinfo = JSON.parse(userdata)                  //change back to javascript object (String to object)
                if(userinfo) {                                         //actually contains a non-null truthy value, if so update login state with username/pw from user object above
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }


//Login information
//placeholder shows Username
//leftIcon is style and name
//onChangeText changes the original state to this new state of username entered
//value is always reflects the state
//leftIconstyle is the style format 
//Input 2 is for the password
//checkbox is if user wants to save login info or not
//login view is for the button to login which calls the handleLogin eventhandler
    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
})

export default Login;