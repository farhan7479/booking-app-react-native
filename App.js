import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MovieApp from './screens/MovieApp';


import Logout from './screens/Logout';
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import BookingScreen from './screens/BookingScreen';

const Stack = createNativeStackNavigator();

const App = () => {


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="movie-screen" component={MovieApp} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />

        <Stack.Screen name="SignUp" component={SignUp} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
