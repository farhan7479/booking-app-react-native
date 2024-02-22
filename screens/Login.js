import React, { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, Button, KeyboardAvoidingView, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import bannerImage from '../assets/login.png';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('movie-screen');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const continueAsGuest = () => {
    // Navigate to the main app screen or perform any other action for guest users
    navigation.navigate('movie-screen');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>

      <View style={styles.formContainer}>
        <View style={styles.bannerContainer}>
          <Image source={bannerImage} style={styles.bannerImage} />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign In" onPress={handleLogin} disabled={isLoading} />
        <TouchableOpacity onPress={continueAsGuest}>
          <Text style={styles.continueAsGuestText}>Continue as Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSignUp} disabled={isLoading}>
          <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  continueAsGuestText: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom : 15,
    fontSize: 16,
    color: 'blue',
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  title1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'blue',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
  },
  loader: {
    marginTop: 20,
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'blue',
    fontStyle: 'italic',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, // Adjust as needed
    marginBottom: 100
  },
  bannerImage: {
    width: '80%',
    height: 150, // Adjust as needed
    resizeMode: 'contain', // Adjust as needed
  },
});

export default Login;
