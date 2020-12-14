import {Picker} from "@react-native-picker/picker";
import React from "react";
import {View} from 'react-native';

export default class GraphPicker extends React.Component{
    state = {view: 'deaths'};
    render(){
        return(
            <View>
                <Picker
                    selectedValue={
                        this.state.view
                    }
                    style={{
                        height: 50,
                        width: 150
                    }}
                    onValueChange={
                        (itemValue, itemIndex) => {
                            this.setState({view: itemValue});
                        }
                    }
                    mode={"dropdown"}
                >
                    <Picker.Item label="Cases" value="cases" />
                    <Picker.Item label="Deaths" value="deaths" />
                    <Picker.Item label="Active" value="active" />
                    <Picker.Item label="Recoveries" value="recoveries" />
                </Picker>
            </View>
        );
    }
};
