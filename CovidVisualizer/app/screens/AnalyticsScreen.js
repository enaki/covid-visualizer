import React from 'react';
import { Text, View, StyleSheet } from 'react-native'


const AnalyticsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Analytics Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AnalyticsScreen;