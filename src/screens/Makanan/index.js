import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import { Header, Jarak, ListMakanan } from '../../components'
import { colors } from '../../utils'
import { dummyMakanan } from '../../data'
import { IconSearch } from '../../assets'

export class Makanan extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         dummyMakanan : dummyMakanan
      }
    }
    render() {
        const {dummyMakanan} = this.state
        return (
            <SafeAreaView style={styles.page}>
                <Header title="Makanan" onBackPress={() => this.props.navigation.goBack()} />
                <View style={styles.wrapperHeader}>
                    {/* Input Search */}
                    <View style={styles.searchSection}>
                        <IconSearch />
                        <TextInput
                            placeholder='Cari Makanan. . .'
                            style={styles.input}
                            value={{}}
                            onChangeText={{}}
                        />
                    </View>
                    <Jarak width={10} />
                </View>
                    <ListMakanan
                        data={dummyMakanan}
                    />
            </SafeAreaView>
        )
    }
}

export default Makanan

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
})