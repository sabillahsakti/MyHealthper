import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { colors, getData, responsiveHeight, responsiveWidth } from '../../utils'
import { Button, Header, Input, Pilihan } from '../../components'

export class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: false,
            nama: '',
            email: '',
            nohp: '',
            target: '',
            aktifitas: '',
            umur: '',
            tinggiBadan: '',
            beratBadan: '',
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getUserData();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getUserData = () => {
        getData('user')
            .then(res => {
                const data = res;
                if (data) {
                    this.setState({
                        profile: data,
                        nama: data.nama,
                        email: data.email,
                        nohp: data.nohp,
                        target: data.target,
                        aktifitas: data.aktifitas,
                        umur: data.umur,
                        tinggiBadan: data.tinggiBadan,
                        beratBadan: data.beratBadan,
                    })
                } else {
                    // this.props.navigation.replace('Login')
                }
            })
    }

    render() {
        const { profile, nama, email, nohp, target, aktifitas, umur, tinggiBadan, beratBadan, } = this.state
        console.log(profile)
        return (
            <SafeAreaView style={styles.page}>
                <Header title="Edit Profile" onBackPress={() => this.props.navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <Input placeholder="Nama" value={profile.nama} onChangeText={(nama) => this.setState({ nama })} />
                    <Input placeholder="Email" value={profile.email} disabled />
                    <Input placeholder="No Handphone" value={profile.nohp} onChangeText={(nohp) => this.setState({ nohp })} keyboardType="number-pad" />
                    <Pilihan
                        label="Target"
                        selectedValue={profile.target}
                        onValueChange={(target) => this.setState({
                            target: target,
                        })}
                    />
                    <Pilihan
                        label="Aktifitas Harian"
                        selectedValue={profile.aktifitas}
                        onValueChange={(aktifitas) => this.setState({
                            aktifitas: aktifitas,
                        })}
                    />
                    <Input
                        placeholder="Umur"
                        keyboardType="number-pad"
                        value={profile.umur}
                        onChangeText={(umur) => this.setState({ umur })}
                    />
                    <Input
                        placeholder="Tinggi Badan"
                        keyboardType="number-pad"
                        value={profile.tinggiBadan}
                        onChangeText={(tinggiBadan) => this.setState({ tinggiBadan })}
                    />
                    <Input
                        keyboardType="number-pad"
                        placeholder="Berat Badan"
                        value={profile.beratBadan}
                        onChangeText={(beratBadan) => this.setState({ beratBadan })}
                    />
                    <View style={styles.inputFoto}>
                        <Text style={styles.label}>Foto Profile :</Text>

                        <View style={styles.wrapperUpload}>
                            <Image source={require('../../assets/images/avatar.png')} style={styles.foto} />
                            <View style={styles.tombolChangePhoto}>
                                <Button title="Change Photo" type="text" padding={7} onPress={() => this.getImage()} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.submit}>
                        <Button
                            title="Submit"
                            type="textIcon"
                            icon="submit"
                            padding={responsiveHeight(15)}
                            fontSize={18}
                            onPress={() => this.onSubmit()}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default EditProfile

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    inputFoto: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: "bold", // Ganti dengan "bold" agar lebih terlihat menarik
        marginBottom: 10,
    },
    foto: {
        width: responsiveWidth(150),
        height: responsiveWidth(150),
        borderRadius: responsiveWidth(75), // Setengah dari lebar atau tinggi untuk membuatnya berbentuk lingkaran
    },
    wrapperUpload: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    tombolChangePhoto: {
        marginLeft: 20,
        flex: 1,
    },
    submit: {
        marginVertical: 30,
    },
})
