import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors'

class AnalyticsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Analytics Screen</Text>
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AnalyticsScreen;