import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import {CardMenu} from '../../kecil'

const ListMenu = ({ menus, navigation, kategori, data }) => {
  return (
    <View style={styles.menuContainer}>
      {menus.map((item) => (
        <CardMenu key={item.id} menu={item} navigation={navigation} kategori={kategori} data={data}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30
  },
});

export default ListMenu