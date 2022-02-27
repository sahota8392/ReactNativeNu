import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
// import { CAMPSITES } from '../shared/campsites';  removed, no longer in use
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const DirectoryNavigator = createStackNavigator(        //One stack navigator stored in this constant
    {                                                       //components available for stack  
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',                  //when navigation open, this default name will show
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

const AppNavigator = createAppContainer(DirectoryNavigator);    //passing stack navigator above to the function createAppContainer

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