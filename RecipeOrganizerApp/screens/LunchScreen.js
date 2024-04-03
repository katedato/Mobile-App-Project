import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('new_recipes.db');

const LunchScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM recipes WHERE category = ?',
          ['Lunch'],
          (_, { rows }) => {
            const recipesData = rows._array;
            setRecipes(recipesData);
            console.log('Recipes fetched successfully:', recipesData);
          },
          (_, error) => {
            console.error('SQLite error:', error);
          }
        );
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../assets/images/Lunch.jpg')}
          style={styles.backgroundImage}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Lunch</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {recipes.length === 0 ? (
            <Text style={styles.noRecipeText}>No Recipe Yet</Text>
          ) : (
            <View style={styles.imageContainer}>
              {recipes.map((recipe) => (
                <TouchableOpacity key={recipe.id} style={styles.imageItem} onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}>
                <View style={styles.imageWrapper}>
                    <ImageBackground source={{ uri: recipe.image }} style={styles.image}>
                      <View style={styles.overlayImage}>
                        <Text style={styles.overlayImageText}>{recipe.title}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.3,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 45,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    overflow: 'hidden',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 0.7,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 25,
    marginTop: -20,
    paddingTop: 20,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 9,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageItem: {
    width: '100%',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 175,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  overlayImageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noRecipeText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 200,
    paddingHorizontal: 114,
  },
});

export default LunchScreen;
