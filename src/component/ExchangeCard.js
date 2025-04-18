import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Foundation from 'react-native-vector-icons/Foundation';
import { goldColor, grayColor, lightGrayColor, whiteColor } from '../constants/Color';
import { spacings } from '../constants/Fonts';

const ExchangeCard = ({ title }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={{ backgroundColor: whiteColor, borderRadius: 3, padding: 3 }}>
          <AntDesign name="inbox" size={20} color={grayColor} />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>3,000.06</Text>
        </View>
        <View style={{ flexDirection: "row", width: "40%", alignItems: "center", justifyContent: "space-between" }}>
          <Foundation name="bitcoin-circle" size={30} color={goldColor} />
          <View style={{ flexDirection: "row", padding: spacings.large, backgroundColor: whiteColor, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.tokenText}>BTC</Text>
            <Ionicons name="chevron-down-outline" size={20} color={grayColor} />
          </View>
        </View>
      </View>
      <Text style={styles.subAmount}>$3,293.46</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: '#F2F2FB',
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.large,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 10
  },
  text: {
    fontWeight: '600',
    fontSize: 26,
  },

  tokenIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  tokenText: {
    fontWeight: '600',
    paddingRight: 10
  },
  subAmount: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
  },
});

export default ExchangeCard;
