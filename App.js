import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { setCelsiusInput, convertToFahrenheit } from './redux/temperatureSlice';

const TemperatureConverterApp = () => {
  const dispatch = useDispatch();
  
  const celsiusInput = useSelector((state) => state.temperature.celsiusInput);
  const fahrenheitOutput = useSelector((state) => state.temperature.fahrenheitOutput);

  const errorMessage = useSelector((state) => state.temperature.errorMessage);

  const handleConvert = () => {

    dispatch(convertToFahrenheit());
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>°C to °F Converter</Text>
          
          <Text style={styles.label}>Enter Temperature in Celsius:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 23"
            placeholderTextColor="#858585"

            keyboardType="numeric"
            value={celsiusInput}


            onChangeText={(text) => dispatch(setCelsiusInput(text))}

          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleConvert}>

            <Text style={styles.buttonText}>Convert to Fahrenheit</Text>

          </TouchableOpacity>


          {fahrenheitOutput ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Result:</Text>

              <Text style={styles.resultValue}>{fahrenheitOutput}</Text>

            </View>
            
          ) : null}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <TemperatureConverterApp />
    </Provider>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#c8effb',

    padding: 24,


  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',

    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',

    padding: 12,

    fontSize: 16,
    color: '#334155',
    backgroundColor: '#f8fafc',
    marginBottom: 8,
  },
  errorText: {
    color: '#790d0d',
    fontSize: 13,
    marginBottom: 12,

    fontWeight: '500',
  },
  button: {
    backgroundColor: '#3b82f6',
    
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 24,
    paddingTop: 16,

    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#64748b',

    textTransform: 'uppercase',
    letterSpacing: 1,

    marginBottom: 4,
  },
  resultValue: {


    fontSize: 32,
    fontWeight: 'bold',
    color: '#00154e',
  },
});

export default App;
