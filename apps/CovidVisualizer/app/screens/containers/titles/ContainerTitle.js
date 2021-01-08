import React from 'react';
import {Text, View} from "react-native";

export default class ContainerTitle extends React.Component{
    render() {
        return(
            <View
                style={this.props.containerStyle}
            >
                <Text
                    style={this.props.titleStyle}
                >
                    {this.props.text}
                </Text>
            </View>
        );
    }
}


