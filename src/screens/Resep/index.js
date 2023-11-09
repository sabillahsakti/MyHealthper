import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { colors, responsiveHeight } from '../../utils'
import { IconAdd, IconBack, IconSearch } from '../../assets'
import { Button, Header, Jarak, ListResep } from '../../components'
import { dummyResep } from '../../data'

export class Resep extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            selectedCategory: 'Makanan Pokok',
            dummyResep: dummyResep
        }
    }
    handleCategoryClick = (kategori) => {
        this.setState({
            selectedCategory: kategori
        })
    };
    selesaiCari() {
        const { search, dummyResep } = this.state;
        const kataKunci = search.toLowerCase(); // Konversi kata kunci ke huruf kecil agar pencarian bersifat case-insensitive

        // Filter data resep berdasarkan kata kunci
        const hasilCari = dummyResep.filter((resep) =>
            resep.judul.toLowerCase().includes(kataKunci) // Anda bisa menyesuaikan dengan properti data resep yang ingin Anda cari
        );

        this.setState({ filteredResep: hasilCari }); // Simpan hasil pencarian di state
    }


    render() {
        const { search, kategoris, selectedCategory, dummyResep } = this.state
        const uniqueCategories = [...new Set(dummyResep.map(item => item.kategori))];
        const filteredResep = dummyResep.filter(resep => selectedCategory === resep.kategori);

        return (
            <SafeAreaView style={styles.page}>
                <Header title="Resep Masakan" onBackPress={() => this.props.navigation.goBack()} />
                <Text style={styles.judul}>Apa yang ingin kamu masak hari ini?</Text>
                <View style={styles.wrapperHeader}>
                    {/* Input Search */}
                    <View style={styles.searchSection}>
                        <IconSearch />
                        <TextInput
                            placeholder='Cari Makanan. . .'
                            style={styles.input}
                            value={search}
                            onChangeText={(search) => this.setState({ search })}
                            onSubmitEditing={() => this.selesaiCari()}
                        />
                    </View>
                    <Jarak width={10} />
                </View>
                <View style={styles.filter}>
                    <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Kategori</Text>
                    <View style={styles.kategori}>
                        {uniqueCategories.map((kategori, key) => (
                            <Button
                                key={key}
                                type="kategori"
                                title={kategori}
                                padding={12}
                                color={selectedCategory === kategori ? colors.primary : colors.white}
                                colorTitle={selectedCategory === kategori ? colors.white : colors.primary}
                                onPress={() => this.handleCategoryClick(kategori)}
                            />
                        ))}
                    </View>

                </View>
                <View>
                    <ListResep data={filteredResep} navigation={this.props.navigation}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default Resep

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    wrapperHeader: {
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    searchSection: {
        backgroundColor: colors.border,
        borderRadius: '50%',
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        fontSize: 18,
        height: 45,
        fontFamily: "regular"
    },
    judul: {
        fontSize: 20,
        fontFamily: 'bold',
        fontStyle: 'normal',
        fontWeight: '600',
        marginHorizontal: 20
    },
    filter: {
        paddingTop: 20,
        marginHorizontal: 20
    },
    kategori: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: '50%',
        marginTop: 7
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'bold',
        fontSize: 13,
    },
})