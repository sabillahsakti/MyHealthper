import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { IconAdd } from '../../../assets';
import { colors } from '../../../utils';
import { addMakanan } from '../../../actions/MakananAction';

const ListMakanan = ({ data }) => {
    onAddMakanan = async (data) => {

        console.log(data)
        try {
          const user = await addMakanan(data);
          Alert.alert("Berhasil", "Makanan added successfully")
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      console.log(data)
    }

    const renderMakananItem = ({ item }) => (
        <View style={styles.makananItem}>
            <View>
                <Text style={styles.namaMakanan}>{item.nama}</Text>
                <Text style={styles.detailMakanan}>Jumlah: {item.jumlah} | Kalori: {item.kalori}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={()=> onAddMakanan(item)}>
                <IconAdd />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daftar Makanan</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMakananItem}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    makananItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    namaMakanan: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailMakanan: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
    },
    flatListContent: {
        paddingBottom: 20, // Adjust as needed
    },
});

export default ListMakanan;
