import 'react-native-gesture-handler';
import React from 'react';

import HomeScreen from './app/screens/HomeScreen';
import AnalyticsScreen from './app/screens/AnalyticsScreen';
import NewsScreen from './app/screens/NewsScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native';

import colors from './app/config/colors';
import { NavigationContainer } from "@react-navigation/native";
import HelpScreen from "./app/screens/HelpScreen";

const tabNavigatorColors = colors.tabNavigator;

const TabNavigator = createMaterialBottomTabNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <TabNavigator.Navigator
                    initialRouteName='Home'
                    labeled={true}
                    shifting={true}
                >
                    <TabNavigator.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'home'} />
                                </View>
                            ),
                            tabBarColor: tabNavigatorColors.barStyle.backgroundColor.home,
                        }}
                    />
                    <TabNavigator.Screen
                        name="Analytics"
                        component={AnalyticsScreen}
                        options={{
                            tabBarLabel: 'Analytics',
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'chart-line'} />
                                </View>
                            ),
                            tabBarColor: tabNavigatorColors.barStyle.backgroundColor.analytics,
                        }}
                    />
                    <TabNavigator.Screen
                        name="News"
                        component={NewsScreen}
                        options={{
                            tabBarLabel: 'News',
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'newspaper'} />
                                </View>
                            ),
                            tabBarColor: tabNavigatorColors.barStyle.backgroundColor.news,
                        }}
                    />
                    <TabNavigator.Screen
                        name="Help"
                        component={HelpScreen}
                        options={{
                            tabBarLabel: 'Help',
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'phone'} />
                                </View>
                            ),
                            tabBarColor: tabNavigatorColors.barStyle.backgroundColor.help,
                        }}
                    />
                </TabNavigator.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
