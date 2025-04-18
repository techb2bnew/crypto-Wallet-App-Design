import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { blackColor, darkBlueColor, goldColor, grayColor, whiteColor } from '../constants/Color'
import { BaseStyle } from '../constants/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { style, spacings } from '../constants/Fonts';
import Header from '../component/Header';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { flex, alignItemsCenter, alignJustifyCenter, resizeModeContain, flexDirectionRow, justifyContentSpaceBetween, textAlign } = BaseStyle;

const HomeScreen = () => {
  const menuOptions = ["All", "Trending", "Favorite"];
  const [selectedMenu, setSelectedMenu] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizeData = (data) => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    if (min === max) return data.map(() => 50); // Handle flat lines
    return data.map(value => ((value - min) / (max - min)) * 100);
  };

  // Market Data (Dummy) with normalized graph data
  const marketStocks = [
    { id: '1', name: 'BTC', type: "Bitcoin", price: '$62,089.76', change: '+201.01', graphData: [61000, 62000, 61800, 62200, 63000, 62500] },
    { id: '2', name: 'ETH', type: "Ethereum", price: '$3,450.20', change: '-45.20', graphData: [3400, 3550, 3480, 3600, 3700, 3650] },
    { id: '3', name: 'SOL', type: "Solana", price: '$142.50', change: '+5.30', graphData: [135, 140, 138, 145, 150, 148] },
    { id: '4', name: 'ADA', type: "Cardano", price: '$0.75', change: '-0.02', graphData: [0.70, 0.72, 0.73, 0.74, 0.76, 0.75] },
    { id: '5', name: 'DOT', type: "Polkadot", price: '$22.30', change: '+1.50', graphData: [20, 21, 20.5, 22, 23, 22.5] },
    { id: '6', name: 'AVAX', type: "Avalanche", price: '$85.60', change: '+3.20', graphData: [80, 82, 83, 85, 88, 86] },
  ].map(item => ({
    ...item,
    graphData: normalizeData(item.graphData)
  }));

  // Recent Signals with normalized graph data
  const recentSignals = [
    { id: 1, name: "BTC", price: "$62,089.76", value: '+201.01', graphData: [61000, 62000, 61800, 62200, 63000, 62500] },
    { id: 2, name: "ETH", price: "$3,450.20", value: "-45.20", graphData: [3400, 3550, 3480, 3600, 3700, 3650] },
    { id: 3, name: "SOL", price: "$142.50", value: "+5.30", graphData: [135, 140, 138, 145, 150, 148] },
    { id: 4, name: "ADA", price: "$0.75", value: "-0.02", graphData: [0.70, 0.72, 0.73, 0.74, 0.76, 0.75] },
    { id: 5, name: "DOT", price: "$22.30", value: "+1.50", graphData: [20, 21, 20.5, 22, 23, 22.5] },
    { id: 6, name: "AVAX", price: "$85.60", value: "+3.20", graphData: [80, 82, 83, 85, 88, 86] },
  ].map(item => ({
    ...item,
    graphData: normalizeData(item.graphData)
  }));

  const MarketCard = ({ item }) => {
    const isNegative = item.change.startsWith("-");
    const arrow = isNegative ? "▼" : "▲"; // Down arrow for negative, Up arrow for positive
    const arrowColor = isNegative ? "red" : "green";
    const normalizeData = (data) => {
      const min = Math.min(...data);
      const max = Math.max(...data);
      return data.map(val => ((val - min) / (max - min)) * 100);
    };

    const chartData = normalizeData(item.graphData);
    return (
      <View style={styles.marketCard}>
        <View style={[{ width: "100%", height: 60 }, flexDirectionRow]}>
          <View>
            <Foundation name="bitcoin-circle" size={40} color={goldColor} style={styles.icon} />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.coinName}>{item.name}</Text>
            <Text style={{ fontSize: 12, color: grayColor }}>{item.type}</Text>
          </View>
        </View>
        <Text style={styles.coinPrice}>{item.price}</Text>

        {/* Bezier Line Chart */}
        <LineChart
          data={{
            labels: ["", "", "", "", "", ""],
            datasets: [{ data: chartData }]
          }}
          width={wp(40)}
          height={40}
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
          style={{ marginVertical: 5 }}
        />

        <Text style={{ color: arrowColor, fontSize: 14 }}>
          {item.change}   {arrow}
        </Text>
      </View>
    );
  };

  const SignalCard = ({ item }) => {
    const isNegative = item.value.startsWith("-");
    const arrow = isNegative ? "▼" : "▲";
    const arrowColor = isNegative ? "red" : "green";

    // Normalize data between 0-100 for consistent visualization
    const normalizeData = (data) => {
      const min = Math.min(...data);
      const max = Math.max(...data);
      return data.map(val => ((val - min) / (max - min)) * 100);
    };

    const chartData = normalizeData(item.graphData);

    return (
      <View style={styles.signalCard}>
        <Foundation name="bitcoin-circle" size={40} color={goldColor} style={styles.icon} />
        <Text style={[styles.signalText, { paddingLeft: 5 }]}>{item.name}</Text>
        <Text style={styles.signalPrice}>{item.price}</Text>

        <View style={{ width: wp(20), alignItems: 'center' }}>
          <LineChart
            data={{
              labels: ["", "", "", "", "", ""],
              datasets: [{ data: chartData }],
            }}
            width={wp(30)}
            height={35}  // Increased height
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            fromZero={false} // Don't force start from zero
            chartConfig={{
              backgroundGradientFrom: whiteColor,
              backgroundGradientTo: whiteColor,
              color: (opacity = 1) => isNegative ? `rgba(255, 0, 0, ${opacity})` : `rgba(0, 200, 0, ${opacity})`,
              strokeWidth: 3,  // Thicker line
              fillShadowGradient: isNegative ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 200, 0, 0.3)",
              fillShadowGradientOpacity: 0.5,
              propsForBackgroundLines: {
                strokeWidth: 0  // Remove any background lines
              }
            }}
            bezier
            style={{
              marginVertical: 0,
              borderRadius: 8,
              paddingRight: 10
            }}
          />
          <Text style={{ color: arrowColor, fontSize: 12, marginTop: 3 }}>
            {item.value} {arrow}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]} style={[flex]}>
      {/* Header */}
      <Header text={"TradCrypto"} />
      <View style={[styles.container]}>
        {/* Toggle Menu */}
        <View style={styles.toggleMenu}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.toggleButton, selectedMenu === option && styles.toggleButtonActive]}
              onPress={() => setSelectedMenu(option)}
            >
              <Text style={[styles.toggleText, selectedMenu === option && styles.toggleTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Market Stock */}
        <Text style={styles.sectionTitle}>Market Stock</Text>
        <FlatList
          data={marketStocks}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.marketList}
          renderItem={({ item }) => <MarketCard item={item} />}
        />
        {/* Recent Signals */}
        <View style={[styles.recentBox, flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween]}>
          <Text style={styles.sectionTitle}>Recent Signals</Text>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, { width: wp(20), paddingRight: 10 }]}>
            <Text style={{ color: grayColor }}>Sort</Text>
            <TouchableOpacity style={{ width: wp(13), alignItems: "flex-end" }}>
              <MaterialIcons name="grid-view" size={28} color={darkBlueColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.signalCard, { backgroundColor: "transparent", margin: 0, paddingVertical: 0, width: "100%" }, justifyContentSpaceBetween]}>
          <View style={{ width: "35%", paddingLeft: 5 }}>
            <Text style={{ fontSize: 14, color: grayColor }}>Name</Text>
          </View>
          <View style={{ width: "35%", paddingLeft: 25 }}>
            <Text style={{ fontSize: 14, color: grayColor }}>Price</Text>
          </View>
          <View style={{ width: "35%", paddingLeft: 25 }}>
            <Text style={{ fontSize: 14, color: grayColor, }}>Value</Text>
          </View>
        </View>
        <FlatList
          data={recentSignals}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recentflatList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SignalCard item={item} />}
        />
      </View>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: spacings.large
  },
  toggleMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  toggleButtonActive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: darkBlueColor,
  },
  toggleText: {
    color: blackColor,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: whiteColor,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: "bold",
    color: blackColor,
    marginVertical: 10,
  },
  marketList: {
    paddingBottom: 15,
  },
  marketCard: {
    backgroundColor: whiteColor,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    width: wp(38),
    overflow: "hidden"
  },
  coinIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  coinName: {
    fontWeight: "bold",
    fontSize: style.fontSizeNormal1x.fontSize,
    marginTop: spacings.normalx,
  },
  coinPrice: {
    fontSize: style.fontSizeNormal2x.fontSize,
    color: blackColor,
    fontWeight: style.fontWeightThin1x.fontWeight
  },
  coinChange: {
    fontSize: 12,
    color: "#34eb4f",
  },
  graphStyle: {
    marginVertical: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  recentBox: {
    width: "100%",
    height: hp(7)
  },
  recentflatList: {
    width: "100%",
    height: hp(28)
  },
  signalCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 8, borderRadius: 10, marginVertical: 5, overflow: 'hidden' },
  signalText: { flex: 1, fontWeight: "bold", fontSize: 14 },
  signalPrice: { flex: 1, fontSize: 14 },
})