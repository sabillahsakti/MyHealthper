import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const Pilihan = ({ label, datas, width, height, fontSize, selectedValue, onValueChange }) => {

    if (label === "Aktifitas Harian") {
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)}>{label} :</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        selectedValue={selectedValue}
                        itemStyle={styles.picker(width, height, fontSize)}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="-- Pilih --" value="" />
                        <Picker.Item
                            label="Tidak terlalu aktif ( banyak aktivitas duduk, kerja kantoran, berseda, berkebun)"
                            value="Tidak terlalu aktif ( banyak aktivitas duduk, kerja kantoran, berseda, berkebun)"
                        />
                        <Picker.Item
                            label="Cukup aktif (banyak aktivitas berdiri, seorang guru, ibu rumah tangga, menari)"
                            value="Cukup aktif (banyak aktivitas berdiri, seorang guru, ibu rumah tangga, menari)"
                        />
                        <Picker.Item
                            label="Sangat aktif (banyak beraktivitas fisik, atletik)"
                            value="Sangat aktif (banyak beraktivitas fisik, atletik)"
                        />
                    </Picker>
                </View>
            </View>
        )
    } else if (label === "Target") {
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)}>{label} :</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        selectedValue={selectedValue}
                        itemStyle={styles.picker(width, height, fontSize)}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="-- Pilih --" value="" />
                        <Picker.Item
                            label="Menurunkan berat badan"
                            value="Menurunkan berat badan"
                        />
                        <Picker.Item
                            label="Menjaga berat badan"
                            value="Menjaga berat badan"
                        />
                        <Picker.Item
                            label="Menambah berat badan"
                            value="Menambah berat badan"
                        />
                        <Picker.Item
                            label="Menambah otot"
                            value="Menambah otot"
                        />
                        <Picker.Item
                            label="Memperbaiki pola makan"
                            value="Memperbaiki pola makan"
                        />
                        <Picker.Item
                            label="Kelola stress"
                            value="Kelola stress"
                        />
                    </Picker>
                </View>
            </View>
        )
    }
}

export default Pilihan

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    label: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
    }),
    picker: (width, height, fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        width: width,
        height: height ? height : 46,
        color: 'black'
    }),
    wrapperPicker: {
        borderWidth: 1,
        borderRadius: 5,
    }
})