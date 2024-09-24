import { StyleSheet, Text, TouchableHighlight, View, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { colors } from '../constants/colors';
import { HP, WP } from '../constants/ResponsiveScreen';

// Get screen dimensions for dynamic adjustments
const { width, height } = Dimensions.get('window');

const tracks = [
    {
        id: '1',
        title: 'Sample Audio 1',
        artist: 'Artist 1',
        url: require('../assets/audio/twilight.mp3'),
    },
    {
        id: '2',
        title: 'Sample Audio 2',
        artist: 'Artist 2',
        url: require('../assets/audio/twilight.mp3'),
    },
    // Add more tracks here
];

const AudioScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackAdded, setTrackAdded] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pausedPosition, setPausedPosition] = useState(0);
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => {
        const updatePosition = async () => {
            const progress = await TrackPlayer.getProgress();
            const currentPosition = progress.position;
            const currentDuration = progress.duration;

            if (currentPosition >= currentDuration && currentDuration > 0) {
                setIsPlaying(false);
            }

            setPosition(currentPosition);
            setDuration(currentDuration);
        };

        const positionInterval = setInterval(updatePosition, 1000);

        return () => clearInterval(positionInterval);
    }, [isPlaying]);

    const handleSliderValueChange = async (value) => {
        await TrackPlayer.seekTo(value);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const addTrack = async (track) => {
        try {
            await TrackPlayer.add({
                id: track.id,
                url: track.url,
                title: track.title,
                artist: track.artist,
            });
            console.log('Track added:', track.title);
            setTrackAdded(true);
        } catch (error) {
            console.error('Error adding track', error);
        }
    };

    const playAudio = async (track) => {
        try {
            if (!trackAdded || selectedTrack?.id !== track.id) {
                await TrackPlayer.reset();
                await addTrack(track);
                setSelectedTrack(track);
            }

            await TrackPlayer.play().then(() => {
                setIsPlaying(true);
                setPausedPosition(0);
            });
        } catch (error) {
            console.error('Error playing audio', error);
            setIsPlaying(false);
        }
    };

    const pauseAudio = async () => {
        try {
            await TrackPlayer.pause().then(() => {
                setIsPlaying(false);
                TrackPlayer.getProgress().then((progress) => {
                    setPausedPosition(progress.position);
                });
            });
        } catch (error) {
            console.error('Error pausing audio', error);
        }
    };

    const handleStop = async () => {
        try {
            await TrackPlayer.stop();
            setIsPlaying(false);
            setPausedPosition(0);
        } catch (error) {
            console.error('Error stopping audio', error);
        }
    };

    const renderTrackItem = ({ item }) => (
        <TouchableHighlight
            style={[styles.trackItem, selectedTrack?.id === item.id && styles.trackItemActive]}
            onPress={() => playAudio(item)}
            underlayColor="#f0f8ff" // Highlight color when focused
        >
            <View>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <View style={styles.container}>
            {/* Track List */}
            <View style={{ height: HP(60) }}>
                <FlatList
                    data={tracks}
                    renderItem={renderTrackItem}
                    keyExtractor={(item) => item.id}
                    style={styles.trackList}
                />
            </View>

            {/* Player Controls */}
            <View style={styles.controls}>
                <TouchableHighlight onPress={handleStop} underlayColor="#f0f8ff">
                    <Icon name="stop" size={WP(5)} color="#007bff" />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        if (isPlaying) {
                            pauseAudio();
                        } else if (selectedTrack) {
                            playAudio(selectedTrack);
                        }
                    }}
                    underlayColor="#f0f8ff"
                >
                    <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={WP(5)} color="#007bff" />
                </TouchableHighlight>
            </View>

            {/* Slider and Time */}
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    onValueChange={handleSliderValueChange}
                    minimumTrackTintColor="#007bff"
                    maximumTrackTintColor="#000000"
                />
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(position)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>
        </View>
    );
};

export default AudioScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    trackList: {
        // marginTop: HP(50),
        width: WP(100),
        marginVertical: 20,
        // backgroundColor: 'blue'
    },
    trackItem: {
        padding: 20, // Larger padding for better focus visibility on tvOS
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    trackItemActive: {
        backgroundColor: '#f0f8ff',
    },
    trackTitle: {
        fontSize: WP(2), // Dynamic font size based on screen width
        fontWeight: 'bold',
        color: '#000',
    },
    trackArtist: {
        fontSize: WP(1.5),
        color: '#666',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        // marginVertical: 20,
    },
    sliderContainer: {
        width: '80%',
        alignItems: 'center',
        // marginTop: 20,
    },
    slider: {
        width: '100%',
        height: HP(5),
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    timeText: {
        color: '#000',
        fontSize: WP(2),
    },
});
