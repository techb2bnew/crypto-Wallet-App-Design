import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputComponent from '../component/TextInputComponent';
import ButtonComponent from '../component/ButtonComponent';
import { blackColor, BlueColor, grayColor, lightBlueColor, redColor, whiteColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import { EMAIL, PASSWORD, LOGIN, OR_CONTINUE_WITH, SIGN_UP, FORGOT_PASSWORD, DONT_HAVE_ACCOUNT } from '../constants/Constants';
import { GOOGLE_LOGO_IMAGE } from '../assests/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { flex, alignJustifyCenter, flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        let isValid = true;
    
        // Reset errors before validation
        setEmailError('');
        setPasswordError('');
    
        if (!email.trim()) {
            setEmailError("Please enter your email.");
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }
    
        if (!password.trim()) {
            setPasswordError("Please enter your password.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            isValid = false;
        }
    
        if (isValid) {
            console.log("Login successful");
    
            // Store login status in AsyncStorage
            await AsyncStorage.setItem('isLoggedIn', 'true');
    
            // Replace stack with BottomTabNavigator
            navigation.navigate("BottomTabs");
        }
    };

    return (
        <LinearGradient colors={[BlueColor, lightBlueColor, whiteColor, whiteColor]} style={[flex, alignItemsCenter]}>
            <View style={[styles.container]}>
                <View style={[styles.logoContainer, alignJustifyCenter]}>
                    <Text style={styles.title}>{LOGIN}</Text>
                </View>
                {/* Email Input */}
                <TextInputComponent
                    label={EMAIL}
                    value={email}
                    setValue={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError(""); // Clear error when user types
                    }}
                    style={styles.input}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* Password Input */}
                <TextInputComponent
                    label={PASSWORD}
                    value={password}
                    setValue={(text) => {
                        setPassword(text);
                        if (passwordError) setPasswordError(""); // Clear error when user types
                    }}
                    secureTextEntry
                    style={styles.input}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


                {/* <TouchableOpacity>
          <Text style={styles.forgotPassword}>{"FORGOT_PASSWORD"}</Text>
        </TouchableOpacity> */}
                <ButtonComponent title={"Get started"} onPress={handleLogin} style={styles.button} />
                <View style={[alignJustifyCenter, { width: "100%" }]}>
                    <Text style={styles.orText}>{OR_CONTINUE_WITH}</Text>
                    <View style={[styles.socialContainer, flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
                        <TouchableOpacity style={[{ width: wp(10), height: hp(5) }, alignJustifyCenter]}>
                            <Image source={GOOGLE_LOGO_IMAGE} style={[{ width: wp(8), height: hp(4), resizeMode: "contain" }]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ width: wp(10), height: hp(5) }, alignJustifyCenter]}>
                            <FontAwesome name="facebook" size={30} color="#3C5997" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ width: wp(11), height: hp(5) }, alignJustifyCenter]}>
                            <FontAwesome name="twitter" size={30} color="skyblue" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ width: "85%", alignItems: "center", justifyContent: "center", height: hp(10), position: "absolute", bottom: hp(4) }}>
                <Text style={styles.signupText}>{DONT_HAVE_ACCOUNT}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText}>{"Register"}</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        padding: 15,
    },
    logoContainer: {
        height: hp(30),
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: whiteColor,
    },
    input: {
        width: '100%',
        height: hp(5),
        borderRadius: 10,
        backgroundColor: whiteColor,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 15,
        fontSize: 14,
        color: BlueColor,
    },
    button: {
        width: '100%',
        height: Platform.OS === "android" ? hp(5) : hp(4.5),
        borderRadius: 15,
        backgroundColor: lightBlueColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    orText: {
        marginVertical: 30,
        fontSize: 16,
        color: grayColor,
    },
    socialContainer: {
        width: '60%',
        marginBottom: 20
    },
    icon: {
        marginHorizontal: spacings.large,
    },
    signupText: {
        marginTop: 20,
        fontSize: 16,
        color: blackColor,
    },
    buttonText: {
        color: BlueColor,
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
});

export default LoginScreen;