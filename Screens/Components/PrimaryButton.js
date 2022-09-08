import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';


export default function PrimaryButton(props){
    console.warn(props)
    return(
        <>
        {props.active == true && <TouchableOpacity 
            style={{
                backgroundColor: "#159fff",
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        onPress={props.onPress}>
        <Text
            style={{
                color: "#fff",
                fontSize: 20,
            }}
        >{props.text}</Text>
        </TouchableOpacity>}

        {props.active == null && <TouchableOpacity 
            style={{
                backgroundColor: "#159fff",
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        onPress={props.onPress}>
        <Text
            style={{
                color: "#fff",
                fontSize: 20,
            }}
        >{props.text}</Text>
        </TouchableOpacity>}

        {props.active == false && <TouchableOpacity 
            style={{
                backgroundColor: "#999",
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        onPress={()=>{
            ToastAndroid.showWithGravityAndOffset(
                "Please make sure the form is filled in correctly",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }}>
        <Text
            style={{
                color: "#fff",
                fontSize: 20,
            }}
        >{props.text}</Text>
        </TouchableOpacity>}
        </>
    );
} 