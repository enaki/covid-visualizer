import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

import colors from '../../config/colors'
import WorldGraphComponent from "./graphs/WorldGraphComponent";
import {Picker} from "@react-native-picker/picker";

class WorldStatisticsScreen extends React.Component {
    state = {view: 'deaths'};
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>World Statistics Screen</Text>
                <WorldGraphComponent/>
                <Picker
                    selectedValue={this.state.view}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default WorldStatisticsScreen;
