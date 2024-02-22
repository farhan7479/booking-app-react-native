import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import bannerImage from '../assets/splash.jpg';
const Home = ({ navigation }) => {
  const handleBooking = () => {
    navigation.navigate('movie-screen');
  };

  const handleCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
     <Text style={[styles.text, { color: 'black' ,marginTop: 25}]}>Welcome to Movie Booking App</Text>
      <Image
        source={bannerImage}
        style={styles.banner}
      />
      
      
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book a Movie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCalendar}>
        <Text style={styles.buttonText}>View Calendar</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  banner: {
    width: '80%',
    height: 250, 
    resizeMode: 'cover',
    marginBottom: 25
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
