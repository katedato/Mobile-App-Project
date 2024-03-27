import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import * as ImagePicker from 'expo-image-picker';

const EditRecipeScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [procedure, setProcedure] = useState('');
  const [ingredients, setIngredients] = useState(['']); // Initial ingredients state with one empty string for the input area

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
  
    setImage(pickerResult.assets[0].uri);

    console.log('Image URI:', pickerResult.uri); // Log the image URI
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
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // Add functionality to delete the recipe
            // For example, you can show an alert or confirmation modal
            Alert.alert('Delete', 'Are you sure you want to delete this recipe?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => {
                  // Implement the delete logic here
                },
                style: 'destructive',
              },
            ]);
          }}
        >
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Edit Recipe</Text>
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
                <Text style={styles.addPhotoText}>Change Photo</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.inputColumn}>
              <Text style={styles.inputTitle}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={handleTitleChange}
              />
              <Text style={styles.inputTitle}>Preview</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter preview"
                value={preview}
                onChangeText={handlePreviewChange}
              />
              <Text style={styles.inputTitle}>Procedure</Text>
              <TextInput
                style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
                multiline
                placeholder="Enter procedure"
                value={procedure}
                onChangeText={handleProcedureChange}
              />

            </View>
            <View style={styles.inputColumn}>
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
              <TouchableOpacity style={styles.addIngredientButton} onPress={handleAddIngredient}>
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.swipeButtonContainer}>
            <TouchableOpacity style={styles.swipeButton}>
              <Text style={styles.swipeButtonText}>Update</Text>
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
  deleteButton: {
    position: 'absolute',
    top: 50,
    left: 30,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default EditRecipeScreen;
