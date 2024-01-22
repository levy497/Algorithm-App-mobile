import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './components/LoginScreen';
import PSOScreen from './components/PSOScreen';
const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [token, setToken] = useState('');

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    setIsLoggedin(true);
  };

  return (
    <View style={styles.container}>
      {!isLoggedin ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <PSOScreen token={token} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default App;
