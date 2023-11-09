import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { Button, Input, ListMenu } from '../../components'
import { clearStorage, getData } from '../../utils';
import FIREBASE from '../../config/FIREBASE';
import { dummyProfile } from '../../data'



export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false,
      menus: dummyProfile
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
          console.log("isi data", data);
          this.setState({
            profile: data
          })
        } else {
          // this.props.navigation.replace('Login')
        }
      })
  }
  onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth().signOut().then(() => {
        // Sign-out successful.
        clearStorage();
        this.props.navigation.replace('MainApp')
      }).catch((error) => {
        // An error happened.
        alert(error)
      });
    } else {
      this.props.navigation.replace("Login")
    }
  }
  render() {
    const { profile, menus } = this.state
    return (
      // <Button
      //   type="text"
      //   title={profile ? "Logout" : "Login"}
      //   padding={13}
      //   onPress={() => this.onSubmit(profile)}
      // />
      <SafeAreaView style={styles.page}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.container}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.foto} />
          <Text style={styles.nama}>{profile.nama}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={styles.tbContainer}>
              <Text style={{ fontSize: 20, fontFamily: 'bold' }}>{profile.beratBadan}</Text>
              <Text>Berat Badan</Text>
            </View>
            <View style={styles.tbContainer}>
              <Text style={{ fontSize: 20, fontFamily: 'bold'  }}>{profile.tinggiBadan}</Text>
              <Text>Tinggi Badan</Text>
            </View>
          </View>
        </View>
        <ListMenu menus={menus} navigation={this.props.navigation} kategori="profile"/>
      </SafeAreaView>
    )
  }
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 40,
    alignSelf: 'center',

  },
  profile: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between'
  },
  tbContainer: {
    marginTop: 10,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nama: {
    fontSize: 24,
    alignSelf: 'center'
  },
  deskripsi: {
    fontSize: 18,
  },
  boldTextBlack: {
    color: 'black',
    fontSize: 20,
  },
  titleDD: {
    color: 'grey',
    fontSize: 14
  },
  valueDD: {
    fontSize: 14
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'bold',
    marginVertical: 20
  }
})