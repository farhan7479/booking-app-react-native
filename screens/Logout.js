import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

import { useSelector ,useDispatch} from 'react-redux';
import { logoutUser ,selectUser} from './../redux/userSlice';

const Logout = ({ navigation }) => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
    
    const handleLogout = async () => {
      try {
        dispatch(logoutUser());
        await auth.signOut();
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
      <Text style={styles.emailText}>Email: {user || 'Guest'}</Text>
      {user ? (
        <Button title="Logout" onPress={handleLogout} color="#007AFF" />
      ) : (
        <Button title="Login" onPress={() => navigation.navigate('Login')} color="#007AFF" />
      )}
    </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emailText: {
        fontSize: 18,
        
        marginBottom: 20,
    },
    });
    
    export default Logout;