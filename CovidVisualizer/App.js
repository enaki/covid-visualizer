import 'react-native-gesture-handler';
import React from 'react';

import HomeScreen from './app/screens/HomeScreen'
import AnalyticsScreen from './app/screens/AnalyticsScreen'
import NewsScreen from './app/screens/NewsScreen'

import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native'

import colors from './app/config/colors'

const tabNavigatorColors = colors.tabNavigator;

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
          </View>
        ),
      }
    },
    Analytics: {
      screen: AnalyticsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: tabNavigatorColors.activeColor.analytics,
        inactiveColor: tabNavigatorColors.inactiveColor.analytics,
        barStyle: { backgroundColor: tabNavigatorColors.barStyle.backgroundColor.analytics },
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-images'} />
          </View>
        ),
        activeColor: tabNavigatorColors.activeColor.news,
        inactiveColor: tabNavigatorColors.inactiveColor.news,
        barStyle: { backgroundColor: tabNavigatorColors.barStyle.backgroundColor.news },
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: tabNavigatorColors.activeColor.home,
    inactiveColor: tabNavigatorColors.inactiveColor.home,
    barStyle: { backgroundColor: tabNavigatorColors.barStyle.backgroundColor.home },
  }
);

export default createAppContainer(TabNavigator);

/*
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
*/
