import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { IconDelete } from '../../assets';
import { colors, getData, responsiveHeight, removeCommas } from '../../utils';
import { deleteWorkout, getWorkout } from '../../actions/WorkoutAction';
import { deleteMakanan, getMakanan } from '../../actions/MakananAction';

export class Target extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      progresHarian: null,
      progresIdeal: null,
      kaloriSekarang: 0,
      userWorkouts: [],
      userMakanans: [],
      totalCaloriesBurned: 0,
      totalCaloriesMakanan: 0,
      remainHarian: 0,
      remainIdeal: 0,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getUserData();
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
        userWorkouts: workouts,
        userMakanans: makanans,
        totalCaloriesBurned: totalWorkout,
        totalCaloriesMakanan: totalMakanan,
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      if (data) {
        this.setState({
          profile: data,
          progresHarian: (this.state.totalCaloriesMakanan / data.kaloriHarian) * 100,
          progresIdeal: (this.state.totalCaloriesBurned / (data.kaloriHarian - data.kaloriIdeal)) * 100,
          remainHarian: data.kaloriHarian - this.state.totalCaloriesMakanan,
          remainIdeal: data.kaloriHarian - data.kaloriIdeal - this.state.totalCaloriesBurned,
        });
      } else {
        // this.props.navigation.replace('Login')
      }
    });
  };

  handleDeleteClick = (workoutId) => {
    deleteWorkout(workoutId);
    Alert.alert('Berhasil', 'Berhasil Menghapus Workout');
  };

  handleDeleteClickMakanan = (makananId) => {
    deleteMakanan(makananId);
    Alert.alert('Berhasil', 'Berhasil Menghapus Makanan');
  };

  renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <View style={styles.workoutTextContainer}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutQuantity}>{item.quantity}</Text>
        <Text style={styles.workoutCalories}>{item.caloriesBurned} cal</Text>
      </View>
      <TouchableOpacity onPress={() => this.handleDeleteClick(item.workoutId)}>
        <IconDelete />
      </TouchableOpacity>
    </View>
  );

  renderMakananItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <View style={styles.workoutTextContainer}>
        <Text style={styles.workoutName}>{item.nama}</Text>
        <Text style={styles.workoutQuantity}>{item.jumlah}</Text>
        <Text style={styles.workoutCalories}>{item.kalori} cal</Text>
      </View>
      <TouchableOpacity onPress={() => this.handleDeleteClickMakanan(item.makananId)}>
        <IconDelete />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {
      profile,
      progresHarian,
      totalCaloriesBurned,
      totalCaloriesMakanan,
      progresIdeal,
      remainIdeal,
      remainHarian,
      userWorkouts,
      userMakanans,
    } = this.state;
    let remainHarianMessage = remainHarian <= 0 ? "Kalori Harian Cukup" : `Makan ${remainHarian} Lagi!`;
    let remainIdealMessage = remainIdeal <= 0 ? "Sudah Mencapai Ideal" : `Bakar ${remainIdeal} Lagi!`;

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
                fill={progresHarian}
                tintColor={colors.primary}
                backgroundColor="#3d5875"
              >
                {(fill) => <Text>{removeCommas(profile.kaloriHarian)}</Text>}
              </AnimatedCircularProgress>
              <View>
                <Text style={{textAlign: 'justify'}}>{remainHarianMessage}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'bold', fontSize: 18 }}>Kalori Ideal</Text>
              <AnimatedCircularProgress
                size={100}
                width={20}
                fill={progresIdeal}
                tintColor={colors.primary}
                backgroundColor="#3d5875"
              >
                {(fill) => <Text>{removeCommas(profile.kaloriIdeal)}</Text>}
              </AnimatedCircularProgress>
              <Text>{remainIdealMessage}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerWorkout}>
          <Text style={styles.judul}>Workout</Text>
          <FlatList
            data={userWorkouts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderWorkoutItem}
            initialNumToRender={3} // Menampilkan 3 item pertama
            maxToRenderPerBatch={3} // Menggulir dalam batch sebanyak 3 item
            windowSize={3} // Jumlah item yang diperlukan sebelum dan sesudah yang terlihat untuk optimalisasi
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Kalori Dibakar:</Text>
            <Text style={styles.totalCalories}>{totalCaloriesBurned} cal</Text>
          </View>
        </View>
        <View style={styles.containerWorkout}>
          <Text style={styles.judul}>Makanan</Text>
          <FlatList
            data={userMakanans}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderMakananItem}
            initialNumToRender={3} // Menampilkan 3 item pertama
            maxToRenderPerBatch={3} // Menggulir dalam batch sebanyak 3 item
            windowSize={3} // Jumlah item yang diperlukan sebelum dan sesudah yang terlihat untuk optimalisasi
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Kalori Dimakan:</Text>
            <Text style={styles.totalCalories}>{totalCaloriesMakanan} cal</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Target;

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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nama: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 25,
  },
  card: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  containerWorkout: {
    marginHorizontal: 20,
    height: 200,
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
    paddingVertical: 10,
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
});
