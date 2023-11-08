import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import {CardMenu} from '../../kecil'

const ListMenu = ({ menus, navigation }) => {
  return (
    <View style={styles.menuContainer}>
      {menus.map((item) => (
        <CardMenu key={item.id} menu={item} navigation={navigation} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 30
  },
});

export default ListMenu