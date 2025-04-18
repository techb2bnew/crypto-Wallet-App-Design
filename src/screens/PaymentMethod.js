import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { blackColor, BlueColor, darkBlueColor, goldColor, grayColor, lightGrayColor, lightShadeBlue, mediumGray, redColor, verylightGrayColor, whiteColor } from '../constants/Color'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../component/CustomtextInput';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign, justifyContentSpaceEvenly } = BaseStyle;


const PaymentMethod = ({ navigation }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [step, setStep] = useState(1);
    const paymentOptions = [
        { id: 1, name: 'Payoneer', email: 'emailname@gmail.com', logo: require('../assests/payoneerCard.png') },
        { id: 2, name: 'PayPal', email: 'emailname@gmail.com', logo: require('../assests/paypal.png') },
        { id: 3, name: 'dPay', email: 'emailname@gmail.com', logo: require('../assests/shopPay.png') },
        { id: 4, name: 'MasterCard', email: 'emailname@gmail.com', logo: require('../assests/masterCard.png') },
        { id: 5, name: 'Visa', email: 'emailname@gmail.com', logo: require('../assests/visaCard.png') },
    ];
    const selectedCard = paymentOptions.find(item => item.id === selectedMethod);




    return (
        <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <Pressable onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="chevron-back" size={25} color="#007bff" />
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {step === 1 ? 'Payment Method' : selectedCard?.name}
                </Text>
                <View />
            </View>

            {step === 1 ? (
                <View style={[styles.box]}>
                    <Text style={[styles.selectText, textAlign]}>Choose Your Payment Method</Text>
                    <ScrollView contentContainerStyle={{ padding: spacings.large }}>
                        {paymentOptions.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setStep(2);
                                    setSelectedMethod(item.id);
                                    setSelectedImage(item.logo);
                                }}
                                style={[
                                    styles.card,
                                    selectedMethod === item.id && styles.cardSelected
                                ]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.logo} style={styles.logo} />
                                    <View>
                                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                        <Text style={{ color: 'gray' }}>{item.email}</Text>
                                    </View>
                                </View>
                                <View style={[styles.radioOuter, selectedMethod === item.id && styles.radioOuterActive]}>
                                    {selectedMethod === item.id && (
                                        <View style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#007bff'
                                        }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={[styles.box, { paddingHorizontal: spacings.large }]}>
                        {selectedImage && (
                            <Image
                                source={selectedImage}
                                style={{ width: wp(50), height: hp(5), resizeMode: "contain", alignSelf: 'center' }}
                            />
                        )}

                        <Text style={[styles.selectText, textAlign]}>Card details</Text>
                        <CustomTextInput label={"Name"} placeholder="Name" />
                        <CustomTextInput label={"Email"} placeholder="Email" />
                        <CustomTextInput label={"Card Number"} placeholder="Card Number" />
                        <CustomTextInput label={"Expiry (MM/YY)"} placeholder="Expiry (MM/YY)" />
                        <CustomTextInput label={"CVV"} placeholder="CVV" />

                        <View style={[styles.buttonRow]}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.goBack()}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </LinearGradient >
    );
};

export default PaymentMethod

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
    box: {
        width: "95%",
        paddingVertical: spacings.Large1x,
        backgroundColor: whiteColor,
        borderRadius: 10,
        margin: 10
    },
    selectText: {
        fontSize: style.fontSizeMedium.fontSize,
        fontWeight: 'bold',
        color: blackColor,
        marginVertical: spacings.large,
        marginLeft: spacings.large,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: verylightGrayColor,
        borderRadius: 12,
        padding: spacings.xxLarge,
        paddingVertical: 20,
        marginBottom: spacings.large,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cardSelected: {
        borderWidth: 1.5,
        borderColor: BlueColor,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logo: {
        width: wp(20),
        height: hp(5),
        resizeMode: 'contain',
    },

    cardTitle: {
        fontSize: style.fontSizeMedium.fontSize,
        color: blackColor,
        fontWeight: 'bold',
    },

    cardEmail: {
        fontSize: style.fontSizeSmall.fontSize,
        color: grayColor,
    },

    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: mediumGray,
        justifyContent: 'center',
        alignItems: 'center',
    },

    radioOuterActive: {
        borderColor: BlueColor,
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: BlueColor,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 20
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 50,
        marginRight: 10
    },
    cancelText: {
        color: '#000',
    },
    sendButton: {
        backgroundColor: '#7B61FF',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 50,
    },
    sendText: {
        color: '#fff',
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8
    }
})