import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Input, Button, Jarak, Pilihan } from '../../components'
import { registerUser } from '../../actions/AuthAction'
import { colors, responsiveHeight, responsiveWidth } from '../../utils'
import { RegisterIlustrasi } from '../../assets'

export class Register2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      target: '',
      aktifitas: '',
      umur: '',
      tinggiBadan: '',
      beratBadan: ''
    }
  }


  onContinue = async () => {
    const { target, aktifitas, umur, tinggiBadan, beratBadan } = this.state
    if (target && aktifitas && umur && tinggiBadan && beratBadan) {

      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nohp: this.props.route.params.nohp,
        target: target,
        aktifitas: aktifitas,
        umur: umur,
        tinggiBadan: tinggiBadan,
        beratBadan: beratBadan,
        status: 'user'
      }

      //Ke Auth Action
      // this.props.dispatch(registerUser(data, this.props.route.params.password))
      try {
        const user = await registerUser(data, this.props.route.params.password);
        this.props.navigation.replace('MainApp');
      } catch (error) {
        Alert.alert('Error', error.message);
      }

    } else {
      Alert.alert("Error", "Data harus diisi semua")
    }
  }
  render() {
    const { target, aktifitas, umur, tinggiBadan, beratBadan } = this.state
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
              <Text style={styles.title}>Penilaian</Text>
              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Jarak width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
            </View>
            <View style={styles.card}>
              <Pilihan
                label="Target"
                selectedValue={target}
                onValueChange={(target) => this.setState({
                  target: target,
                })}
              />
              <Pilihan
                label="Aktifitas Harian"
                selectedValue={aktifitas}
                onValueChange={(aktifitas) => this.setState({
                  aktifitas: aktifitas,
                })}
              />
              <Input
                placeholder="Umur"
                keyboardType="number-pad"
                value={umur}
                onChangeText={(umur) => this.setState({ umur })}
              />
              <Input
                placeholder="Tinggi Badan"
                keyboardType="number-pad"
                value={tinggiBadan}
                onChangeText={(tinggiBadan) => this.setState({ tinggiBadan })}
              />
              <Input
                keyboardType="number-pad"
                placeholder="Berat Badan"
                value={beratBadan}
                onChangeText={(beratBadan) => this.setState({ beratBadan })}
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

export default Register2

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