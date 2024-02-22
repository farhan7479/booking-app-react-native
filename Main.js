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
import TicketConfirmation from './screens/TicketConfirmation';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';

const Stack = createNativeStackNavigator();

const Main = () => {
    const user = useSelector(selectUser);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                ) : null}
                <Stack.Screen name="movie-screen" component={MovieApp} options={{ headerShown: false }} />
                <Stack.Screen name="Logout" component={Logout} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="BookingScreen" component={BookingScreen} />
                <Stack.Screen name="Ticket Confirmation" component={TicketConfirmation} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Main;
