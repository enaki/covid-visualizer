import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors'

class NewsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>News Screen</Text>
                <Text style={{ fontSize: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Today News:</Text>
                    It finally f*king works
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.newsScreen.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default NewsScreen;