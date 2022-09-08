import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Title from './Components/Title';
import PrimaryButton from './Components/PrimaryButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}){

    const [profiles, setProfiles] = useState([]);

    useEffect(()=>{
        getSavedProfiles();
    },[])


    const getSavedProfiles = async () => {
        const savedProfiles = await AsyncStorage.getItem("savedProfiles");
        if(savedProfiles !== null){
            console.warn(profiles, "json");
        }else{
            setProfiles(new Array("not-found"));
            console.warn(profiles[0])
        }
    }

    return(
      <View style={{flex: 1, backgroundColor: "white", padding: 10}}>
        <Title text="Profiles"/>

        <View style={{flex: 1, alignItems: 'center'}}>
            {profiles == null && <ActivityIndicator/>}
            {profiles[0] == "not-found"  && <NoProfiles onPress={()=>{navigation.navigate("UserDetails")}}/>}

            {profiles[0] == "not-found" && <PledgeText/>}
        </View>
      </View>
    );
  }

  function NoProfiles(props){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginBottom: 20, fontSize: 20, color: '#222'}}>You haven't set up any profiles yet</Text>
            <PrimaryButton text="Get Started" onPress={props.onPress}/>
        </View>

    );
  }

  function PledgeText(){
    return(
        <Text style={{marginBottom: 20, fontSize: 17, color: '#222', textAlign: 'center'}}>
            All data will be securely saved on your
device. Only when you send an Alert
will we upload it to our servers for
24 to 48 hours. 
        </Text>
    );
  }

