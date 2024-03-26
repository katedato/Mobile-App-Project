import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import * as ImagePicker from 'expo-image-picker';

const AddRecipeScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const [image, setImage] = useState(null);

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
          <Text style={styles.scrollContent}>Scrollable content here...</Text>
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
    margin: 25, // Same margin from all sides
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
  scrollContent: {
    marginTop: 10,
  },
  addedImage: {
    width: 340,
    height: 150,
    borderRadius: 25,
    marginTop: 10, // Spacing between added image and text
  },
});

export default AddRecipeScreen;
