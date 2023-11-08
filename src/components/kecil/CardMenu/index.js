import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, responsiveHeight } from '../../../utils';

const CardMenu = ({ menu, navigation }) => {
  const onSubmit = () => {
    navigation.navigate(menu.halaman)
  }
  
return (
  <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
    <View style={styles.menu}>
      {menu.gambar}
      <Text style={styles.text}>{menu.nama}</Text>
    </View>
  </TouchableOpacity>
);
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Mengatur jarak di antara ikon dan teks
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'bold',
    marginTop: 10, // Jarak antara ikon dan teks
  },
  menu: {
    flexDirection: 'column', // Mengatur tampilan menjadi satu kolom
    alignItems: 'center', // Pusatkan kontennya secara horizontal
  },
});
