import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, ActivityIndicator, Dimensions} from "react-native";

export default function AppModal(props){
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{setLoading(false); props.hideModal()}, 1800);

    }, [])

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{flex: 1, backgroundColor: "#000", opacity: .34}}>
        </View>
        <View style={{flex: 1, backgroundColor: "#fff", position: "absolute", height: 80, width: parseInt(Dimensions.get("screen").width*0.9), marginLeft: parseInt(Dimensions.get("screen").width*0.05), top: parseInt(Dimensions.get("screen").height*0.4 - 40)}}>
            {loading && <ActivityIndicator size={50} color="#159fff"/>}
          </View>
      </Modal>

    );
}