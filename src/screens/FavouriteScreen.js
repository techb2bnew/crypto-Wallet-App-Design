import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

const FavouriteScreen = () => {

  const normalizeData = (data) => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    if (min === max) return data.map(() => 50); // Handle flat lines
    return data.map(value => ((value - min) / (max - min)) * 100);
  };

  // Recent Signals with normalized graph data
  const favCoins = [
    { id: 1, name: "BTC", price: "$63,200.50", value: '+250.75', graphData: [62000, 63000, 62800, 63200, 64000, 63500] },
    { id: 2, name: "ETH", price: "$3,520.80", value: "-30.60", graphData: [3450, 3600, 3520, 3650, 3750, 3700] },
    { id: 3, name: "SOL", price: "$145.80", value: "+7.60", graphData: [138, 142, 140, 148, 153, 150] },
    { id: 4, name: "ADA", price: "$0.78", value: "-0.01", graphData: [0.72, 0.74, 0.75, 0.76, 0.78, 0.77] },
    { id: 5, name: "DOT", price: "$23.00", value: "+2.10", graphData: [21, 22, 21.5, 23, 24, 23.5] },
    { id: 6, name: "AVAX", price: "$88.90", value: "+4.50", graphData: [82, 84, 85, 88, 91, 89] },
    { id: 7, name: "MATIC", price: "$1.35", value: "-0.05", graphData: [1.30, 1.32, 1.31, 1.34, 1.38, 1.36] },
    { id: 8, name: "XRP", price: "$0.95", value: "+0.04", graphData: [0.90, 0.92, 0.91, 0.94, 0.97, 0.96] },
    { id: 9, name: "LTC", price: "$89.60", value: "-1.20", graphData: [85, 87, 86, 89, 92, 90] },
    { id: 10, name: "DOGE", price: "$0.28", value: "+0.02", graphData: [0.25, 0.26, 0.27, 0.28, 0.30, 0.29] },
    { id: 11, name: "BCH", price: "$320.40", value: "+15.30", graphData: [310, 315, 312, 320, 325, 322] },
    { id: 12, name: "UNI", price: "$12.80", value: "-0.40", graphData: [11.5, 12, 11.8, 12.5, 13, 12.7] },
  ].map(item => ({
    ...item,
    graphData: normalizeData(item.graphData)
  }));


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
      <Header text={"Favourite"} />
      <View style={[styles.container]}>
        <View style={[styles.recentBox, flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween]}>
          <Text style={styles.sectionTitle}>Favorite Coins</Text>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, { width: wp(20), paddingRight: 10 }]}>
            <Text style={{ color: grayColor }}>Sort</Text>
            <TouchableOpacity style={{ width: wp(12), alignItems: "flex-end" }}>
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
          data={favCoins}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recentflatList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SignalCard item={item} />}
        />
      </View>
    </LinearGradient>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    padding: spacings.large
  },
  recentBox: {
    width: "100%",
    height: hp(7)
  },
  sectionTitle: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: "bold",
    color: blackColor,
    marginVertical: 10,
  },
  recentflatList: {
    width: "100%",
    height: Platform.OS === "android" ? hp(72) : hp(63),
  },
  signalCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 8, borderRadius: 10, marginVertical: 5, overflow: 'hidden' },
  signalText: { flex: 1, fontWeight: "bold", fontSize: 14 },
  signalPrice: { flex: 1, fontSize: 14 },
})