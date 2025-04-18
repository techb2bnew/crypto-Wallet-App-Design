import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { blackColor, BlueColor, darkBlueColor, goldColor, grayColor, lightGrayColor, lightShadeBlue, mediumGray, whiteColor } from '../constants/Color'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import Header from '../component/Header';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { USER_IMAGE } from '../assests/images';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../component/CustomtextInput';
import ButtonComponent from '../component/ButtonComponent';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign, justifyContentSpaceEvenly } = BaseStyle;


const SettingScreen = ({ navigation, route }) => {
    const { from } = route.params || {};

    return (
        <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={[flex]}>
            <KeyboardAvoidingView
                    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                  >
            <View style={[styles.headerConatiner, justifyContentSpaceBetween, alignItemsCenter, flexDirectionRow]}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color={BlueColor} />
                </Pressable>
                <Text style={styles.headingText}>{from}</Text>
                <View>
                </View>
            </View>
            <View style={{ flex: 1, padding: spacings.large }}>
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >        {/* profile */}
                        <View style={[styles.box, alignJustifyCenter]}>
                            <Image source={USER_IMAGE} style={styles.userImage} />
                            <Text style={[styles.userName, textAlign]}>John Deo</Text>
                            <Text style={[{ color: grayColor }, textAlign]}>@johnDeo</Text>
                        </View>
                        {/* Wallet */}
                        {from === "Edit Profile" && <View style={[styles.box, { marginTop: 10, paddingHorizontal: 20 }, alignJustifyCenter]}>
                            <Text style={[styles.headingText, { textAlign: "center" }]}>Profile Setting</Text>
                            <CustomTextInput
                                label="Firstname"
                                placeholder="Enter your Firstname"
                            />
                            <CustomTextInput
                                label="Lastname"
                                placeholder="Enter your Lastname"
                            />
                            <CustomTextInput
                                label="Username"
                                placeholder="Enter your Username"
                            />
                            <CustomTextInput
                                label="Email"
                                placeholder="Enter your Email"
                            />
                            <ButtonComponent title={"Submit"} onPress={() => navigation.goBack()} />
                        </View>}
                        {from === "Security" && <View style={[styles.box, { marginTop: 10, paddingHorizontal: 20 }, alignJustifyCenter]}>
                            <Text style={[styles.headingText, { textAlign: "center" }]}>Security</Text>
                            <CustomTextInput
                                label="OldPassword"
                                placeholder="OldPassword"
                            />
                            <CustomTextInput
                                label="NewPassword"
                                placeholder="NewPassword"
                            />
                            <CustomTextInput
                                label="ConfirmPassword"
                                placeholder="ConfirmPassword"
                            />
                            <View style={[styles.buttonRow]}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sendButton} onPress={() => navigation.goBack()}>
                                    <Text style={styles.sendText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        {from === "Help And Support" && <View style={[styles.box, { marginTop: 10, paddingHorizontal: 20 }, alignJustifyCenter]}>
                            <Text style={[styles.headingText, { textAlign: "center" }]}>Help And Support</Text>
                            <CustomTextInput
                                label="Username"
                                placeholder="Enter your Username"
                            />
                            <CustomTextInput
                                label="Email"
                                placeholder="Enter your Email"
                            />
                            <TextInput
                                placeholder="Write your issue or message here..."
                                placeholderTextColor="#999"
                                multiline={true}
                                numberOfLines={5}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 10,
                                    padding: 12,
                                    fontSize: 16,
                                    height: 120,
                                    width: "100%",
                                    textAlignVertical: 'top',
                                    backgroundColor: '#fff',
                                    marginTop: 10,
                                }}
                            />
                            <ButtonComponent title={"Submit"} onPress={() => navigation.goBack()} />
                        </View>}

                    </ScrollView>
                </View>
            </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "93%",
        // backgroundColor: "red",
        padding: spacings.large
    },
    box: {
        width: "100%",
        paddingVertical: spacings.Large1x,
        backgroundColor: whiteColor,
        borderRadius: 10
    },
    userImage: {
        width: wp(28),
        height: wp(28),
        borderRadius: 100,
        marginBottom: 10
    },
    userName: {
        fontSize: style.fontSizeMedium1x.fontSize,
        fontWeight: style.fontWeightThin1x.fontWeight
    },
    headingText: {
        fontSize: style.fontSizeMedium.fontSize,
        fontWeight: 'bold',
        color: blackColor,
    },
    headerConatiner: {
        width: wp(100),
        padding: spacings.xxxxLarge,
        borderBottomWidth: .5,
        borderBottomColor: lightGrayColor
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
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

})