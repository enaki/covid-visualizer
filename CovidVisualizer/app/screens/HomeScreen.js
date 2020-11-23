import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors'

class HomeScreen extends React.Component {
    render() {
        console.log("Test");
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
        backgroundColor: colors.homeScreen.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default HomeScreen;