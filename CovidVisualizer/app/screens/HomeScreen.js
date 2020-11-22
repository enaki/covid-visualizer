import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors'

class HomeScreen extends React.Component {
    render() {
        console.log("Test");
        return (
            <View style={styles.container}>
                <Text>Welcome Screen</Text>
                <StatusBar style="auto" />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Analytics')}
                />
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


export default HomeScreen;