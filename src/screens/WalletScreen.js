import { Animated, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { blackColor, BlueColor, darkBlueColor, goldColor, grayColor, greenColor, lightGrayColor, redColor, verylightGrayColor, whiteColor } from '../constants/Color'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import Header from '../component/Header';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from 'react-native-vector-icons/Foundation';

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign, justifyContentSpaceEvenly } = BaseStyle;

const WalletScreen = ({ navigation }) => {

  const normalizeData = (data) => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    if (min === max) return data.map(() => 50); // Handle flat lines
    return data.map(value => ((value - min) / (max - min)) * 100);
  };

  const marketStocks = [
    { id: '1', name: 'BTC', type: "Bitcoin", price: '$62,089.76', change: '+201.01', graphData: [61000, 62000, 61800, 62200, 63000, 62500] },
    { id: '2', name: 'ETH', type: "Ethereum", price: '$3,450.20', change: '-45.20', graphData: [3400, 3550, 3480, 3600, 3700, 3650] },
    { id: '3', name: 'SOL', type: "Solana", price: '$142.50', change: '+5.30', graphData: [135, 140, 138, 145, 150, 148] },
  ].map(item => ({
    ...item,
    graphData: normalizeData(item.graphData)
  }));

  const MarketCard = ({ item }) => {
    const isNegative = item.change.startsWith("-");
    const arrow = isNegative ? "▼" : "▲";
    const arrowColor = isNegative ? redColor : greenColor;

    const normalizeData = (data) => {
      const min = Math.min(...data);
      const max = Math.max(...data);
      return data.map(val => ((val - min) / (max - min)) * 100);
    };

    const chartData = normalizeData(item.graphData);

    return (
      <View style={styles.marketCard}>
        {/* Top section with icon + name + chart */}
        <View style={styles.topSection}>
          <View style={styles.iconAndName}>
            <Foundation name="bitcoin-circle" size={40} color={goldColor} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.coinName}>{item.name}</Text>
              <Text style={styles.coinType}>{item.type}</Text>
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <LineChart
              data={{
                labels: ["1", "2", "3", "4", "5", "6"], // Labels for the data points
                datasets: [{ data: chartData }]
              }}
              width={200}
              height={50}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              chartConfig={{
                backgroundGradientFrom: whiteColor,
                backgroundGradientTo: whiteColor,
                color: (opacity = 1) => isNegative ? `rgba(200, 32, 9, ${opacity})` : `rgba(2, 235, 79, ${opacity})`,
                strokeWidth: 2,
                fillShadowGradient: isNegative ? 'rgba(200, 32, 9, 0.2)' : 'rgba(2, 235, 79, 0.2)',
                fillShadowGradientOpacity: 0.3
              }}
              bezier
            />

          </View>
        </View>
        <View style={[styles.topSection, { padding: spacings.large }]}>
          {/* Price */}
          <Text style={styles.coinPrice}>{item.price}</Text>

          {/* Change */}
          <Text style={[styles.coinChange, { color: arrowColor }]}>
            {item.change} {arrow}
          </Text>
        </View>
        {/* Time buttons */}
        <View style={styles.timeTabs}>
          {["1H", "1D", "1M", "All"].map((label, index) => (
            <TouchableOpacity key={index} style={styles.tabButton}>
              <Text style={styles.tabText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={[flex]}>
       <KeyboardAvoidingView
              // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
      <Header text={"Wallet"} />
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
      <View style={{ width: "90%", alignSelf: 'center', backgroundColor: lightGrayColor, height: 1.5, marginVertical: spacings.large }} />
      <View style={[styles.recentBox, flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween]}>
        <Text style={styles.sectionTitle}>Recent Signals</Text>
        <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, { width: wp(20), paddingRight: 10 }]}>
          <Text style={{ color: grayColor }}>Sort</Text>
          <TouchableOpacity style={{ width: wp(15), alignItems: "flex-end" }}>
            <MaterialIcons name="grid-view" size={28} color={darkBlueColor} />
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={marketStocks}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.marketList}
        renderItem={({ item }) => <MarketCard item={item} />}
      />
      </KeyboardAvoidingView>
    </LinearGradient >
  )
}

export default WalletScreen

const styles = StyleSheet.create({
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
  recentBox: {
    width: "95%",
    height: hp(7),
    paddingHorizontal: spacings.xLarge
  },
  sectionTitle: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: "bold",
    color: blackColor,
    marginVertical: 10,
  },
  marketCard: {
    backgroundColor: whiteColor,
    borderRadius: 16,
    padding: 16,
    marginLeft: 16,
    width: wp(80),
    height: Platform.OS === "android" ? hp(23) : hp(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartWrapper: {
    alignItems: "flex-end",
    backgroundColor: greenColor
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
    color: blackColor,
  },
  coinType: {
    fontSize: 12,
    color: grayColor,
  },
  coinPrice: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: blackColor,
  },
  coinChange: {
    fontSize: 14,
    marginTop: 5,
  },
  timeTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: verylightGrayColor,
  },
  tabText: {
    fontSize: 12,
    color: blackColor,
  },
})