import React from "react";
import {Text, View} from "react-native";

export default class ContainerText extends React.Component{
    render() {
        return(
            <View>
                <Text
                    style={textStyle}
                >
                    {this.props.text}
                </Text>
            </View>
        );
    }
}

const textStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    margin: 10,
};
