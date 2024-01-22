import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, KeyboardAvoidingView, Linking } from 'react-native';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://levy497e.cfolks.pl/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        onLoginSuccess(data.token);
      } else {
        Alert.alert('Błąd logowania', data.error);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się połączyć z serwerem.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.form}>
        <Text style={styles.title}>Zaloguj się</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Zaloguj</Text>
        </TouchableOpacity>
        <Text style={styles.registerText} onPress={() => Linking.openURL('https://levy497e.cfolks.pl/register')}>
          Nie masz konta? Zarejestruj się!
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0288d1', // Elegancki niebieski gradient
  },
  form: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4caf50', // Kolor zielony
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    color: '#4fc3f7', // Jasny odcień niebieskiego
    marginTop: 15,
    textDecorationLine: 'underline', // Podkreślenie tekstu
  },
});

export default LoginScreen;
