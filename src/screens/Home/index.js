import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Button, CategoryTab, Input, Jarak, ListMenu, ListNote } from '../../components'
import { colors, getData, responsiveHeight, removeCommas } from '../../utils'
import { IconApi, IconMakan } from '../../assets'
import { dummyMenu, dummyBerita } from '../../data';
import ListBerita from '../../components/besar/ListBerita';
import { getWorkout } from '../../actions/WorkoutAction';
import { getMakanan } from '../../actions/MakananAction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      menus: dummyMenu,
      beritas: dummyBerita,
      progres: 0,
      progresIdeal: 0,
      totalCaloriesMakanan: 0,
      totalCaloriesBurned: 0,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const data = await getData('user');
      const workouts = await getWorkout();
      const makanans = await getMakanan();

      let totalWorkout = 0;
      for (const workout of workouts) {
        totalWorkout += workout.caloriesBurned;
      }

      let totalMakanan = 0;
      for (const makanan of makanans) {
        totalMakanan += makanan.kalori;
      }

      this.setState({
        profile: data,
        totalCaloriesBurned: totalWorkout,
        totalCaloriesMakanan: totalMakanan,
        progres: (this.state.totalCaloriesMakanan / data.kaloriHarian) * 100,
        progresIdeal: (this.state.totalCaloriesBurned / (data.kaloriHarian - data.kaloriIdeal)) * 100,
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { progresIdeal, profile, menus, beritas, progres, totalCaloriesMakanan, totalCaloriesBurned } = this.state;
    return (
      <ScrollView style={styles.page} onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          <View style={styles.header}>
            <Text style={{ color: colors.white }}>Selamat Datang</Text>
            <Text style={styles.nama}>{profile.nama}</Text>
          </View>
          <SwiperFlatList style={{ paddingBottom: 10 }}>
            {/* Tampilan Pertama */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.judul}>Target Kalori Harian</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.circularProgressContainer}>
                  <AnimatedCircularProgress
                    size={100}
                    width={20}
                    fill={progres}
                    tintColor={colors.primary}
                    backgroundColor="#3d5875">
                    {(fill) => (
                      <Text style={styles.circularProgressText}>{removeCommas(profile.kaloriHarian)}</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Kalori Makanan</Text>
                  <View style={styles.iconTextContainer}>
                    <IconMakan />
                    <Text style={styles.iconText}>{totalCaloriesMakanan}</Text>
                  </View>
                  <Jarak height={10} />
                </View>
              </View>
            </View>

            {/* Tampilan Kedua */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.judul}>Target Kalori Ideal</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.circularProgressContainer}>
                  <AnimatedCircularProgress
                    size={100}
                    width={20}
                    fill={progresIdeal}
                    tintColor={colors.primary}
                    backgroundColor="#3d5875"
                  >
                    {(fill) => <Text style={styles.circularProgressText}>{removeCommas(profile.kaloriIdeal)}</Text>}
                  </AnimatedCircularProgress>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Kalori Makanan</Text>
                  <View style={styles.iconTextContainer}>
                    <IconMakan />
                    <Text style={styles.iconText}>{totalCaloriesMakanan}</Text>
                  </View>
                  <Jarak height={10} />
                  <Text style={styles.title}>Harus Dibakar</Text>
                  <View style={styles.iconTextContainer}>
                    <IconApi />
                    <Text style={styles.iconText}>{removeCommas((profile.kaloriHarian - profile.kaloriIdeal) - totalCaloriesBurned)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </SwiperFlatList>
          <View style={styles.menu}>
            <Text style={styles.judul}>Menu</Text>
            <View>
              <ListMenu menus={menus} navigation={this.props.navigation} />
            </View>
          </View>
          <View style={styles.cardArtikel}>
            <Text style={styles.judul}>Artikel</Text>
            <View>
              <ListBerita beritas={beritas} navigation={this.props.navigation} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
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
    fontSize: 25,
  },
  card: {
    marginHorizontal: 20,
    shadowColor: '#000',
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
    marginTop: 20,
  },
  cardArtikel: {
    marginHorizontal: 20,
    shadowColor: '#000',
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
    marginTop: 20,
    marginBottom: 100 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.white,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressText: {
    fontFamily: 'bold',
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'bold',
    fontSize: 15,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginTop: 7,
  },
  menu: {
    marginHorizontal: 20,
  },
});
