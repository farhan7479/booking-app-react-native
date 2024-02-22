import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TicketConfirmation = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="checkmark-circle" size={100} color="green" />
            <Text style={styles.heading}>Ticket Booked!</Text>
            <Text style={styles.message}>Your ticket has been successfully booked.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default TicketConfirmation;
