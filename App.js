import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    try {
      if (input === '') {
        setResult('Entrada vacía');
        return;
      }
  
      const sanitizedInput = input
        .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
        // .replace(/ln\(([^()]+)\)/g, 'Math.log($1)')
        .replace(/log\(([^()]+)\)/g, 'Math.log10($1)')
        .replace(/sin\(([^()]+)\)/g, 'Math.sin($1 * (Math.PI / 180))')
        .replace(/cos\(([^()]+)\)/g, 'Math.cos($1 * (Math.PI / 180))')
        .replace(/tan\(([^()]+)\)/g, 'Math.tan($1 * (Math.PI / 180))')
        .replace(/\^/g, '**');
  
      console.log(sanitizedInput);
      
      const value = Function(`'use strict'; return (${sanitizedInput})`)();
        
      if (value === Infinity) {
        setResult('División por cero');
      } else if (isNaN(value)) {
        setResult('Error: Operación no válida');
      } else {
        setResult(value.toString());
        setInput('');
      }
    } catch (error) {
      console.log(error);
      setResult('Error en el cálculo');
    }
  };
  

  const handleInput = (text) => {
    
     if (text === '' || /^[0-9+\-*/().√lnsincoslog]*$/.test(text)) {
      setInput(text);
    }
  };

  const appendInput = (value) => {
    if(input.length>=15){
      return;
    }
    if (value === '.') {
      const lastNumber = input.split(/[-+*/()√^]/).pop();
      if (lastNumber.includes('.')) return;
    }
    setInput(input + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const deleteLastInput = () => {
    setInput(input.slice(0, -1));
  };

  const appendPower = () => {
    setInput(input + '^');
  };

  const buttons = [
    { label: 'A/C', action: clearInput },
    { label: 'DEL', action: deleteLastInput },
    { label: '/', action: () => appendInput('/') },
    { label: '*', action: () => appendInput('*') },
    { label: '7', action: () => appendInput('7') },
    { label: '8', action: () => appendInput('8') },
    { label: '9', action: () => appendInput('9') },
    { label: '-', action: () => appendInput('-') },
    { label: '4', action: () => appendInput('4') },
    { label: '5', action: () => appendInput('5') },
    { label: '6', action: () => appendInput('6') },
    { label: '+', action: () => appendInput('+') },
    { label: '(', action: () => appendInput('(') },
    { label: '1', action: () => appendInput('1') },
    { label: '2', action: () => appendInput('2') },
    { label: '3', action: () => appendInput('3') },
    { label: ')', action: () => appendInput(')') },
    { label: '0', action: () => appendInput('0') },
    { label: '.', action: () => appendInput('.') },
    { label: '√', action: () => appendInput('√(') },
    // { label: 'ln', action: () => appendInput('ln(') },
    { label: 'log', action: () => appendInput('log(') },
    { label: 'sin', action: () => appendInput('sin(') },
    { label: 'cos', action: () => appendInput('cos(') },
    { label: 'tan', action: () => appendInput('tan(') },
    { label: 'xⁿ', action: appendPower },
    { label: '=', action: calculateResult },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor="#aaa"
        value={input}
        onChangeText={handleInput}
        keyboardType="default"
      />
      <View style={styles.resultContainer}>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={button.action}>
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  resultContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  result: {
    color: '#fff',
    fontSize: 32,
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    flexBasis: '22%',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default App;
