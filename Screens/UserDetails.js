import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Title from './Components/Title';
import PrimaryButton from './Components/PrimaryButton';
import Input from './Components/Input';
import AppModal from './Components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetails({navigation}){
    const initialState = {
        firstName: "",
        surname: "",
        mobile: ""
    }
    const [userDetailsState, setUserDetailsState] = useState(initialState);
    const [allowFormSubmission, setAllowFormSubmission] = useState(false);


    const authenticateForm = () => {
        const {firstName, surname, mobile} = userDetailsState;
        if(firstName.length > 2 && surname.length > 2 && !isNaN(mobile) && mobile.length === 10 && mobile.startsWith(0) && (parseInt(mobile[1]) === 6 || parseInt(mobile[1]) === 7 || parseInt(mobile[1]) === 8 || mobile[1] === 1)){
            setAllowFormSubmission(true);
        }else{
            setAllowFormSubmission(false);
        }
    }

    const submitForm = async () => {
        if(allowFormSubmission){
            const profileString = JSON.stringify(userDetailsState);
            await AsyncStorage.setItem("myDetails", profileString);
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: "white", padding: 10}}>
          <Title text="Your Details"/>

          <Text style={{marginTop: 20, fontSize: 17, color: '#222'}}>
          This data will be stored securely on your
device and will be deleted if you clear app
data, uninstall the app or clear your device.
        </Text>

        <Text style={{marginTop: 10, fontSize: 17, color: '#222'}}>
        Information provided below will make it
easier to contact you in the event that you
send a missing person alert.
        </Text>
  
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Input
                placeholder="First name"
                onChange={(value)=>{setUserDetailsState({...userDetailsState, firstName: value}); authenticateForm()}}
            />

            <Input
                placeholder="Surname"
                onChange={(value)=>{setUserDetailsState({...userDetailsState, surname: value}); authenticateForm()}}
            />

            <Input
                placeholder="Cellphone number"
                keyboardType="numeric"
                maxLength={10}
                onChange={(value)=>{setUserDetailsState({...userDetailsState, mobile: value}); authenticateForm()}}
            />
            <PrimaryButton text="Save Details" active={allowFormSubmission} onPress={()=>{submitForm()}} />
          </View>
          <AppModal hideModal={()=>{navigation.navigate("AddProfile")}}/>
        </View>
      );
    }
