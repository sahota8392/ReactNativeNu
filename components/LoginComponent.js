import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';                    //removed button and added to react-native-elements; that allows you specify an icon to use in the button 
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import * as ImagePicker from 'expo-image-picker';                       //after installing image picker
import * as Permissions from 'expo-permissions';                        //installed permissions
import { createBottomTabNavigator } from 'react-navigation-tabs';       //installed react-navigation-tabs
import { baseUrl } from '../shared/baseUrl';

import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';

class LoginTab extends Component {          //changed Login to LoginTab

    constructor(props) {
        super(props);
        this.state = {                  //will hold username & PW empty strings
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {        //included as a screen in the navigation with a title
        title: 'Login',
        tabBarIcon: ({tintColor}) => (              //automatically receives tintColor as an argument
            <Icon 
                name = 'sign-in'
                type = 'font-awesome'
                iconStyle= {{color: tintColor}}
            />
        )
    }

    handleLogin() {                                                                 //EventHandler will be called when the button is pressed
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
        SecureStore.getItemAsync('userinfo')                                        //check for any data saved in userinfo -- returns value if stored
            .then(userdata => {                                                     //access the previous stored data using javascript -- userdata is just intermediary name
                const userinfo = JSON.parse(userdata)                               //change back to javascript object (String to object)
                if(userinfo) {                                                      //actually contains a non-null truthy value, if so update login state with username/pw from user object above
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
//styles.imageContainer is for the camera function  --- source uri image
//local image path from client side files in case it takes time to load server image   --- LoadingIndicatorSource
render() {
    return (
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
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    buttonStyle={{backgroundColor: '#5637DD'}}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.props.navigation.navigate('Register')}
                    title='Register'
                    type='clear'
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='blue'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    titleStyle={{color: 'blue'}}
                />
            </View>
        </View>
    );
}
}

//Register Component
class RegisterTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            remember: false,
            imageUrl : baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

//Get image from Camera method has async so it can await permission
    getImageFromCamera = async() => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
                // this.setState({imageUrl: capturedImage.uri});            to call the processed image instead
            }
        }
    }

//To resize the image we capture in Camera
    processImage = async(imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri, [{resize: {width: 400}}],                                   //if we only specify one dimension, it will autmatically do the other
                { format: ImageManipulator.SaveFormat.PNG}                      //converting the mainpulated image to PNG
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri});
    }

    handleRegister() {                                                                 //EventHandler will be called when the button is pressed
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

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                    </View>

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

                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
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
                                onPress={() => this.handleRegister()}
                                title='Register'
                                icon = {                                                        //Adding the Icon to the login Button --- react native element button  --- Icon component passed in this
                                    <Icon
                                        name = 'user-plus'
                                        type='font-awesome'
                                        color = '#fff'
                                        iconStyle={{marginRight: 10}}
                                    />
                                }
                                buttonStyle ={{backgroundColor: '#5637DD'}}                     
                            />
                        </View>

                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator(                     //passing two objects
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',               //active tab color
            inactiveBackgroundColor: '#CEC8FF',             
            activeTintColor: '#fff',                        //text and icon color white
            inactiveTintColor: '#808080',                   //color gray
            labelStyle: {fontSize: 16}
        }
    }
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Login;