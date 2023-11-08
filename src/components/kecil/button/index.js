import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../utils'


const Button = ({ padding, title, onPress, fontSize, color, type, colorTitle }) => {
    if (type === "kategori") {
        return (
            <TouchableOpacity 
                style={styles.container(padding, color)}
                onPress={onPress}
            >
                <Text style={styles.text(fontSize, colorTitle)}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.container(padding, color)} onPress={onPress} >
                <Text style={styles.text(fontSize)}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

export default Button

const styles = StyleSheet.create({
    container: (padding, color) => ({
        backgroundColor: color ? color : colors.secondary,
        padding: padding,
        borderRadius: '50%',
        marginTop: 7
    }),
    text: (fontSize, colorTitle) => ({
        color: colorTitle ? colorTitle : 'white',
        textAlign: 'center',
        fontFamily: 'bold',
        fontSize: fontSize ? fontSize : 13,
    })
})