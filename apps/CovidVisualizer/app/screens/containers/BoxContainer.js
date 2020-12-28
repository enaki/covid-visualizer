import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
const BoxContainer = props => {
    return (
        <View style={{...styles.boxContainer, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer:{
        backgroundColor: "#fff3c7", // #fff3c7
        width: Dimensions.get(`window`).width * 95 /100,
        margin: 10,
        borderRadius: 15,
        borderWidth:2,
        borderColor:"red",
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
});

export default BoxContainer;

