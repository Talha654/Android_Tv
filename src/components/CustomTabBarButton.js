import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HP, WP } from '../constants/ResponsiveScreen'
import { colors } from '../constants/colors'

const CustomTabBarButton = ({ item }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.buttonTxt}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default CustomTabBarButton

const styles = StyleSheet.create({
    container: {
        // height: HP(5),
        // marginLeft: WP(.1),
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: WP(1)
    },
    buttonTxt: {
        color: colors.white,
        fontSize: WP(1)
    }
})