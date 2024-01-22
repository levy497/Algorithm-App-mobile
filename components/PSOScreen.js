import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PSOScreen = ({ token }) => {
  const [functionChoice, setFunctionChoice] = useState('rosenbrock'); // Domyślna wartość
  const [numParticles, setNumParticles] = useState('');
  const [maxiter, setMaxiter] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleSubmit = async () => {
    if (!functionChoice || !numParticles || !maxiter) {
      Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
      return;
    }

    try {
      const response = await fetch('https://levy497e.cfolks.pl/api/run_pso', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: functionChoice,
          num_particles: parseInt(numParticles, 10),
          maxiter: parseInt(maxiter, 10),
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setImageBase64(data.image);
      } else {
        Alert.alert('Błąd', data.error || 'Nie udało się wygenerować wykresu.');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się połączyć z serwerem.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>PSO Konfiguracja</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={functionChoice}
              onValueChange={setFunctionChoice}
              style={styles.picker}
              mode="dialog"
            >
              <Picker.Item label="Rosenbrock" value="rosenbrock" />
              <Picker.Item label="Drop Wave" value="drop_wave" />
              {/* Dodaj inne opcje tutaj */}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Liczba cząstek"
            value={numParticles}
            onChangeText={setNumParticles}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Maxiter"
            value={maxiter}
            onChangeText={setMaxiter}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Uruchom PSO</Text>
          </TouchableOpacity>
          {imageBase64 ? (
            <Image
              source={{ uri: `data:image/png;base64,${imageBase64}` }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain', // Aby obraz był skalowany i w pełni widoczny
    marginTop: 20,
  },
});

export default PSOScreen;
