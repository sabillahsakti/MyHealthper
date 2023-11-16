import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button, Header, Input, Jarak } from '../../components'
import { colors, responsiveHeight } from '../../utils'
import { IconBookmark } from '../../assets'

export class DetailResep extends Component {
  constructor(props) {
    super(props)

    this.state = {
      judul: this.props.route.params.item.judul,
      gambar: this.props.route.params.item.gambar,
      isi: this.props.route.params.item.isiResep,
      kalori: this.props.route.params.item.kalori,
      langkah: this.props.route.params.item.langkah,
    }
  }
  render() {
    const { judul, gambar, isi, kalori, langkah } = this.state
    return (
      <View style={styles.page}>
        <ImageBackground source={gambar} style={styles.imageBackground}>
          <View style={styles.header}>
            <Header title="Detail Resep" color={colors.primary} onBackPress={() => this.props.navigation.goBack()} />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.desc}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.nama}>{judul}</Text>
              <IconBookmark />
            </View>
            <View style={styles.garis} />
            <View style={styles.wrapperJenis}>
              <Text style={{ fontFamily: 'bold', marginRight: 3, fontSize: 15 }}>{kalori}</Text>
              <Text style={{ fontSize: 13 }}>kkal</Text>
            </View>
            <View style={styles.isi}>
              <Text style={styles.jenis}>{isi}</Text>
            </View>
            <Text style={styles.subJudul}>Langkah-langkah:</Text>
            {langkah.map((step, index) => (
              <View key={index} style={styles.langkahItem}>
                <Text style={styles.langkahNumber}>{index + 1}</Text>
                <Text style={styles.langkahText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default DetailResep

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(550),
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  page: {
    flex: 1,
  },
  header: {
    marginTop: 30,
  },
  image: {
    width: '100%', // Lebar gambar 100% agar memenuhi layar
    height: responsiveHeight(300),
    justifyContent: 'center', // Tengah secara vertikal
    resizeMode: 'cover',
  },
  imageBackground: {
    width: '100%',
    height: responsiveHeight(400),
  },
  desc: {
    marginHorizontal: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  nama: {
    fontFamily: "bold",
    textTransform: 'capitalize',
    fontSize: 24,
    marginBottom: 10,
  },
  garis: {
    borderWidth: 0.4,
    marginVertical: 5,
  },
  wrapperJenis: {
    marginTop: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10, // Mengubah radius menjadi 10 agar tampilan lebih persegi
    padding: 10,
    width: '25%', // Menambahkan lebar agar sesuai dengan konten
    flexDirection: 'row',
  },
  jenis: {
    fontSize: 16,
    fontFamily: "regular",
  },
  isi: {
    marginTop: 10,
  },
  langkahItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  langkahNumber: {
    fontSize: 18,
    fontFamily: 'bold',
    marginRight: 10,
    color: colors.primary,
  },
  langkahText: {
    fontSize: 16,
    fontFamily: 'regular',
    flex: 1,
  },
})
