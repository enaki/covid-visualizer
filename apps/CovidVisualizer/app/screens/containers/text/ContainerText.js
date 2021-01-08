import React from "react";
import {View} from "react-native";

export default class ContainerText extends React.Component{
    render() {
        return(
            <View>
                {this.props.children}
            </View>
        );
    }
}

