import 'react-native-gesture-handler';
import React from 'react';

import HomeScreen from './app/screens/HomeScreen'
import AnalyticsScreen from './app/screens/AnalyticsScreen'
import NewsScreen from './app/screens/NewsScreen'

import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native'

import colors from './app/config/colors'
import {NavigationContainer} from "@react-navigation/native";

const tabNavigatorColors = colors.tabNavigator;

const TabNavigator = createMaterialBottomTabNavigator();

class App extends React.Component{
    render() {
        return(
            <NavigationContainer>
                <TabNavigator.Navigator
                    initialRouteName='Home'
                    activeColor={tabNavigatorColors.barStyle.backgroundColor.news}
                    inactiveColor={tabNavigatorColors.inactiveColor.home}
                    barStyle={{
                        backgroundColor: tabNavigatorColors.barStyle.backgroundColor.home
                    }}
                >
                    <TabNavigator.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'ios-home'} />
                                </View>
                            ),
                        }}
                    />
                    <TabNavigator.Screen
                        name="Analytics"
                        component={AnalyticsScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'ios-person'} />
                                </View>
                            ),
                        }}
                    />
                    <TabNavigator.Screen
                        name="News"
                        component={NewsScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <View>
                                    <Icon style={[{ color: color }]} size={25} name={'ios-images'} />
                                </View>
                            ),
                        }}
                    />
                </TabNavigator.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;