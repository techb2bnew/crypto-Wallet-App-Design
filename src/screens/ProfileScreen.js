import { StyleSheet, Text, View, Image, Pressable, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
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
import ButtonComponent from '../component/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign, justifyContentSpaceEvenly } = BaseStyle;


const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setModalVisible(false);
    console.log("User logged out");
    navigation.navigate('AuthStack');
  };

  return (
    <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={[flex]}>
      <Header text={"Profile"} />
      <View style={{ flex: 1, padding: spacings.large }}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.box, alignJustifyCenter]}>
              <Image source={USER_IMAGE} style={styles.userImage} />
              <Text style={[styles.userName, textAlign]}>John Deo</Text>
              <Text style={[{ color: grayColor }, textAlign]}>@johnDeo</Text>
            </View>
            <View style={[styles.box, { marginTop: 10 }, alignJustifyCenter]}>
              <Text style={[{ color: grayColor, fontWeight: style.fontWeightThin1x.fontWeight, marginVertical: spacings.large }, textAlign]}>Current Wallet Balance</Text>
              <Text style={[styles.currentBalanceText, textAlign]}>$3,440.46</Text>
              <Pressable style={[{ width: wp(50), height: hp(5), backgroundColor: "#F2f2f2", borderRadius: 50, alignSelf: "center", marginVertical: spacings.large }, alignJustifyCenter, flexDirectionRow]}>
                <Text style={[{ color: grayColor, fontWeight: style.fontWeightThin1x.fontWeight }, textAlign]}>Smart Change BPO-20</Text>
                <MaterialIcons name="keyboard-arrow-down" size={25} color={grayColor} />
              </Pressable>
              <View style={[styles.buttonContainer, alignItemsCenter, flexDirectionRow, justifyContentSpaceEvenly]}>
                <View>
                  <Pressable style={[styles.actionButton, alignJustifyCenter]} onPress={() => navigation.navigate("TransferScreen", {
                    from: "Send"
                  })}>
                    <MaterialIcons name="login" size={30} color={blackColor} />
                  </Pressable>
                  <Text style={[{ color: grayColor, fontWeight: style.fontWeightThin1x.fontWeight, marginTop: spacings.large }, textAlign]}>Send</Text>
                </View>
                <View>
                  <Pressable style={[styles.actionButton, { backgroundColor: BlueColor }, alignJustifyCenter]} onPress={() => navigation.navigate("TransferScreen", {
                    from: "Buy"
                  })}>
                    <Fontisto name="plus-a" size={30} color={whiteColor} />
                  </Pressable>
                  <Text style={[{ color: grayColor, fontWeight: style.fontWeightThin1x.fontWeight, marginTop: spacings.large }, textAlign]}>Buy</Text>
                </View>
                <View>
                  <Pressable style={[styles.actionButton, alignJustifyCenter]} onPress={() => navigation.navigate("TransferScreen", {
                    from: "Receive"
                  })}>
                    <MaterialIcons name="check" size={30} color={blackColor} />
                  </Pressable>
                  <Text style={[{ color: grayColor, fontWeight: style.fontWeightThin1x.fontWeight, marginTop: spacings.large }, textAlign]}>Receive</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.userName, { fontWeight: style.fontWeightMedium1x.fontWeight, marginTop: spacings.large }]}>Account Details</Text>

            <View style={[styles.box, { marginTop: 10 }, alignJustifyCenter]}>
              <Pressable style={[justifyContentSpaceBetween, flexDirectionRow, { padding: spacings.large, width: "100%" }]} onPress={() => navigation.navigate("SettingScreen", {
                from: "Edit Profile"
              })}>
                <View style={[flexDirectionRow]}>
                  <Ionicons name="settings-outline" size={25} color={"#4A5CF5"} />
                  <Text style={[styles.userName, { marginLeft: spacings.xxLarge }]}>Settings</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={25} color={"#4A5CF5"} />

              </Pressable>

              <View style={{ width: "90%", alignSelf: 'center', backgroundColor: lightGrayColor, height: 1.5, marginVertical: spacings.large }} />

              <Pressable style={[justifyContentSpaceBetween, flexDirectionRow, { padding: spacings.large, width: "100%" }]} onPress={() => navigation.navigate("PaymentMathod")}>
                <View style={[flexDirectionRow]}>
                  <MaterialIcons name="payment" size={25} color={"#4A5CF5"} />
                  <Text style={[styles.userName, { marginLeft: spacings.xxLarge }]}>Payment Method</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={25} color={"#4A5CF5"} />
              </Pressable>

              <View style={{ width: "90%", alignSelf: 'center', backgroundColor: lightGrayColor, height: 1.5, marginVertical: spacings.large }} />

              <Pressable style={[justifyContentSpaceBetween, flexDirectionRow, { padding: spacings.large, width: "100%" }]} onPress={() => navigation.navigate("SettingScreen", {
                from: "Security"
              })}>
                <View style={[flexDirectionRow]}>
                  <MaterialIcons name="security" size={25} color={"#4A5CF5"} />
                  <Text style={[styles.userName, { marginLeft: spacings.xxLarge }]}>Security</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={25} color={"#4A5CF5"} />
              </Pressable>
              <View style={{ width: "90%", alignSelf: 'center', backgroundColor: lightGrayColor, height: 1.5, marginVertical: spacings.large }} />

              <Pressable style={[justifyContentSpaceBetween, flexDirectionRow, { padding: spacings.large, width: "100%" }]} onPress={() => navigation.navigate("SettingScreen", {
                from: "Help And Support"
              })}>
                <View style={[flexDirectionRow]}>
                  <MaterialIcons name="support-agent" size={25} color={"#4A5CF5"} />
                  <Text style={[styles.userName, { marginLeft: spacings.xxLarge }]}>Help & Support</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={25} color={"#4A5CF5"} />
              </Pressable>
              <View style={{ width: "90%", alignSelf: 'center', backgroundColor: lightGrayColor, height: 1.5, marginVertical: spacings.large }} />

              <Pressable style={[justifyContentSpaceBetween, flexDirectionRow, { padding: spacings.large, width: "100%" }]} onPress={() => setModalVisible(true)}>
                <View style={[flexDirectionRow]}>
                  <Ionicons name="power-sharp" size={25} color={"#4A5CF5"} />
                  <Text style={[styles.userName, { marginLeft: spacings.xxLarge }]}>Logout</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={25} color={"#4A5CF5"} />
              </Pressable>
              <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalWrapper}>
                  <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Logout</Text>
                    <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>


                    <View style={styles.buttonRow}>
                      <Pressable onPress={handleLogout} style={[styles.yesButton, alignJustifyCenter]}>
                        <Text style={styles.buttonText}>Yes</Text>
                      </Pressable>
                      <Pressable onPress={() => setModalVisible(false)} style={[styles.yesButton, alignJustifyCenter, { backgroundColor: "#ccc" }]}>
                        <Text style={[styles.buttonText, { color: blackColor }]}>No</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  )
}

export default ProfileScreen

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
  currentBalanceText: {
    fontSize: style.fontSizeLarge2x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    marginVertical: spacings.large
  },
  buttonContainer: {
    width: "100%",
    padding: spacings.large
  },
  actionButton: {
    width: hp(8),
    height: hp(8),
    borderRadius: 50,
    backgroundColor: lightGrayColor
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    gap: 15,
  },
  yesButton: {
    backgroundColor: '#4A5CF5',
    paddingVertical: 10,
    width: wp(70),
    borderRadius: 50,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})