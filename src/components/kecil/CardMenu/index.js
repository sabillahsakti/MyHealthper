import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { clearStorage, colors, responsiveHeight } from '../../../utils';
import FIREBASE from '../../../config/FIREBASE';

const CardMenu = ({ menu, navigation, kategori }) => {
  const onSubmit = () => {
    if (menu.halaman === "Login") {
      FIREBASE.auth().signOut().then(function () {
        clearStorage()
        navigation.replace('Login')
      }).catch(function (error) {
        alert(error)
      })
    } else {
      navigation.navigate(menu.halaman)
    }
  }
  if (kategori === "profile") {
    return (
      <TouchableOpacity style={styles.containerProfile} onPress={() => onSubmit()}>
        <View style={styles.menuProfile}>
          {menu.gambar}
          <Text style={styles.textProfile}>{menu.nama}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
        <View style={styles.menu}>
          {menu.gambar}
          <Text style={styles.text}>{menu.nama}</Text>
        </View>
      </TouchableOpacity>
    );
  }
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

  containerProfile: {
    flexDirection: 'row',
    width: 250,
    marginTop: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: responsiveHeight(20),
    borderRadius: 10,
    alignItems: 'center'
  },
  textProfile: {
    fontSize: 18,
    fontFamily: "bold",
    marginLeft: 20
  },
  menuProfile: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
