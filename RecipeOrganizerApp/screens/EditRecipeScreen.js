import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('new_recipes.db');

const EditRecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [procedure, setProcedure] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
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
          setSelectedImage(recipeData.image); // Set the selected image URI for preview
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });

    // Set selected image state based on image state when component mounts
    setSelectedImage(image);
  }, [recipeId]);

  const updateRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE recipes SET title = ?, preview = ?, procedure = ?, ingredients = ?, image = ? WHERE id = ?',
        [title, preview, procedure, ingredients, selectedImage, recipeId], // Use selectedImage instead of image
        () => {
          console.log('Recipe updated successfully');
          navigation.goBack(); // Go back to the previous screen
          navigation.goBack(); // Go back to the 2nd previous screen
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });
  };
  

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    console.log('Picker Result:', pickerResult); // Log the picker result

    if (pickerResult.cancelled === true) {
      return;
    }

    if (pickerResult.assets.length > 0) {
      setSelectedImage(pickerResult.assets[0].uri); // Update selectedImage state with the new image URI
      console.log('Image URI:', pickerResult.assets[0].uri); // Log the image URI
    }
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
        <TouchableOpacity style={styles.imagePreviewContainer} onPress={handleAddPhoto}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="add-a-photo" size={24} color="white" />
              <Text style={styles.imageButtonText}>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe Details</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
          <TextInput style={styles.input} value={preview} onChangeText={setPreview} placeholder="Preview" />
          <TextInput style={styles.input} value={procedure} onChangeText={setProcedure} placeholder="Procedure" />
          <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients} placeholder="Ingredients" />
        </View>

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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
  imagePreviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePlaceholder: {
    backgroundColor: 'gray',
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageButtonText: {
    color: 'white',
    marginTop: 5,
  },
});

export default EditRecipeScreen;
