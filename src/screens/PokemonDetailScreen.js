import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import ProgressBar from 'react-native-progress-bar-horizontal';

const PokemonDetailScreen = ({ route }) => {
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#000');

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
  const options = ['about', 'stats', 'moves', 'evolutions']
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: '#FFF' }]}>{pokemon.name}</Text>
        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }} style={styles.image} />
      </View>
      <View style={[styles.details, { color: '#FFF' }]}>
        <View style={styles.containerOptions}>
          {options.map(option => {
            return (
              <View>
                <Text style={[styles.nameOptions, { color: '#FFF' }]}>{option}</Text>
              </View>
            )
          })}
        </View>
        {/* <DetailItem label="ID" value={pokemon.id} /> */}
        <DetailItem label="Height" value={`${pokemon.height / 10} m`} progress={0.8} />
        <DetailItem label="Weight" value={`${pokemon.weight / 10} kg`} progress={0.4} />
        <DetailItem label="XP" value={pokemon.base_experience} progress={0.6} />
        <Text style={[styles.sectionHeader, { color: '#808080' }]}>Abilities:</Text>
        {pokemon.abilities.map((ability, index) => {
          console.log(ability);
          return (
            <DetailItem key={index} value={ability.ability.name} progress={0.9} />
          )
        })}
      </View>
      
    </View>
  );
};

const DetailItem = ({ label, value, progress }) => {
  return (
    <View style={styles.containerDetailText}>
      {label && <Text style={[styles.detailText, { color: '#808080' }]}>
        {label}
      </Text>}
      <Text style={[styles.detailText, { color: '#FFF' }]}>
        {value}
      </Text>
      <View style={styles.stick}>
        <ProgressBar
          progress={progress}
          borderWidth={1}
          fillColor="#7fff00"
          unfilledColor="#a9a9a9"
          height={7}
          width={150}
          borderColor="#a9a9a9"
          duration={100}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

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
    width: 240,
    height: 240,
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    backgroundColor: '#191919',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    flex: 2,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  containerDetailText: {
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  detailText: {
    fontSize: 18,
    flex: 1,
  },

  stick: {
    alignSelf: 'center',
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,

  },

  containerOptions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  nameOptions: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PokemonDetailScreen;
