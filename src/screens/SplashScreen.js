import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { HP, WP } from '../constants/ResponsiveScreen'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

    const [focused, setFocused] = useState(- 1);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.headingTxt}>Select Profile</Text>

            <View style={styles.profileView}>
                <TouchableOpacity
                    onFocus={() => setFocused(0)}
                    onPress={() => navigation.navigate('Main')}
                    style={[styles.profileBtn,
                    { borderWidth: focused == 0 ? 2 : 0, borderColor: colors.white }]}>
                    <Image source={require('../assets/images/user1.jpg')}
                        style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onFocus={() => setFocused(1)}
                    onPress={() => navigation.navigate('Main')}
                    style={[styles.profileBtn, { borderWidth: focused == 1 ? 2 : 0 }]}>
                    <Image source={require('../assets/images/user2.jpg')}
                        style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onFocus={() => setFocused(2)}
                    style={[styles.plusBtn, { borderWidth: focused == 2 ? 2 : 0 }]}>
                    <Image source={require('../assets/images/plus.png')}
                        style={{ width: '95%', height: '95%', resizeMode: 'contain' }} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    headingTxt: {
        color: colors.white,
        alignSelf: 'center',
        fontSize: WP(5),
        marginTop: HP(10),
        fontWeight: 'bold'
    },
    profileView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: HP(10),

    },
    profileBtn: {
        width: WP(15),
        height: WP(15),
        borderRadius: WP(3),
        // borderWidth: 1,
        // backgroundColor: 'red',
        overflow: 'hidden',
        marginLeft: WP(2),
        marginRight: WP(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusBtn: {
        width: WP(10),
        height: WP(10),
        borderRadius: WP(5),
        // borderWidth: 1,
        // backgroundColor: 'red',
        overflow: 'hidden',
        marginLeft: WP(2),
        marginRight: WP(2),
        justifyContent: 'center',
        alignItems: 'center'
    }
})