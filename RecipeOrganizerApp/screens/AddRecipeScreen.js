import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { Picker as CustomPicker } from '@react-native-picker/picker'; // Rename Picker to CustomPicker

const db = SQLite.openDatabase('new_recipes.db');

// Check if the table exists, if not, create it
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, preview TEXT, procedure TEXT, ingredients TEXT, image TEXT, category TEXT);',
    [],
    (_, result) => {
      console.log('Table created successfully');
    },
    (_, error) => {
      console.error('Error creating table:', error);
    }
  );
});

const AddRecipeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [procedure, setProcedure] = useState('');
  const [ingredients, setIngredients] = useState(['']); // Initial ingredients state with one empty string for the input area
  const [titleError, setTitleError] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [procedureError, setProcedureError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [imageError, setImageError] = useState('');
  const [category, setCategory] = useState(''); // State to hold the selected category
  const [categoryError, setCategoryError] = useState(''); // State to hold the category error message

  useEffect(() => {
    // Create the 'recipes' table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, preview TEXT, procedure TEXT, ingredients TEXT, image TEXT, category TEXT);',
        [],
        (_, result) => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveRecipe = () => {
    setTitleError('');
    setPreviewError('');
    setProcedureError('');
    setIngredientsError('');
    setImageError('');
    setCategoryError(''); // Add this line to reset the category error
  
    if (!title) {
      setTitleError('Please input title');
    }
    if (!preview) {
      setPreviewError('Please input preview');
    }
    if (!procedure) {
      setProcedureError('Please input procedure');
    }
    if (ingredients.some((ingredient) => !ingredient)) {
      setIngredientsError('Please input ingredients');
    }
    if (!image) {
      setImageError('Please add a photo');
      return;
    }
    if (!category) {
      setCategoryError('Please choose a category'); // Set the category error message
      return;
    }
  
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO recipes (title, preview, procedure, ingredients, image, category) VALUES (?, ?, ?, ?, ?, ?)',
          [title, preview, procedure, JSON.stringify(ingredients), image, category],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              console.log(`Recipe with ID ${insertId} saved successfully`);
              Alert.alert('Recipe saved successfully');
              navigation.goBack();
            } else {
              Alert.alert('Failed to save recipe');
            }
          },
          (_, error) => {
            console.error('SQLite error:', error);
            Alert.alert('Failed to save recipe');
          }
        );
      },
      null,
      () => {
        setTitle('');
        setPreview('');
        setProcedure('');
        setIngredients(['']);
        setImage(null);
        setCategory('');
      }
    );
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
      setImage(pickerResult.assets[0].uri);
      console.log('Image URI:', pickerResult.assets[0].uri); // Log the image URI
    }
  };
  
  

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']); // Add a new empty string to the ingredients array
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text; // Update the ingredient at the specified index
    setIngredients(newIngredients);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handlePreviewChange = (text) => {
    setPreview(text);
  };

  const handleProcedureChange = (text) => {
    setProcedure(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../assets/images/AddrecipeBG.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Add Recipe</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleBack}>
            <Icon name="times" size={20} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.overlayButton} onPress={handleAddPhoto}>
  {image ? (
    <Image source={{ uri: image }} style={styles.addedImage} />
  ) : (
    <>
      <Icon name="plus" size={20} color="white" />
      <Text style={styles.addPhotoText}>Add Photo</Text>
    </>
  )}
</TouchableOpacity>

          {imageError ? <Text style={styles.errorMessage}>{imageError}</Text> : null}
          <View style={styles.inputContainer}>
            <View style={styles.inputColumn}>
              <Text style={styles.inputTitle}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={handleTitleChange}
              />
              {titleError ? <Text style={styles.errorMessage}>{titleError}</Text> : null}

              <Text style={styles.inputTitle}>Preview</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter preview"
                value={preview}
                onChangeText={handlePreviewChange}
              />
              {previewError ? <Text style={styles.errorMessage}>{previewError}</Text> : null}

              <Text style={styles.inputTitle}>Procedure</Text>
              <TextInput
                style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
                multiline
                placeholder="Enter procedure"
                value={procedure}
                onChangeText={handleProcedureChange}
              />
              {procedureError ? <Text style={styles.errorMessage}>{procedureError}</Text> : null}

            </View>

            <View style={styles.inputColumn}>
            <Text style={styles.inputTitle}>Category</Text>
              <CustomPicker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={[styles.input, styles.picker]}
              >
                <CustomPicker.Item label="Choose Category" value="" />
                <CustomPicker.Item label="Breakfast" value="Breakfast" />
                <CustomPicker.Item label="Lunch" value="Lunch" />
                <CustomPicker.Item label="Snacks" value="Snacks" />
                <CustomPicker.Item label="Dinner" value="Dinner" />
                <CustomPicker.Item label="Dessert" value="Dessert" />
              </CustomPicker>
              <View style={styles.errorContainer}>
                {categoryError ? <Text style={styles.errorMessage}>{categoryError}</Text> : null}
              </View>

              <Text style={styles.inputTitle}>Ingredients</Text>
              {ingredients.map((ingredient, index) => (
                <View style={styles.ingredientContainer} key={index}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter ingredient"
                    value={ingredient}
                    onChangeText={(text) => handleIngredientChange(text, index)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.removeIngredientButton,
                      ingredients.length <= 1 && styles.disabledButton,
                    ]}
                    onPress={() => handleRemoveIngredient(index)}
                    disabled={ingredients.length <= 1}
                  >
                    <Icon name="minus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              {ingredientsError ? <Text style={styles.errorMessage}>{ingredientsError}</Text> : null}
              <TouchableOpacity style={styles.addIngredientButton} onPress={handleAddIngredient}>
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.swipeButtonContainer}>
            <TouchableOpacity style={styles.swipeButton} onPress={handleSaveRecipe}>
              <Text style={styles.swipeButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    flex: 0.3, // 30% of the screen height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 45,
    right: 25,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.7, // 70% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20, // Adjust this value to control the overlap
    paddingTop: 20, // Add padding to compensate for the negative margin
  },
  scrollViewContent: {
    marginTop: 5, // Adjust
    marginLeft: 25, // Same margin from all sides
    marginRight: 25, // Same margin from all sides
  },
  overlayButton: {
    backgroundColor: '#08A045',
    borderRadius: 25,
    width: 340,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25, // Margin at the bottom
  },
  addPhotoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5, // Spacing between icon and text
  },
  addedImage: {
    width: 340,
    height: 150,
    borderRadius: 25,
    marginTop: 10, // Spacing between added image and text
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flex: 1,
    marginLeft: 10,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#08A045',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  addIngredientButton: {
    backgroundColor: '#08A045',
    borderRadius: 5,
    width: 159,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  scrollContent: {
    marginTop: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  removeIngredientButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  swipeButtonContainer: {
    alignItems: 'center',
  },
  swipeButton: {
    backgroundColor: '#08A045',
    borderRadius: 25,
    width: 335,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  swipeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#08A045',
    borderRadius: 5,
    marginTop: 5,
  }
});

export default AddRecipeScreen;
