import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconBack } from '../../../assets'; // Import komponen IconBack dari lokasi yang sesuai

const Header = ({ title, onBackPress, color }) => {
  return (
    <TouchableOpacity style={styles.headerContainer} onPress={onBackPress}>
      <View style={styles.circle}>
        <IconBack />
      </View>
      <Text style={styles.headerText(color)}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 40, // Atur sesuai dengan lebar yang Anda inginkan
    height: 40, // Atur sesuai dengan tinggi yang Anda inginkan
    borderRadius: 20, // Setengah dari lebar atau tinggi untuk membuatnya berbentuk lingkaran
    backgroundColor: 'white', // Ganti 'yourColor' dengan warna latar belakang yang Anda inginkan
    alignItems: 'center',
    justifyContent: 'center',
  },  
  headerText: (color) => ({
    fontSize: 18,
    color: color ? 'white' : 'black', // Warna teks
    marginLeft: 10, // Jarak antara ikon dan teks
  }),
});

export default Header;
