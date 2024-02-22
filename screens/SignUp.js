import React, { useState, useRef } from 'react';
import { View, TextInput,Image,Text, Button, KeyboardAvoidingView, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import bannerImage from '../assets/signup.jpg';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('movie-screen');
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
      <View style={styles.bannerContainer}>
        <Image source={bannerImage} style={styles.bannerImage} />
      </View>
      <Text style={styles.title}>Sign Up</Text>
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
        <Button title="Sign Up" onPress={handleSignUp} disabled={isLoading} />
        {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '80%',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    
    color: 'black', 
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

export default SignUp;