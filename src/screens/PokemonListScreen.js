import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator, Button } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, EvilIcons  } from '@expo/vector-icons';
import axios from 'axios';

const PokemonListScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, [currentPage]);

  const loadPokemons = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(currentPage - 1) * 10}`);
      setPokemons(prevPokemons => [...prevPokemons, ...response.data.results]);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
    setLoading(false);
  };

  const handleEndReached = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigateToPokemonDetail(item)}>
        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/').slice(-2, -1)}.png` }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const navigateToPokemonDetail = (pokemon) => {
    navigation.navigate('PokemonDetail', { pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${pokemon.url.split('/').slice(-2, -1)}/` });
  };

  const filteredPokemons = pokemons.filter(pokemon => pokemon.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.enunciado}>

      </Text>
      <View style={styles.searchContainer}>
  <EvilIcons name="search" size={50} color="white" />
  <TextInput
    style={styles.searchInput}
    placeholder="Encuentra tu Pokemon fav :D"
    value={searchTerm}
    onChangeText={text => setSearchTerm(text)}
  />
</View>
      <FlatList
        data={filteredPokemons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#00ffff" />}
        numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
        }}
      />
      <View style={styles.pagination}>
        {currentPage < totalPages && (
          <TouchableOpacity style={styles.buttonContainer} onPress={() => setCurrentPage(currentPage + 1)}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Text style={[styles.buttonText, { fontSize: 10 }]}>Notificaciones</Text>
          </TouchableOpacity>
        )}
        {currentPage < totalPages && (
          <TouchableOpacity style={styles.buttonContainer} onPress={() => setCurrentPage(currentPage + 1)}>
            <MaterialCommunityIcons name="pokeball" size={40} color="white" />
            <Text style={[styles.buttonText, { fontSize: 10 }]}>Inicio</Text>
          </TouchableOpacity>
        )}
        {currentPage < totalPages && (
          <TouchableOpacity style={styles.buttonContainer} onPress={() => setCurrentPage(currentPage + 1)}>
            <FontAwesome5 name="user" size={24} color="white" />
            <Text style={[styles.buttonText, { fontSize: 10 }]}>Usuario</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 160,
    width: 140,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 20,
    borderRadius: 20,
  },
  cardContent: {
    flex: 1,
    marginTop: 0,
  },
  name: {
    fontSize: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:0,
    backgroundColor: '#000000',

  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'space-around'
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },

});

export default PokemonListScreen;