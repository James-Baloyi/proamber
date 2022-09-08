import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, PermissionsAndroid} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./Screens/Home";
import UserDetails from './Screens/UserDetails';
import AddProfile from './Screens/CreateProfile';


const Stack = createNativeStackNavigator();
export default function App(){

  const getNotificationsPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.warn('Authorization status:', authStatus);
    }
  }

const getLocationPermission = async () =>
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Pro Amber',
        'message': 'Pro Amber access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.warn("You can use the location")
    } else {
      console.warn("location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

const checkFirstUse = async () => {
  const isFirstUse = await AsyncStorage.getItem("isFirstUse");
  if(parseInt(isFirstUse) != 1){
    const date = new Date();
    setDeviceId(date);
  }
}

const setDeviceId = async (date) => {
  const token = generateToken(64);
  await AsyncStorage.setItem("deviceToken", token);
  await AsyncStorage.setItem("isFirstUse", "1");
  database().ref("pro_amber/devices").set({
    token: token,
    date: date,
  })
}


const generateToken = (length) => {
  var a = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join("");
}


  useEffect(()=>{
    getLocationPermission();
    getNotificationsPermission();
    checkFirstUse();
  },[])

  return(

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false
  }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="AddProfile" component={AddProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );


}