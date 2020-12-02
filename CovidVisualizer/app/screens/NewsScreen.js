import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import colors from '../config/colors'


const NewsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>News Screen</Text>
            <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Today News: </Text>
                News
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default NewsScreen;