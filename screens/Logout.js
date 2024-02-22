import React from 'react';
import { useState ,useEffect} from 'react';
import { View, Text, Button, StyleSheet ,TouchableOpacity} from 'react-native';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import bannerImage from '../assets/logout1.png';

const Logout = ({ navigation }) => {


    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          
          console.log(user);
        });
    
        return unsubscribe; 
      }, []);
    const handleLogout = async () => {
      try {
        await auth.signOut();
        
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
      <Text style={styles.emailText}>Email: {user?.email || 'Guest'}</Text>
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