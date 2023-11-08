import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Button, Input, Pilihan } from '../../components'

export class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      status: '',
      category: ''
    }
  }
  ubahStatus = (status) => {
    this.setState({
      status: status,
    })

  }
  render() {
    const { title, content, status, category } = this.state
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Input label="Title" width={200} />
          <Input textarea={true} label="Content" />
          <Pilihan
            label="Status"
            selectedValue={status}
            onValueChange={(status) => this.ubahStatus(status)}
          />
          <Pilihan
            label="Category"
            selectedValue={category}
            onValueChange={(category) => this.setState({
              category: category,
            })}
          />
          <Button type="text" title="Save" padding={10}/>
        </View>
      </SafeAreaView>
    )
  }
}

export default Add

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20, // Mengurangi padding agar lebih kompak
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20
  }
})