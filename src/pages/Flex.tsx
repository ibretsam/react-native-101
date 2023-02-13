import React from 'react'
import { StyleSheet, View } from 'react-native'

const Flex = () => {
  return (
    <View>
        <View style = {styles.view1}></View>
        <View style = {styles.view2}></View>
        <View style = {styles.view3}></View>
        <View style = {styles.view4}></View>
    </View>
  )
}

export default Flex

const styles = StyleSheet.create({
    view1: {
        height: 30,
        width: 30,
        backgroundColor: 'red'
    },

    view2: {
        height: 30,
        width: 30,
        backgroundColor: 'green'
    },

    view3: {
        height: 30,
        width: 30,
        backgroundColor: 'blue'
    },

    view4: {
        height: 30,
        width: 30,
        backgroundColor: 'yellow'
    }
})