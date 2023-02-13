import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';

const TinhToan = () => {
  // Initialize state variables for the numbers and the result
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  // Function to generate random numbers
  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);
    setResult(Math.floor(Math.random() * 100) + 1);
  };

  // Function to check if the user's answer is correct
  const checkAnswer = (userAnswer: boolean) => {
    if (userAnswer === (num1 + num2 === result)) {
      Alert.alert('Đúng!');
    } else {
      Alert.alert('Sai!');
    }
    // Generate new numbers for the next problem
    generateNumbers();
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
        {num1} + {num2} = {result}
      </Text>
      <View style={{justifyContent: 'center'}}>
        <Pressable
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            width: 100,
            height: 50,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => checkAnswer(true)}>
          <Text style={{fontSize: 20, color: 'white'}}>Đúng</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'grey',
            borderRadius: 5,
            width: 100,
            height: 50,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => checkAnswer(false)}>
          <Text style={{fontSize: 20, color: 'white'}}>Sai</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TinhToan;
