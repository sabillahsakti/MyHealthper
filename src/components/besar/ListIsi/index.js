import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../../utils';
import { Button } from '../../kecil';
import { addWorkout } from '../../../actions/WorkoutAction';
import { IconTambah } from '../../../assets';


const ListIsi = ({ kategori, data, onItemPress, navigation }) => {

  onAddWorkout = async (data) => {

    console.log(data)
    try {
      const user = await addWorkout(data);
      Alert.alert("Berhasil", "Workout added successfully")
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    console.log(data)
  }

  if (kategori === "resep") {
    onItemPress = (item) => {
      navigation.navigate("Detail Resep", { item })
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item)}>
            <Image source={item.gambar} style={styles.image} />
            <Text style={styles.judul}>{item.judul}</Text>
            <Text style={styles.kalori}>{item.kalori} Kalori</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    );
  } else if (kategori === "workout") {
    onItemPress = (item) => {
      navigation.navigate("Detail Workout", { item })
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.judul}>{item.name}</Text>
            <Text style={styles.kalori}>{item.caloriesBurned} Kalori Dibakar / {item.quantity}</Text>
            <TouchableOpacity onPress={() => onAddWorkout(item)}>
              <IconTambah />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    margin: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  judul: {
    fontFamily: 'regular',
    fontSize: 14,
    marginTop: 8,
  },
  kalori: {
    fontFamily: 'regular',
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
});

export default ListIsi;
