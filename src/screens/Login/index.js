import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Input, Button, Jarak } from "../../components"
import { loginUser } from '../../actions/AuthAction';
import { colors, responsiveHeight } from '../../utils';
import { IconLogo } from '../../assets';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    login = () => {
        const { email, password } = this.state

        if (email && password) {
            loginUser(email, password)
                .then((user) => {
                    // Pengguna berhasil login, lakukan sesuatu dengan data pengguna jika perlu
                    this.props.navigation.replace("MainApp");
                })
                .catch((error) => {
                    // Terjadi kesalahan saat login, tampilkan pesan kesalahan
                    Alert.alert('Error', error.message);
                });
        }
    }
    render() {
        const { email, password } = this.state
        return (
            <View style={styles.pages}>
                <View style={styles.logo}>
                    <IconLogo />
                </View>
                <Jarak height={20}/>
                <View style={styles.cardLogin}>
                    <Input
                        placeholder="Email"
                        onChangeText={(text) => this.setState({ email: text })} // Set email ke dalam state
                        value={email}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })} // Set password ke dalam state
                        value={password}
                    />
                    <Jarak height={20}/>
                    <View>
                        <Button
                            title="Login"
                            type="text"
                            padding={12}
                            fontSize={18}
                            onPress={() => this.login()}
                        />
                    </View>
                </View>
                <Jarak height={50}/>
                <View style={styles.register}>
                    <Text style={styles.textBlue}>Belum Punya Akun?</Text>
                    <Text style={styles.textBlue} onPress={() => this.props.navigation.navigate('Register1')}>Klik Untuk Daftar</Text>
                </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    pages: { 
        flex: 1, 
        backgroundColor: colors.white
    },
    ilustrasi:{
        position: 'absolute',
        bottom : 0,
        right: -100
  },
  logo:{
    alignItems: 'center',
    marginTop: responsiveHeight(117)
  },
  cardLogin:{
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
    padding: 30,
    borderRadius: 10,
    marginTop: 10

  },
  textBlue:{
    fontFamily: "bold",
    fontSize: 18,
    color: colors.primary
  },
  register:{
    alignItems: 'center',
    marginTop:10
  }
})