import React from 'react';
import {Text, StyleSheet} from 'react-native';


export default function Title(props){
    return(
        <Text
            style={{
                color: "#222",
                fontSize: 29,
                fontWeight: '700',
                marginTop: 10
            }}
        >{props.text}</Text>
    );
} 