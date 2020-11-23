import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

import colors from '../config/colors'

class AnalyticsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>Analytics Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.analyticsScreen.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AnalyticsScreen;