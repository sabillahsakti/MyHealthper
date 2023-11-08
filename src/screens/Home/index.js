import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, CategoryTab, Input, Jarak, ListMenu, ListNote } from '../../components'
import { colors, getData, responsiveHeight } from '../../utils'
import { IconApi, IconMakan } from '../../assets'
import { dummyMenu, dummyBerita } from '../../data';
import ListBerita from '../../components/besar/ListBerita';

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false,
      menus: dummyMenu,
      beritas: dummyBerita
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        if (data) {
          console.log("isi data", data);
          this.setState({
            profile: data
          })
        } else {
          // this.props.navigation.replace('Login')
        }
      })
  }
  render() {
    const { profile, menus, beritas } = this.state
    return (
      <ScrollView style={styles.page} onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          <View style={styles.header}>
            <Text style={{ color: colors.white }}>Selamat Datang</Text>
            <Text style={styles.nama}>{profile.nama}</Text>
          </View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.judul}>Target Harian</Text>
            <Button type="text" title="tombol" padding={10} color={colors.white}/>
            </View>
            <View style={styles.content}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AnimatedCircularProgress
                  size={100}
                  width={20}
                  fill={20}
                  tintColor={colors.primary}
                  backgroundColor="#3d5875">
                  {
                    (fill) => (
                      <Text>
                        2600
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
              </View>
              <View>
                <Text style={styles.title}>Calori Makanan</Text>
                <View style={{ flexDirection: 'row' }}>
                  <IconMakan />
                  <Text style={{ marginTop: 7 }}>1000</Text>
                </View>
                <Jarak height={10} />
                <Text style={styles.title}>Harus Dibakar</Text>
                <View style={{ flexDirection: 'row' }}>
                  <IconApi />
                  <Text style={{ marginTop: 7 }}>500</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.menu}>
            <Text style={styles.judul}>Menu</Text>
            <View>
              <ListMenu menus={menus} navigation={this.props.navigation} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.judul}>Artikel</Text>
            <View>
              <ListBerita beritas={beritas} navigation={this.props.navigation}/>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginHorizontal: 0,
    backgroundColor: colors.primary,
    borderBottomRightRadius: '40%',
    borderBottomLeftRadius: '40%',
    height: responsiveHeight(145),
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  judul: {
    fontFamily: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  nama: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 25
  },
  card: {
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20
  },
  menu: {
    marginHorizontal: 20,
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  },
  title: {
    fontFamily: 'bold',
    fontSize: 15
  }
})