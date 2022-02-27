import React, { Component } from 'react';

import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './ AboutComponent';
import Contact from './ContactComponent';

import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
// import { CAMPSITES } from '../shared/campsites';  removed, no longer in use
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

const DirectoryNavigator = createStackNavigator(        //One stack navigator stored in this constant
    {                                                   //components available for stack  
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }          //has 2 screens so we have 2
    },
    {
        initialRouteName: 'Directory',                  //when navigation open, this default name will show since 2 screens otherwise not needed
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const AboutNavigator = createStackNavigator(
    {
        Home: { screen: About }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Home: { screen: Contact }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

const AppNavigator = createAppContainer(MainNavigator);            //swapped the Directory with the Main
// const AppNavigator = createAppContainer(DirectoryNavigator);    //passing stack navigator above to the function createAppContainer

class Main extends Component {
    // constructor(props) {
    //     super(props);       //constructor and super are need for the this.state
    //     this.state = {
    //         campsites: CAMPSITES,
    //         selectedCampsite: null      //we will be able to select campsites, beginning is no selection
    //     };
    // }

    // onCampsiteSelect(campsiteId) {                          //selected campsite updates this.state 
    //     this.setState({selectedCampsite: campsiteId});
    // }

    render() {
        return (
                    //flexible component of normal size and View is used to wrap so both Directory/CampsiteInfo appear
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight   //padding Top based on platform - if ios, then 0 otherwise will use bar height (expo constants installed in terminal)
            }}>
                <AppNavigator />                
                {/* <Directory                                  //on button click, campsiteId will be the new selected campsite
                    campsites = {this.state.campsites} 
                    onPress = {campsiteId => this.onCampsiteSelect(campsiteId)}     //contains the onCampsiteSelect event handler inside the function body, passing to Directory component so it's available to be triggered from there
                />

                <CampsiteInfo                        //Passing entire campsite object:  array of campsite object filtered to look for matching campsite Id
                    campsite = {this.state.campsites.filter(
                        campsite => campsite.id === this.state.selectedCampsite)[0]}        //filter returns an array so we grab the first item @ index 0
                /> */}
            </View>
        );
    }
}

export default Main;