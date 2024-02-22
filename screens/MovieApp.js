import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

const MovieApp = ({ navigation }) => {

    const API_KEY = "ace4c3be384ded77b1f899f1bb617a0a"
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const searchMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
            );
            setMovies(response.data.results);
            setIsSearchActive(false);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
   

    const renderMovieItem = ({ item }) => {
        const handlePress = () => {
        
            navigation.navigate('BookingScreen', { movie: item });
        };
        return (
            <TouchableOpacity style={styles.movieItem} onPress={handlePress}> 
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.movieImage}
                />
                <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieRating}>{item.vote_average}</Text>
                    <Text style={styles.movieVotes}>{item.vote_count} votes</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const NavButton = ({ onPress, iconName, size, color }) => (
        <TouchableOpacity onPress={onPress} style={styles.navButton}>
            <Icon name={iconName} size={size} color={color} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {!isSearchActive && (
                    <>
                        <Text style={styles.header}>Trending</Text>
                        <TouchableOpacity onPress={() => setIsSearchActive(true)}>
                            <Icon name="search" size={30} color="#000" />
                        </TouchableOpacity>
                    </>
                )}
                {isSearchActive && (
                    <SearchBar
                        placeholder="Search"
                        onChangeText={setSearch}
                        value={search}
                        onSubmitEditing={searchMovies}
                        lightTheme
                        round
                        showLoading={loading}
                        inputStyle={{
                            ...styles.searchInput,
                            width: '100%',
                            height: 50,
                            fontSize: 18,
                        }}
                        containerStyle={{
                            ...styles.searchContainer,
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            backgroundColor: 'transparent',
                        }}
                        inputContainerStyle={{
                            ...styles.inputContainer,
                            activeOpacity: 1,
                        }}
                    />



                )}
            </View>



            <View style={styles.bannerContainer}>
                <Text style={styles.bannerText}>
                    Stay Tuned for Upcoming Movies
                </Text>
            </View>

            <FlatList
                data={movies}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.movie}
            />

            <View style={styles.navContainer}>
                <NavButton onPress={() => navigation.navigate('Home')} iconName="home" size={25} />
                <NavButton onPress={() => navigation.navigate('MovieScreen')} iconName="film" size={25} color="blue" />
                <NavButton onPress={() => navigation.navigate('Calendar')} iconName="calendar" size={25} />
                <NavButton onPress={() => navigation.navigate('Logout')} iconName="user" size={25} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
   
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        paddingHorizontal: 10,
        marginTop: 35,
        marginLeft: 10
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        
        backgroundColor: 'white'

    },
    movieItem: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    movie: {
        marginTop: 20
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    movieInfo: {
        marginLeft: 10,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    movieRating: {
        fontSize: 16,
        color: "blue",
    },
    movieVotes: {
        fontSize: 14,
        color: "#95a5a6",
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,

        borderColor: '#999',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        alignItems: 'center',
        height: 50,
    },
    filterButton: {
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#666',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
    },
    filterText: {
        color: 'blue',
        fontSize: 24
    },
    bannerContainer: {
        marginHorizontal: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        marginTop: 15
    },
    bannerText: {
        color: 'white',
        textAlign: 'center',
    },
    navContainer: {
        borderTopWidth: 1.5,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        paddingVertical: 10,
        borderColor: '#666',
    },
});

export default MovieApp;
