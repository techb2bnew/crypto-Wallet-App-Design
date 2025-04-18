import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { goldColor, whiteColor } from '../constants/Color';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#007bff",
  }
};

const CryptoOverviewScreen = ({ navigation }) => {
  const graphData = {
    labels: ["6:00", "10:00", "14:00", "18:00", "22:00", "2:00"],
    datasets: [
      {
        data: [194, 198, 192, 196, 197, 199],
        color: (opacity = 1) => `rgba(0, 200, 100, ${opacity})`,
      }
    ]
  };

  return (
   <LinearGradient colors={[whiteColor, "#F2f2f9", "#F2f2f9"]}style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Pressable onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="chevron-back" size={25} color="#007bff" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Payment Method
        </Text>
        <View />
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Foundation name="bitcoin-circle" size={40} color={goldColor} style={styles.icon} />
            <Text style={styles.cryptoSymbol}>BTC</Text>
            <Text style={styles.cryptoName}>Bitcoin</Text>
          </View>
          <Text style={styles.price}>$62.089,76</Text>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentage}>▲ 6,57%</Text>
          </View>

          {/* Chart */}
          <LineChart
            data={graphData}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />

          {/* Time Tabs */}
          <View style={styles.tabs}>
            {["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "MAX"].map((label, i) => (
              <Text key={i} style={[styles.tab, label === "1D" && styles.tabActive]}>
                {label}
              </Text>
            ))}
          </View>

          {/* Range Selector */}
          <View style={styles.timeRange}>
            {["1H", "1D", "1M", "All"].map((label, i) => (
              <TouchableOpacity key={i} style={[styles.timeButton, label === "1D" && styles.timeButtonActive]}>
                <Text style={[styles.timeText, label === "1D" && styles.timeTextActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buy/Sell Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sellButton}>
              <Text style={styles.buttonText}>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buttonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CryptoOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
    overflow: "hidden"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cryptoSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7931a',
  },
  cryptoName: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  percentageContainer: {
    backgroundColor: '#d4f8d4',
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10
  },
  percentage: {
    color: '#0a9d4c',
    fontWeight: '600'
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  tab: {
    fontSize: 12,
    color: '#999',
    margin: 4
  },
  tabActive: {
    color: '#0a9d4c',
    fontWeight: 'bold'
  },
  timeRange: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timeButtonActive: {
    backgroundColor: '#000',
  },
  timeText: {
    fontSize: 13,
    color: '#888',
  },
  timeTextActive: {
    color: '#fff',
    fontWeight: '600'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    borderRadius: 50,
    marginRight: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
});
