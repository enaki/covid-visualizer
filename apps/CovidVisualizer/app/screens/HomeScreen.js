import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import colors from '../config/colors';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        // let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
        // console.log(location);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>Welcome Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
