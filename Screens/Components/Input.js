import React from 'react';
import {TextInput, Dimensions} from 'react-native';


export default function Input(props){

    return(
        <TextInput
            style={{backgroundColor: "#f2f2f2", color: "#222", marginBottom: 20, fontSize: 18, padding: 5, height: 50, width: parseInt(Dimensions.get("screen").width*0.9)}}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChange}
            placeholderTextColor="#888"
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
            autoComplete="off"
        />
    );
} 