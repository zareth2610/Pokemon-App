import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const PokemonDetailScreen = ({ route }) => {
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');

  useEffect(() => {
    loadPokemonDetails();
  }, []);

  const loadPokemonDetails = async () => {
    try {
      const response = await axios.get(route.params.pokemonUrl);
      const pokemonData = response.data;
      setPokemon(pokemonData);

      const primaryType = pokemonData.types[0]?.type.name;
      const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
      };

      if (typeColors[primaryType]) {
        setBackgroundColor(typeColors[primaryType]);
      }
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  };

  if (!pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <DetailItem label="ID" value={pokemon.id} />
        <DetailItem label="Height" value={`${pokemon.height / 10} m`} />
        <DetailItem label="Weight" value={`${pokemon.weight / 10} kg`} />
        <DetailItem label="Base Experience" value={pokemon.base_experience} />
        <Text style={styles.sectionHeader}>Abilities:</Text>
        {pokemon.abilities.map((ability, index) => (
          <DetailItem key={index} value={ability.ability.name} />
        ))}
      </View>
    </View>
  );
};

const DetailItem = ({ label, value }) => (
  <Text style={styles.detailText}>
    {label}: {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PokemonDetailScreen;
