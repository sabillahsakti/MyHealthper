import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../utils';

const ListResep = ({ data, onItemPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item)}>
          <Image source={item.gambar} style={styles.image} />
          <Text style={styles.judul}>{item.judul}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
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
});

export default ListResep;