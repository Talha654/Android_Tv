import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { HP, WP } from '../constants/ResponsiveScreen'
import { colors } from '../constants/colors'
import { TabBarButton } from '../constants/TopBarButtonData'
import CustomTabBarButton from '../components/CustomTabBarButton'
import Video from 'react-native-video'
import { ScrollView } from 'react-native-gesture-handler'

const MainScreen = ({ navigation }) => {

    const [isTransparent, setIsTransparent] = useState(true);

    const [recentIndex, setRecentIndex] = useState(-1);
    const [trendingIndex, setTrendingIndex] = useState(-1);

    return (
        <View style={styles.container}>

            <View style={[styles.header, { backgroundColor: isTransparent ? 'transparent' : 'rgba(0,0,0,1)' }]}>

                <View style={styles.headerLeftView}>

                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />

                    {
                        TabBarButton.map((item, index) => (
                            <CustomTabBarButton key={item.id.toString()} item={item} />
                        ))
                    }

                </View>

                <View style={styles.headerRightView}>
                    <Image source={require('../assets/images/search.png')} style={styles.icon} />
                    <Image source={require('../assets/images/notification.png')} style={styles.icon} />
                    <Image source={require('../assets/images/user2.jpg')} style={styles.user} />
                </View>

            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: HP(5) }}
                onScroll={(e) => {
                    const Y = e.nativeEvent.contentOffset.y;
                    if (Y > HP(20)) {
                        setIsTransparent(false)
                    } else {
                        setIsTransparent(true)
                    }
                }}
            >
                <View style={styles.videoContainer}>

                    <Video
                        repeat={true}
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        style={styles.video}
                        resizeMode='cover'
                        muted={true}
                    />
                    <View style={styles.transparentView}>
                        <Text style={styles.movieDetails}>Big Bunny</Text>
                        <Text style={[styles.movieDetails, { fontSize: WP(1.5), fontStyle: 'italic', fontWeight: '400' }]}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, </Text>

                        <View style={styles.bannerButtonView}>
                            <TouchableOpacity style={styles.playBtn}>
                                <Image source={require('../assets/images/play.png')} style={styles.playIcon} />
                                <Text style={styles.PlayBtnTxt}>Play</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.playBtn, { backgroundColor: colors.gray }]}>
                                <Image source={require('../assets/images/info.png')} style={[styles.playIcon, { tintColor: colors.white }]} />
                                <Text style={[styles.PlayBtnTxt, { color: colors.white }]}>More Info</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={styles.listingView}>
                    <Text style={styles.listHeading}>Recently added</Text>

                    <FlatList
                        horizontal
                        data={[1, 1, 1, 1]}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onFocus={() => {
                                        setRecentIndex(index)
                                    }}
                                    onPress={() => navigation.navigate('Video')}
                                    style={[styles.recentItems, { marginLeft: index > 0 ? WP(1) : 0, borderWidth: recentIndex == index ? 4 : 0, borderColor: colors.white }]}>
                                    <Image source={require('../assets/images/movie-img1.jpeg')} style={styles.recentItems} resizeMode='stretch' />
                                </TouchableOpacity>

                            )
                        }} />


                    <Text style={[styles.listHeading, { marginTop: WP(2), marginBottom: HP(1), }]}>Trending Now</Text>

                    <FlatList
                        horizontal
                        data={[1, 1, 1, 1]}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onFocus={() => {
                                        setTrendingIndex(index)
                                    }}
                                    style={[styles.recentItems, { marginLeft: index > 0 ? WP(1) : 0, borderWidth: trendingIndex == index ? 4 : 0, borderColor: colors.white }]}>
                                    <Image source={require('../assets/images/movie-img1.jpeg')} style={styles.recentItems} resizeMode='stretch' />
                                </TouchableOpacity>

                            )
                        }} />

                    <Text style={[styles.listHeading, { marginTop: WP(2), marginBottom: HP(1), }]}>Family Comedies</Text>

                    <FlatList
                        horizontal
                        data={[1, 1, 1, 1]}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={[styles.recentItems, { marginLeft: index > 0 ? WP(1) : 0 }]}>
                                    <Image source={require('../assets/images/movie-img1.jpeg')} style={styles.recentItems} resizeMode='stretch' />
                                </TouchableOpacity>

                            )
                        }} />

                </View>

            </ScrollView>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    header: {
        width: '100%',
        height: HP(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: colors.black,
        padding: WP(1),
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    headerLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: WP(12),
        // height: HP(5),
        // marginTop: HP(6)
        // backgroundColor: 'yellow'
    },
    headerRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: WP(10),
        height: HP(4),
        resizeMode: 'contain',
        marginLeft: WP(1),

        // backgroundColor: 'yellow'
    },
    icon: {
        width: WP(2),
        height: WP(2),
        tintColor: colors.white,
        resizeMode: 'contain',
        marginRight: WP(1.5)
    },
    user: {
        height: WP(2),
        width: WP(2),
        borderRadius: WP(.2),
        marginLeft: WP(1),
        marginLeft: WP(1)
    },
    videoContainer: {
        width: '100%',
        height: HP(85),
        // opacity: 0.1
    },
    video: {
        width: '100%',
        height: '100%',
        // opacity: 0.1
    },
    transparentView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        opacity: 1,
        justifyContent: 'center'
    },
    movieDetails: {
        fontSize: WP(2),
        color: colors.white,
        width: '40%',
        marginLeft: WP(2),
        marginTop: HP(2),
        fontWeight: 'bold'
    },
    bannerButtonView: {
        flexDirection: 'row',
        marginLeft: WP(1),
        marginTop: HP(2),

    },
    playBtn: {
        paddingHorizontal: WP(1),
        height: HP(6),
        borderRadius: WP(.8),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: WP(1)
    },
    playIcon: {
        width: WP(2),
        height: WP(2),
        resizeMode: 'center'
    },
    PlayBtnTxt: {
        color: colors.black,
        fontSize: WP(1.2),
        marginLeft: WP(.5),
    },
    listingView: {
        width: '90%',
        alignSelf: 'center',

    },
    listHeading: {
        fontSize: WP(1.5),
        fontWeight: '500',
        color: colors.white,
        marginTop: HP(-7)
    },
    recentItems: {
        width: WP(15),
        height: WP(9),
        backgroundColor: colors.white,
        // marginLeft: WP(1),
        borderRadius: WP(1),
        // marginBottom: HP(5),
        // backgroundColor: 'red',
        overflow: 'hidden'
    }
})