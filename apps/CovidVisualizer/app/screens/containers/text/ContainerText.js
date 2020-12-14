import React from "react";
import {Text} from "react-native";

export default class ContainerText extends React.Component{
    render() {
        return(
            <Text
                style={textStyle}
            >
                {this.props.text}
            </Text>
        );
    }
}

const textStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    margin: 10,
};
