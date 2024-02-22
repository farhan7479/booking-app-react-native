import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from './../redux/userSlice';

const BookingScreen = ({ route, navigation }) => {
    const { movie } = route.params;
    const user = useSelector(selectUser);

    const [seatPosition, setSeatPosition] = useState('Middle');
    const [selectedClass, setSelectedClass] = useState('Executive');
    const [price, setPrice] = useState(399);
    const [isSeatModalVisible, setSeatModalVisible] = useState(false);
    const [isClassModalVisible, setClassModalVisible] = useState(false);

    const seatOptions = ['Middle', 'Left Corner', 'Right Corner', 'Right-End Corner', 'Left-End Corner'];

    const handleSeatPress = (seat) => {
        setSeatPosition(seat);
        setSeatModalVisible(false);
    };

    const handleClassPress = (selectedClass) => {
        setSelectedClass(selectedClass);
        calculatePrice();
        setClassModalVisible(false);
    };

    const handleBooking = () => {
        navigation.navigate('Ticket Confirmation');
    };

    const calculatePrice = () => {
        let newPrice = 0;
        switch (selectedClass) {
            case 'Classic':
                newPrice = 449;
                break;
            case 'Royal':
                newPrice = 479;
                break;
            case 'Executive':
                newPrice = 399;
                break;
            default:
                newPrice = 399;
                break;
        }
        setPrice(newPrice);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Grab your seat at the lowest cost</Text>
                    <View style={styles.movieContainer}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.movieImage} />
                        <View style={styles.movieInfo}>
                            <Text style={styles.movieTitle}>{movie.title}</Text>
                            <Text style={styles.movieVotes}>Votes: {movie.vote_count}</Text>
                            <Text style={styles.movieLikes}>Likes: {movie.vote_average}</Text>
                        </View>
                    </View>
                    <Text style={styles.formTitle}>Booking Form</Text>
                    <View>
                        <TouchableOpacity onPress={() => setSeatModalVisible(true)} style={styles.inputButton}>
                            <Text>{seatPosition}</Text>
                        </TouchableOpacity>
                        <Modal visible={isSeatModalVisible} animationType="slide">
                        <Text style={styles.title}>Select Seat Position</Text>
                            <View style={styles.modalContainer}>
                                {seatOptions.map(option => (
                                    <TouchableOpacity key={option} onPress={() => handleSeatPress(option)} style={styles.modalOptionButton}>
                                        <Text>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Modal>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setClassModalVisible(true)} style={styles.inputButton}>
                            <Text>{selectedClass}</Text>
                        </TouchableOpacity>
                        <Modal visible={isClassModalVisible} animationType="slide">
                        <Text style={styles.title}>Select Class</Text>
                            <View style={styles.modalContainer}>
                                <TouchableOpacity onPress={() => handleClassPress('Classic')} style={styles.modalOptionButton}>
                                    <Text>Classic</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClassPress('Royal')} style={styles.modalOptionButton}>
                                    <Text>Royal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClassPress('Executive')} style={styles.modalOptionButton}>
                                    <Text>Executive</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <Text style={styles.price}>Price: ₹{price}</Text>
                    <Button title="Book Now" onPress={handleBooking} color="#007bff" />
                </>
            ) : (
                <>
                    <Text style={styles.price}>Please login to book this movie.</Text>
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title1: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100,
        color : 'blue'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
        
        marginBottom: 25
    },
    movieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 0.5
    },
    movieImage: {
        width: 100,
        height: 150,
        marginRight: 20,
    },
    movieInfo: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    movieVotes: {
        fontSize: 16,
        marginBottom: 5,
    },
    movieLikes: {
        fontSize: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputButton: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOptionButton: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
});

export default BookingScreen;
