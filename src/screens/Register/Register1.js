import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Input, Button, Jarak } from '../../components'
import { registerUser } from '../../actions/AuthAction'
import { colors, responsiveHeight, responsiveWidth } from '../../utils'
import { RegisterIlustrasi } from '../../assets'

export class Register1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            nohp: '',
            email: '',
            password: ''
        }
    }


    onContinue = () => {
        const { nama, email, nohp, password } = this.state;
        if (nama && email && nohp && password) {
            this.props.navigation.navigate('Register2', this.state)
        } else {
            Alert.alert("Error", "Nama, Email, No Hp, dan Password harus diisi")
        }
    }
    render() {
        const { nama, email, nohp, password } = this.state
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.page}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.btnBack}>
                            <Button icon="arrow-left" onPress={() => this.props.navigation.goBack()} />
                        </View>
                        <View style={styles.ilustrasi}>
                            <RegisterIlustrasi />
                            <Jarak height={10} />
                            <Text style={styles.title}>Daftar</Text>
                            <Text style={styles.title}>Isi Data Diri Anda</Text>

                            <View style={styles.wrapperCircle}>
                                <View style={styles.circlePrimary}></View>
                                <Jarak width={10} />
                                <View style={styles.circleDisabled}></View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Input
                                placeholder="Nama"
                                value={nama}
                                onChangeText={(nama) => this.setState({ nama })}
                            />
                            <Input
                                placeholder="Email"
                                value={email}
                                onChangeText={(email) => this.setState({ email })}
                            />
                            <Input
                                placeholder="No. Handphone"
                                keyboardType="number-pad"
                                value={nohp}
                                onChangeText={(nohp) => this.setState({ nohp })}
                            />
                            <Input
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={(password) => this.setState({ password })}
                            />
                            <Jarak height={30} />
                            <Button
                                title="Continue"
                                type="textIcon"
                                icon="submit"
                                padding={10}
                                fontSize={18}
                                onPress={() => this.onContinue()}
                            />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

export default Register1

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white
    },
    ilustrasi: {
        alignItems: 'center',
        marginTop: responsiveHeight(50)
    },
    title: {
        fontSize: 24,
        fontFamily: "light",
        color: colors.primary
    },
    wrapperCircle: {
        flexDirection: 'row',
        marginTop: 10
    },
    circlePrimary: {
        backgroundColor: colors.primary,
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        borderRadius: 10
    },
    circleDisabled: {
        backgroundColor: colors.border,
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        borderRadius: 10
    },
    card: {
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 10,
        borderRadius: 10,
        marginTop: 10
    },
    btnBack: {
        marginLeft: 30,
        marginTop: responsiveHeight(40),
        position: 'absolute',
        zIndex: 1
    }
})