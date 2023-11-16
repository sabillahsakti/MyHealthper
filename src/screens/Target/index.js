import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Keyboard, FlatList, TouchableOpacity, Alert } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, CategoryTab, Input, Jarak, ListMenu, ListNote } from '../../components'
import { colors, getData, responsiveHeight, removeCommas } from '../../utils'
import { IconApi, IconDelete, IconMakan } from '../../assets'
import { dummyMenu, dummyBerita } from '../../data';
import ListBerita from '../../components/besar/ListBerita';
import { deleteWorkout, getWorkout } from '../../actions/WorkoutAction';


export class Target extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false,
      menus: dummyMenu,
      beritas: dummyBerita,
      progres: null,
      kaloriSekarang: 0,
      userWorkouts: [],
      totalCaloriesBurned: 0,
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getUserData();
      const workouts = await getWorkout();
      let total = 0;
      for (workout of workouts) {
        total += workout.caloriesBurned;
      }
      this.setState({
        userWorkouts: workouts,
        totalCaloriesBurned: total
      });
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
            profile: data,
            // progres: (( data.kaloriSekarang / data.kaloriHarian) * 100)
          })
        } else {
          // this.props.navigation.replace('Login')
        }
      })
  }

  handleDeleteClick = (workoutId) => {
    deleteWorkout(workoutId)
    Alert.alert("Berhasil", "Berhasil Menghapus Workout")
  }

  calculateTotalCalories = () => {
    let totalCaloriesBurned = 0;
    for (const workout of this.state.userWorkouts) {
      totalCaloriesBurned += workout.caloriesBurned;
    }

    this.setState({ totalCaloriesBurned });
  };
  render() {
    const { profile, userWorkouts, progres, totalCaloriesBurned } = this.state
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={{ color: colors.white }}>Semangat!!!</Text>
          <Text style={styles.nama}>{profile.nama}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'bold', fontSize: 18 }}>Kalori Harian</Text>
              <AnimatedCircularProgress
                size={100}
                width={20}
                fill={progres}
                tintColor={colors.primary}
                backgroundColor="#3d5875">
                {
                  (fill) => (
                    <Text>
                      {removeCommas(profile.kaloriHarian)}
                      {/* {profile.kaloriHarian} */}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'bold', fontSize: 18 }}>Kalori Ideal</Text>
              <AnimatedCircularProgress
                size={100}
                width={20}
                fill={progres}
                tintColor={colors.primary}
                backgroundColor="#3d5875">
                {
                  (fill) => (
                    <Text>
                      {removeCommas(profile.kaloriIdeal)}
                      {/* {profile.kaloriHarian} */}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
          </View>
        </View>
        <View style={styles.containerWorkout}>
          <Text style={styles.judul}>Workout</Text>
          <FlatList
            data={userWorkouts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.workoutItem}>
                <View style={styles.workoutTextContainer}>
                  <Text style={styles.workoutName}>{item.name}</Text>
                  <Text style={styles.workoutQuantity}>{item.quantity}</Text>
                  <Text style={styles.workoutCalories}>{item.caloriesBurned} cal</Text>
                </View>
                <TouchableOpacity onPress={()=>this.handleDeleteClick(item.workoutId)}>
                  <IconDelete />
                </TouchableOpacity>
              </View>
            )}
            initialNumToRender={3} // Menampilkan 3 item pertama
            maxToRenderPerBatch={3} // Menggulir dalam batch sebanyak 3 item
            windowSize={3} // Jumlah item yang diperlukan sebelum dan sesudah yang terlihat untuk optimalisasi
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Kalori Dibakar:</Text>
            <Text style={styles.totalCalories}>{this.state.totalCaloriesBurned} cal</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Target

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
  },
  containerWorkout: {
    marginHorizontal: 20,
    height: 200,
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
    marginTop: 20,
    paddingVertical: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingVertical: 8,
    marginBottom: 8,
  },
  workoutTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutName: {
    marginRight: 10,
  },
  workoutQuantity: {
    marginRight: 10,
  },
  workoutCalories: {
    color: colors.green,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalCalories: {
    color: colors.green,
  },
})