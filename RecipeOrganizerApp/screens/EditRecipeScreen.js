import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { MaterialIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('new_recipes.db');

const EditRecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [procedure, setProcedure] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM recipes WHERE id = ?',
        [recipeId],
        (_, { rows }) => {
          const recipeData = rows.item(0);
          setTitle(recipeData.title);
          setPreview(recipeData.preview);
          setProcedure(recipeData.procedure);
          setIngredients(recipeData.ingredients);
          setImage(recipeData.image);
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });
  }, [recipeId]);

  const updateRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE recipes SET title = ?, preview = ?, procedure = ?, ingredients = ?, image = ? WHERE id = ?',
        [title, preview, procedure, ingredients, image, recipeId],
        () => {
          console.log('Recipe updated successfully');
          navigation.goBack();
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../assets/images/AddrecipeBG.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Edit Recipe</Text>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="cancel" size={24} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <ScrollView style={styles.container}>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
        <TextInput style={styles.input} value={preview} onChangeText={setPreview} placeholder="Preview" />
        <TextInput style={styles.input} value={procedure} onChangeText={setProcedure} placeholder="Procedure" />
        <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients} placeholder="Ingredients" />
        <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="Image URL" />
        <Button title="Update Recipe" onPress={updateRecipe} />
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 0.43,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: '45%',
    bottom: 43,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 40,
    right: 23,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 35,
  },
  container: {
    flex: 0.57,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
});

export default EditRecipeScreen;
