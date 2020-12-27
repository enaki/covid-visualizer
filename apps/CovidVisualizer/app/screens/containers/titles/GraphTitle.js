import React from 'react';
import {Text} from "react-native";

export default class GraphTitle extends React.Component{
    render() {
        return(
            <Text
                style={graphTitleStyle}
            >
                {this.props.text}
            </Text>
        );
    }
}

const graphTitleStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color:"green",
    marginTop: 10,
};
