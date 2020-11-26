import React from 'react';
import { Text, View, StyleSheet } from 'react-native'


const HomeScreen = () =>{
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Welcome Screen</Text>
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


export default HomeScreen;