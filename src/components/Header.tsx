import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImg from "../assets/isacImage.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>Isac</Text>
            </View>
            <Image source={userImg} style={styles.image}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
        , flexDirection: 'row'
        , justifyContent: 'space-between'
        , alignItems: 'center'
        , paddingVertical: 20
        , marginTop: getStatusBarHeight()
    },
    image: {
        width: 80
        ,height: 80
        ,borderRadius: 40
    },
    greeting: {
        fontSize: 32
        ,color: colors.heading
        ,fontFamily: fonts.text
    },
    userName: {
        fontSize: 32
        ,color: colors.heading
        ,fontFamily: fonts.heading
        ,lineHeight: 40
    }
})