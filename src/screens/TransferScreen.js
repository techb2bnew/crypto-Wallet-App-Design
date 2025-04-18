import { Animated, FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { blackColor, BlueColor, darkBlueColor, goldColor, grayColor, greenColor, lightGrayColor, redColor, verylightGrayColor, whiteColor } from '../constants/Color'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import Header from '../component/Header';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import QRCode from 'react-native-qrcode-svg';
import ExchangeCard from '../component/ExchangeCard';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign, justifyContentSpaceEvenly } = BaseStyle;

const TransferScreen = ({ navigation, route }) => {
    const { from } = route.params || {};
    const accountNumber = '1234567890'; // yaha apna account number likho


    return (
        <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={[flex]}>
            <View style={[styles.headerConatiner, justifyContentSpaceBetween, alignItemsCenter, flexDirectionRow]}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color={BlueColor} />
                </Pressable>
                <Text style={styles.headingText}>{from}</Text>
                <View>
                </View>
            </View>
            <View style={{ flex: 1, padding: spacings.xLarge }}>
                {(from === "Buy" || from === "Send") && <View style={{
                    width: "100%",
                    // height: "80%",
                    paddingHorizontal: spacings.xLarge,
                    paddingVertical: spacings.Large1x,
                    backgroundColor: whiteColor,
                    borderRadius: 20
                }}>
                    <Text style={styles.headingText}>{from}</Text>
                    <ExchangeCard title="Send" />
                    <ExchangeCard title="Receive" />
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Receiving address: </Text>
                        <Text style={[styles.text]}>Oxxuuvye~9217s</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Slippage Tolerance: </Text>
                        <Text style={[styles.text]}>2.3%</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Estimated Fees:</Text>
                        <Text style={[styles.text]}>%0.0982724</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: 'red' }]}>Price Impact: </Text>
                        <Text style={[styles.text, { color: 'red' }]}>0.76</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sendButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: "absolute", top: Platform.OS === "android" ? hp(23) : hp(19), left: Platform.OS === "android" ? wp(40) : wp(43), width: wp(10), height: wp(10), backgroundColor: '#7B61FF', borderRadius: 50 }}>

                    </View>
                </View>}

                {from === "Receive" && <View style={{
                    width: "100%",
                    // height: "80%",
                    paddingHorizontal: spacings.xLarge,
                    paddingVertical: spacings.Large1x,
                    backgroundColor: whiteColor,
                    borderRadius: 20
                }}>
                    <Text style={[styles.headingText, { textAlign: "center" }]}>{from}</Text>
                    <View style={[styles.qrCodeBox, alignJustifyCenter]}>
                        {/* <AntDesign name="qrcode" size={hp(25)} color={blackColor} /> */}
                        <QRCode
                            value={accountNumber}
                            size={170}
                        />
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Receiving address: </Text>
                        <Text style={[styles.text]}>Oxxuuvye~9217s</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Slippage Tolerance: </Text>
                        <Text style={[styles.text]}>2.3%</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: grayColor }]}>Estimated Fees:</Text>
                        <Text style={[styles.text]}>%0.0982724</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: 'red' }]}>Price Impact: </Text>
                        <Text style={[styles.text, { color: 'red' }]}>0.76</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sendButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>

                </View>}
            </View>

        </LinearGradient>
    )
}

export default TransferScreen;

const styles = StyleSheet.create({
    headerConatiner: {
        width: wp(100),
        padding: spacings.xxxxLarge,
        borderBottomWidth: .5,
        borderBottomColor: lightGrayColor
    },
    headingText: {
        fontSize: style.fontSizeMedium.fontSize,
        fontWeight: 'bold',
        color: blackColor,
    },
    info: {
        marginTop: 16,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: blackColor
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 50,
    },
    cancelText: {
        color: '#000',
    },
    sendButton: {
        backgroundColor: '#7B61FF',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 50,
    },
    sendText: {
        color: '#fff',
    },
    qrCodeBox: {
        width: "100%",
        height: hp(25),
    }
})