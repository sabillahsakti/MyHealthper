import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Header } from '../../components'
import { colors } from '../../utils'

export class Makanan extends Component {
    render() {
        return (
            <SafeAreaView style={styles.page}>
                <Header title="Makanan" onBackPress={() => this.props.navigation.goBack()} />

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
})