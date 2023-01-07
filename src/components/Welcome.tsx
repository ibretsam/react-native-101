import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const Welcome = (props: any) => {
  return (
    <SafeAreaView>
        <Text>Welcome {props.name}</Text>
    </SafeAreaView>
  )
}

export default Welcome