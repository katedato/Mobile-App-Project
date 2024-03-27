import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
import { useNavigation } from '@react-navigation/native';

const BreakfastScreen = () => {
  const navigation = useNavigation();

  // Sample data for images
  const images = [
    { id: 1, title: '"Recipe Title 1"', uri: 'https://via.placeholder.com/150', },
    { id: 2, title: '"Recipe Title 2"', uri: 'https://via.placeholder.com/150', },
    { id: 3, title: '"Recipe Title 3"', uri: 'https://via.placeholder.com/150', },
    { id: 4, title: '"Recipe Title 4"', uri: 'https://via.placeholder.com/150', },
    { id: 5, title: '"Recipe Title 5"', uri: 'https://via.placeholder.com/150', },
    { id: 6, title: '"Recipe Title 6"', uri: 'https://via.placeholder.com/150', },
    { id: 7, title: '"Recipe Title 7"', uri: 'https://via.placeholder.com/150', },
    { id: 8, title: '"Recipe Title 8"', uri: 'https://via.placeholder.com/150', },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../assets/images/Breakfast.jpg')}
          style={styles.backgroundImage}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Breakfast</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
          {images.map((image) => (
            <TouchableOpacity key={image.id} style={styles.imageItem} onPress={() => navigation.navigate('Recipe')}>
              <View style={styles.imageWrapper}>
                <ImageBackground source={{ uri: image.uri }} style={styles.image}>
                  <View style={styles.overlayImage}>
                    <Text style={styles.overlayImageText}>{image.title}</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ))}

          </View>
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
    position: 'relative', // Ensure the button is positioned relative to the image
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
    marginTop: -20, // Adjust this value to control the overlap
    paddingTop: 20, // Add padding to compensate for the negative margin
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
    width: '48%', // Two columns layout
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
});

export default BreakfastScreen;

