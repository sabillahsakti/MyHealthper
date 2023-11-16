import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { colors, responsiveHeight } from '../../utils'
import { IconAdd, IconBack, IconSearch } from '../../assets'
import { Button, Header, Jarak, ListIsi } from '../../components'
import { dummyWorkout } from '../../data'

export class Workout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            selectedCategory: 'Perut',
            dummyWorkout: dummyWorkout
        }
    }
    handleCategoryClick = (category) => {
        this.setState({
            selectedCategory: category
        })
    };
    selesaiCari() {
        const { search, dummyWorkout } = this.state;
        const kataKunci = search.toLowerCase(); // Konversi kata kunci ke huruf kecil agar pencarian bersifat case-insensitive

        // Filter data resep berdasarkan kata kunci
        const hasilCari = dummyWorkout.filter((workout) =>
            workout.name.toLowerCase().includes(kataKunci) // Anda bisa menyesuaikan dengan properti data resep yang ingin Anda cari
        );

        this.setState({ filteredWorkout: hasilCari }); // Simpan hasil pencarian di state
    }

    

    render() {
        const { search, selectedCategory, dummyWorkout } = this.state
        const uniqueCategories = [...new Set(dummyWorkout.map(item => item.category))];
        const filteredWorkout = dummyWorkout.filter(resep => selectedCategory === resep.category);

        return (
            <SafeAreaView style={styles.page}>
                <Header title="Workout" onBackPress={() => this.props.navigation.goBack()} />
                <Text style={styles.judul}>Mau workout apa hari ini?</Text>
                <View style={styles.wrapperHeader}>
                    {/* Input Search */}
                    <View style={styles.searchSection}>
                        <IconSearch />
                        <TextInput
                            placeholder='Cari Workout. . .'
                            style={styles.input}
                        />
                    </View>
                    <Jarak width={10} />
                </View>
                <View style={styles.filter}>
                    <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Kategori</Text>
                    <View style={styles.category}>
                        {uniqueCategories.map((category, key) => (
                            <Button
                                key={key}
                                type="kategori"
                                title={category}
                                padding={12}
                                color={selectedCategory === category ? colors.primary : colors.white}
                                colorTitle={selectedCategory === category ? colors.white : colors.primary}
                                onPress={() => this.handleCategoryClick(category)}
                            />
                        ))}
                    </View>

                </View>
                <View>
                    <ListIsi data={filteredWorkout} navigation={this.props.navigation} kategori="workout"/>
                </View>
            </SafeAreaView>
        )
    }
}

export default Workout

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
    category: {
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