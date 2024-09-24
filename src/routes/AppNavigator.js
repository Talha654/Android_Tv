import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../screens/MainScreen';
import VideoScreen from '../screens/VideoScreen';
import { colors } from '../constants/colors';
import AudioScreen from '../screens/AudioScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Audio'>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Video' component={VideoScreen} options={{ headerShown: true, headerTintColor: colors.black }} />
        <Stack.Screen name='Audio' component={AudioScreen} options={{ headerShown: true, headerTintColor: colors.black }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})