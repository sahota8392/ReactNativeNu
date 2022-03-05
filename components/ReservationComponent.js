import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';            //installed in terminal that we are importing

//Creating form as React controlled form -- stored/controlled in this component itself
class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {                  //initial value for each input
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false           //inital value saying modal will not show
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});      //will check current state of toggleModal and change to opposite 
    }

    handleReservation() {                           //Handle event when form submitted
        console.log(JSON.stringify(this.state));    //Echo back component state to ourself in console.log and reset state to initial value
        this.toggleModal();                         //calling the toggle modal method
    }

        resetForm() {                               //pulling out code that resets state and put in the resetForm including showModal
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }

//label is what user sees and value is what is passed to the onvalueChange prop
    render() {
        return(
            <ScrollView>        
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Number of Campers</Text>
                    <Picker 
                            style = {styles.formItem}
                            selectedValue = {this.state.campers}        //inital value above set is 1
                            onValueChange = {itemValue => this.setState({campers: itemValue})}  //this will update to the itemValue for campers
                    >    
                        <Picker.Item label ='1' value='1' />    
                        <Picker.Item label ='2' value='2' />
                        <Picker.Item label ='3' value='3' />
                        <Picker.Item label ='4' value='4' />
                        <Picker.Item label ='5' value='5' />
                        <Picker.Item label ='6' value='6' />
                    </Picker>
                </View>

                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Hike-In?</Text>
                    <Switch 
                        style = {styles.formItem}
                        value = {this.state.hikeIn}     //initial value set to the initial state --- so false
                        trackColor = {{true: '#5637DD', false: null}}     //if true color will be to set color and if false no color
                        onValueChange = {value => this.setState({hikeIn: value})}       //when user changes value from yes or no; will update the state with new value
                    />
                </View>

                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Date</Text>
                    <Button 
                        onPress = {() => this.setState({showCalendar: !this.state.showCalendar})}       //on click, show calendar popup
                        title = {this.state.date.toLocaleDateString('en-US')}                           // mm/dd/yy date format
                        color = '#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {this.state.showCalendar && (               //&& if one is false the second is not evaluated at all -- {} to embed JavaScript inside JSX
                    <DateTimePicker
                        style = {styles.formItem}
                        value = {this.state.date}
                        mode = {'date'}
                        display = 'default'
                        onChange = {(event, selectedDate) => {                                          //selectedDate saved to state, when date selected, we hide calendar & if user doesn't select date, it's then undefined
                            selectedDate && this.setState({date: selectedDate, showCalendar: false});
                        }}
                    />
                )}

                <View style = {styles.formRow}>
                    <Button                                             //To submit the form, submittal button
                        onPress = {() => this.handleReservation()}      //handleReservation event handler
                        title = 'Search'
                        color = '#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>

                <Modal
                    animationType = {'slide'}
                    transparent = {false}
                    visible = {this.state.showModal}        
                    onRequestClose = {() => this.toggleModal()}
                >
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Search Campsite Reservations</Text>
                        <Text style = {styles.modalText}>Number of Campers: {this.state.campers}</Text>
                        <Text style = {styles.modalText}>Hike In?: {this.state.hikeIn ? 'Yes' : 'No '}</Text>
                        <Text style = {styles.modalText}>Date: {this.state.date.toLocaleTimeString('en-US')} </Text>
                        <Button 
                            onPress = { () => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color = '#5637DD'
                            title = 'Close'
                        />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

//define stylesheet
const styles = StyleSheet.create({
    formRow: {                              //for the view components
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {                            //for the text components
        fontSize: 18,
        flex: 2
    },
    formItem: {                             //for the picker and switch components
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;