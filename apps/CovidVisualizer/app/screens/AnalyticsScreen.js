import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import colors from '../config/colors'
import WorldMapScreen from './analytics/WorldMapScreen'
import WorldStatisticsScreen from './analytics/WorldStatisticsScreen'
import AnalyticsHomeScreen from './analytics/AnalyticsHomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import RomaniaMapScreen from './analytics/RomaniaMapScreen';

const Stack = createStackNavigator();

const AnalyticsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Analytics" component={AnalyticsHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="World Map" component={WorldMapScreen} />
            <Stack.Screen name="World Statistics" component={WorldStatisticsScreen} />
            <Stack.Screen name="Romania Map" component={RomaniaMapScreen} />
        </Stack.Navigator>
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


export default AnalyticsScreen;
