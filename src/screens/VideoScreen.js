import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Video from 'react-native-video'

const VideoScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Video
                repeat={true}
                source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                style={styles.video}
                resizeMode='cover'
                muted={true}
            />
        </View>
    )
}

export default VideoScreen

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%',
        // opacity: 0.1
    },
})