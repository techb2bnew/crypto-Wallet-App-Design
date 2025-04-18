import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import { blackColor, BlueColor, lightBlueColor } from '../constants/Color';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign } = BaseStyle;

const Header = ({ text }) => {
    return (
        <View style={[styles.headerConatiner, justifyContentSpaceBetween, alignItemsCenter, flexDirectionRow]}>
            <Pressable>
                <Feather name="copy" size={25} color={BlueColor} />
            </Pressable>
            <Text style={styles.headingText}>{text}</Text>
            <Pressable>
                <Feather name="bell" size={24} color={BlueColor} />
            </Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerConatiner: {
        width: wp(100),
        // height: hp(7),
        padding: spacings.xxxxLarge,
        // backgroundColor:"red"
    },
    headingText: {
        fontSize: style.fontSizeMedium.fontSize,
        fontWeight: 'bold',
        color: blackColor,
    }
})