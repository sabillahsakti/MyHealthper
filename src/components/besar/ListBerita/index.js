import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ListBerita = ({ beritas }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {beritas.map((item) => (
          <View style={styles.slide} key={item.id}>
            <Image source={item.gambar} style={styles.image} />
            <Text style={styles.judul}>{item.Judul}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: 200, // Lebar gambar sesuaikan dengan kebutuhan
    marginRight: 20, // Jarak antar gambar
  },
  image: {
    width: '100%',
    height: 150, // Tinggi gambar sesuaikan dengan kebutuhan
    borderRadius: 10, // Menambahkan border radius
    marginTop: 15,
  },
  judul: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'regular',
    textAlign: 'left', // Mengatur rata kiri
  },
});

export default ListBerita;