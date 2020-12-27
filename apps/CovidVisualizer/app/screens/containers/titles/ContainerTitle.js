import React from 'react';
import {Text} from "react-native";

export default class ContainerTitle extends React.Component{
    render() {
        return(
            <Text
                style={containerTitleStyle}
            >
                {this.props.text}
            </Text>
        );
    }
}

const containerTitleStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color:"white",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "grey",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    paddingBottom: 7
};
