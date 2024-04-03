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
  const [ingredients, setIngredients] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [procedureError, setProcedureError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');

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
          setIngredients(JSON.parse(recipeData.ingredients));
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
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');

    if (!preview.trim()) {
      setPreviewError('Preview is required');
      return;
    }
    setPreviewError('');

    if (!procedure.trim()) {
      setProcedureError('Procedure is required');
      return;
    }
    setProcedureError('');

    if (ingredients.some((ingredient) => !ingredient.trim())) {
      setIngredientsError('All ingredients must be filled');
      return;
    }
    setIngredientsError('');

    // Continue with update logic
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE recipes SET title = ?, preview = ?, procedure = ?, ingredients = ?, image = ? WHERE id = ?',
        [title, preview, procedure, JSON.stringify(ingredients), selectedImage, recipeId],
        () => {
          console.log('Recipe updated successfully');
          navigation.goBack();
          navigation.goBack();
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });
  };

  const deleteRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM recipes WHERE id = ?',
        [recipeId],
        () => {
          console.log('Recipe deleted successfully');
          navigation.goBack();
          navigation.goBack();
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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
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
          <TouchableOpacity style={styles.deleteButton} onPress={deleteRecipe}>
            <MaterialIcons name="delete" size={24} color="white" />
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
        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
            {titleError ? <Text style={styles.error}>{titleError}</Text> : null}
            <Text style={styles.sectionTitle}>Preview</Text>
            <TextInput style={styles.input} value={preview} onChangeText={setPreview} placeholder="Preview" />
            {previewError ? <Text style={styles.error}>{previewError}</Text> : null}
            <Text style={styles.sectionTitle}>Procedure</Text>
            <TextInput
              style={[styles.input, { height: 'auto', minHeight: 50 }]}
              value={procedure}
              onChangeText={setProcedure}
              placeholder="Procedure"
              multiline
              numberOfLines={undefined}
            />
            {procedureError ? <Text style={styles.error}>{procedureError}</Text> : null}
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <TextInput
                  style={styles.ingredientInput}
                  value={ingredient}
                  onChangeText={(text) => handleIngredientChange(index, text)}
                  placeholder="Ingredient"
                />
                <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            {ingredientsError ? <Text style={styles.error}>{ingredientsError}</Text> : null}
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
              <Text style={styles.addButtonText}>Add Ingredient</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.updateButtonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={updateRecipe}>
            <Text style={styles.updateButtonText}>Update Recipe</Text>
          </TouchableOpacity>
        </View>
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
  deleteButton: {
    position: 'absolute',
    top: 30,
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
    paddingHorizontal: 25,
    paddingVertical: 30,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#08A045',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
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
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#08A045',
    borderRadius: 5,
    padding: 5,
  },
  addButton: {
    backgroundColor: '#08A045',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#08A045',
    borderRadius: 25,
    width: 335,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default EditRecipeScreen;
