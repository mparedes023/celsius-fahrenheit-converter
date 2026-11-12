import React from 'react';
import {StyleSheet, ImageBackground,Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import {setCelsiusInput, convertToFahrenheit } from './redux/temperatureSlice';
import {useFonts } from 'expo-font';
import {ActivityIndicator } from 'react-native';
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
      <ImageBackground
        source={require('./assets/fridge.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.card}>
          <Text style={styles.header}>Chef Kitty needs help!</Text>
          <Text style={styles.description}>Be her sous-chef and help her convert celsius to fahrenheit for her recipes.</Text>
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
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    Fredoka: require('./assets/fonts/angelica.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
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
  },
  backgroundImage:{
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  card: {
    width: '90%',
    backgroundColor: '#ff9cbb',
    borderRadius:10,
    padding: 20,
    elevation:10,

  },
  description:{
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
    letterSpacing:2,
    marginBottom:20,
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#0b0b0b',
    textAlign: 'left',
    fontFamily: 'Fredoka',
    letterSpacing:5,
    textTransform:'uppercase',
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
    backgroundColor: '#000000',
    
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,

  },
  buttonText: {

    color: '#e3a5bd',
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
    color: '#053100',

    textTransform: 'uppercase',
    letterSpacing: 1,

    marginBottom: 4,
  },
  resultValue: {


    fontSize: 32,
    fontWeight: 'bold',
    color: '#0e3d00',
  },
});

export default App;
