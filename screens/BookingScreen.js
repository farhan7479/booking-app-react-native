import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const BookingScreen = ({ route }) => {
    const { movie } = route.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

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
                    <Button title="Book Now" color="#007bff" />
                </>
            ) : (
                <>
                    <Text>Please login to book this movie.</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    movieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 24
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
});

export default BookingScreen;
