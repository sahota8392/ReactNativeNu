import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);       //constructor and super are need for the this.state
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null      //we will be able to select campsites, beginning is no selection
        };
    }

    onCampsiteSelect(campsiteId) {                          //selected campsite updates this.state to that campsite ID
        this.setState({selectedCampsite: campsiteId});
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <Directory                                  //on button click, campsiteId will be the new selected campsite
                    campsites = {this.state.campsites} 
                    onPress = {campsiteId => this.onCampsiteSelect(campsiteId)}
                />

                <CampsiteInfo                               
                    campsite = {this.state.campsites.filter(
                        campsite => campsite.id === this.state.selectedCampsite)[0]}
                />
            </View>
        );
    }
}

export default Main;