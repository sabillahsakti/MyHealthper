import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Input, Button, Jarak, Pilihan } from '../../components'
import { registerUser } from '../../actions/AuthAction'
import { colors, responsiveHeight, responsiveWidth } from '../../utils'
import { RegisterIlustrasi } from '../../assets'
import Modal from 'react-native-modal';


export class Register2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      target: '',
      aktifitas: '',
      umur: null,
      tinggiBadan: null,
      beratBadan: null,
      jenisKelamin: '',
      hasilBMR: null,
      hasilIdeal: null,
      isModalVisible: false
    }
  }


  toggleModal = async (data) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    //Ke Auth Action
    try {
      const user = await registerUser(data, this.props.route.params.password);
      this.props.navigation.replace('MainApp');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  onContinue = async () => {
    const { target, aktifitas, umur, tinggiBadan, beratBadan, jenisKelamin, hasilBMR, hasilIdeal } = this.state
    let ak = null
    let beratBadanIdeal = null
    if (target && aktifitas && umur && tinggiBadan && beratBadan && jenisKelamin) {
      if (aktifitas === 'Tidak terlalu aktif') {
        ak = 1.4
      } else if (aktifitas === 'Cukup aktif') {
        ak = 1.5
      } else {
        ak = 1.7
      }

      beratBadanIdeal = tinggiBadan - 100;
      if (jenisKelamin === 'Laki - Laki') {

        await new Promise(resolve =>
          this.setState(
            {
              hasilBMR: ((10 * beratBadan) + (6.25 * tinggiBadan) - (5 * umur) + 5) * ak,
              hasilIdeal: ((10 * beratBadanIdeal) + (6.25 * tinggiBadan) - (5 * umur) + 5) * ak
            },
            resolve
          ))
      } else {
        await new Promise(resolve =>
          this.setState(
            {
              hasilBMR: ((10 * beratBadan) + (6.25 * tinggiBadan) - (5 * umur) - 16) * ak,
              hasilIdeal: ((10 * beratBadanIdeal) + (6.25 * tinggiBadan) - (5 * umur) - 161) * ak,
            },
            resolve
          ))
      }

      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nohp: this.props.route.params.nohp,
        target: target,
        aktifitas: aktifitas,
        umur: umur,
        tinggiBadan: tinggiBadan,
        beratBadan: beratBadan,
        jenisKelamin: jenisKelamin,
        kaloriHarian: this.state.hasilBMR,
        kaloriIdeal: this.state.hasilIdeal,
        kaloriSekarang: 0,
        status: 'user'
      }

      console.log(data)
      this.toggleModal(data);
      

    } else {
      Alert.alert("Error", "Data harus diisi semua")
    }
  }
  render() {
    const { target, aktifitas, umur, tinggiBadan, beratBadan, jenisKelamin, isModalVisible, hasilBMR, hasilIdeal } = this.state
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
              <Pilihan
                label="Jenis Kelamin"
                datas={['Laki - Laki', 'Perempuan']}
                selectedValue={jenisKelamin}
                onValueChange={(jenisKelamin) => this.setState({
                  jenisKelamin: jenisKelamin,
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
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Kalori Harian Anda</Text>
                </View>
                <Text style={styles.modalText}>{hasilBMR}</Text>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Kalori Ideal Anda</Text>
                </View>
                <Text style={styles.modalText}>{hasilIdeal}</Text>
                <TouchableOpacity onPress={this.toggleModal}>
                  <View style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView >
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
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
})