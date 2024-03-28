import * as React from 'react';
import { View, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskScreen from '../screens/TaskScreen';
import DoingScreen from '../screens/DoingScreen';
import DoneScreen from '../screens/DoneScreen';
const Tab = createMaterialTopTabNavigator();
export default function DetailsScreen() {
    return (
    <Tab.Navigator>
      <Tab.Screen name='All' component={TaskScreen} options={{tabBarLabel:'Tất cả'}}/>
      <Tab.Screen name='Doing' component={DoingScreen} options={{tabBarLabel:'Đang làm'}}/>
      <Tab.Screen name='Done' component={DoneScreen} options={{tabBarLabel:'Hoàn thành'}}/>
  </Tab.Navigator>
    );
}