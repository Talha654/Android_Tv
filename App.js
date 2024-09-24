import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/routes/AppNavigator'
import TrackPlayer from 'react-native-track-player';

const App = () => {

  useEffect(() => {
    setupTrackPlayer();

    return () => {
      TrackPlayer.reset();
    }
  }, []);

  const setupTrackPlayer = async () => {

    await TrackPlayer.setupPlayer();
    console.log('Track Player Started...')
  }


  return (
    <AppNavigator />
  )
}

export default App