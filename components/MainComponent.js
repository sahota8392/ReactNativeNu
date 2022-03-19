import React, { Component } from 'react';

import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

import Reservation from './ReservationComponent';       //the reservation form import
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';

import Constants from 'expo-constants';
import { View, Platform, StyleSheet, Text, ScrollView, Image, Alert, ToastAndroid } from 'react-native';


// import { CAMPSITES } from '../shared/campsites';  removed, no longer in use
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';         //for iphoneX - defines part of area as safe where nothing will layout in certain area for physical area of phone
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import NetInfo from '@react-native-community/netinfo';


const mapDispatchToProps = {        //allows us to access ActionCreators as props
    fetchCampsites,
    fetchComments,
    fetchPartners,
    fetchPromotions
}

const DirectoryNavigator = createStackNavigator(        //One stack navigator stored in this constant
    {                                                   //components available for stack  
        Directory: { 
            screen: Directory,
            navigationOptions: ({navigation}) => ({     //navigation prop passed in parameter list
                headerLeft: <Icon
                    name = 'list'
                    type = 'font-awesome'
                    iconStyle = {styles.stackIcon}      //custom style we created
                    onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
                />
            })
        },
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
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'home'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}      //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        Home: { screen: About }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'info-circle'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}      //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Home: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'address-card'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}      //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

//Stack Navigator for the Reservation
const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'tree'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}      //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

//Favorites Navigator 
const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'heart'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}      //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({      //destructure navigation prop in parameter list - arrow function and wrap styles in curly braces
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name = 'sign-in'
                type = 'font-awesome'
                iconStyle = {styles.stackIcon}                     //custom style we created
                onPress = {() => navigation.toggleDrawer()}     //onPress prop of icon component to make it interactive and we use navigation prop built in toggledrawer
        />
        })
    }
);

const CustomDrawerContentComponent = props => (         //will receive props as parameter and return the view of customized drawer  //flex 1 will take 1/3 of space and flex 2 will take 2/3 of space
    <ScrollView>
        <SafeAreaView                                 
            style = {styles.container}
            forceInset= {{top: 'always', horizontal: 'never'}}
        >
            <View style = {styles.drawerHeader}>    
                <View style = {{flex: 1}}>              
                    <Image                                              //Nucamp logo with drawer image style
                        source = {require('./images/logo.png')}
                        style = {styles.drawerImage}
                    />
                </View>
                <View style = {{flex: 2}}>      
                    <Text style = {styles.drawerHeaderText}>Nucamp</Text>           
                </View>
            </View>
            <DrawerItems {...props} />      
            </SafeAreaView>
    </ScrollView>
)
//showing items in side drawer of DrawerItems - spreading into props

const MainNavigator = createDrawerNavigator(
    
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {                        //object contains prop
            drawerIcon: ({tintColor}) => (              //drawerIcon is prop with function tintColor which is available by default
                    <Icon   
                        name = 'sign-in'
                        type = 'font-awesome'
                        size = {24}                     
                        color = {tintColor}             //value of tintColor will change baesd on active screen or not - default colors
                    />
                )
            }
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions: {                        //object contains prop
            drawerIcon: ({tintColor}) => (              //drawerIcon is prop with function tintColor which is available by default
                    <Icon   
                        name = 'home'
                        type = 'font-awesome'
                        size = {24}                     
                        color = {tintColor}             //value of tintColor will change baesd on active screen or not - default colors
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name = 'list'
                        type = 'font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        Reservation: { 
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name = 'tree'
                        type = 'font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        Favorites: { 
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name = 'heart'
                        type = 'font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name = 'info-circle'
                        type = 'font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name = 'address-card'
                        type = 'font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: 'Home',                                    //first screen to be shown
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent              //conecting contentComponent to Custom Drawer Content
    }
);

const AppNavigator = createAppContainer(MainNavigator);            //swapped the Directory with the Main
// const AppNavigator = createAppContainer(DirectoryNavigator);    //passing stack navigator above to the function createAppContainer

class Main extends Component {

    componentDidMount() {                   //built-in method calling each 
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

        NetInfo.fetch().then(connectionInfo => {                                                //fetch method returns promise
            (Platform.OS === 'ios')
                ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)        //if IOS, disply this connection
                : ToastAndroid.show('Initial Network Connectivity Type: ' +                     //or if not, toast for android, brief message that fades away, LONG is 3.5 seconds
                    connectionInfo.type, ToastAndroid.LONG);
        });

        this.unsubscribeNetInfo = NetInfo.addEventListener(connectionInfo => {                  //this is a method on the parent class  -- addEventListener takes callback function
            this.handleConnectivityChange(connectionInfo);                                      
        });
    }

    componentWillUnmount() {
        this.unsubscribeNetInfo();                                              //stop listening for connection changes when main component unmounts
    }

    handleConnectivityChange = connectionInfo => {                                          //change in connection state, this will pop up
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.';
                break;
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.';
                break;
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.';
                break;
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.';
                break;
        }
        (Platform.OS === 'ios')
            ? Alert.alert('Connection change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);     //null since there's no mapStateToProps function