import React from 'react';
import WorldMapScreen from './analytics/WorldMapScreen'
import WorldStatisticsScreen from './analytics/WorldStatisticsScreen'
import AnalyticsHomeScreen from './analytics/AnalyticsHomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import RomaniaMapScreen from './analytics/RomaniaMapScreen';
import RomaniaStatisticsScreen from "./analytics/RomaniaStatisticsScreen";

const Stack = createStackNavigator();

const AnalyticsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Analytics" component={AnalyticsHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="World Map" component={WorldMapScreen} />
            <Stack.Screen name="World Statistics" component={WorldStatisticsScreen} />
            <Stack.Screen name="Romania Map" component={RomaniaMapScreen} />
            <Stack.Screen name="Romania Statistics" component={RomaniaStatisticsScreen} />
        </Stack.Navigator>
    );
}

export default AnalyticsScreen;
