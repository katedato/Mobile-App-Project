import React, { useState, useEffect, createRef } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, useWindowDimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const flatListRef = createRef(); // Use createRef instead of useRef

  const goToInitialRoute = () => {
    navigation.navigate('Splash');
  };

  const whiteBackgroundHeight = window.height * 0.7; // 70% of the screen height

  const images = {
    Breakfast: require('../assets/images/Breakfast.jpg'),
    Lunch: require('../assets/images/Lunch.jpg'),
    Snack: require('../assets/images/Snack.jpg'),
    Dinner: require('../assets/images/Dinner.jpg'),
    Desserts: require('../assets/images/Desserts.jpg'),
  };
  
  const screenMapping = {
    Breakfast: 'BreakfastScreen',
    Lunch: 'LunchScreen',
    Snack: 'SnacksScreen',
    Dinner: 'DinnerScreen',
    Desserts: 'DessertsScreen',
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: require('../assets/images/Slide1.jpg') },
    { id: 2, image: require('../assets/images/Slide2.jpg') },
    { id: 3, image: require('../assets/images/Slide3.jpg') },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next slide index
      const nextSlide = (currentSlide + 1) % slides.length;
      // Scroll to the next slide
      flatListRef.current?.scrollToIndex({ index: nextSlide, animated: true });
      // Update the current slide state
      setCurrentSlide(nextSlide);
    }, 2200); // Change slide every 3 seconds
  
    return () => clearInterval(interval);
  }, [currentSlide]); // Trigger the effect whenever the currentSlide changes

  // Calculate carousel item width dynamically
  const carouselItemWidth = window.width - 50;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/MainBackground.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Recipe Organizer</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRecipe')}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={[styles.whiteBackground, { height: whiteBackgroundHeight }]}>
        <View style={styles.overlayLabel}>
          <Text style={styles.overlayLabelText}>Categories</Text>
        </View>
        <ScrollView horizontal={true} style={styles.scrollContainer}>
  {Object.keys(images).map((key, index) => (
    <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate(screenMapping[key])}
    style={styles.imageContainer}
  >
    <View style={styles.imageWrapper}>
      <Image
        source={images[key]}
        style={styles.image}
      />
      <View style={styles.overlayImage}>
        <Text style={styles.overlayImageText}>{key}</Text>
      </View>
    </View>
  </TouchableOpacity>
  ))}
</ScrollView>

        <View style={styles.ideasContainer}>
          <View style={styles.overlayLabelideas}>
            <Text style={styles.overlayLabelTextideas}>Ideas</Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={slides}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={[styles.carouselItem, { width: carouselItemWidth }]}>
                <Image source={item.image} style={styles.carouselImage} />
              </View>
            )}
            onScrollToIndexFailed={() => {}}
            initialScrollIndex={currentSlide}
          />
        </View>

        <View style={styles.aboutContainer}>
          <View style={styles.overlayLabelabout}>
            <Text style={styles.overlayLabelTextabout}>About</Text>
          </View>

          <View style={styles.aboutsection}>
          <Text style={styles.aboutsectiontext}>The Simple Recipe Organizer app lets you easily save your favorite recipes. It's a convenient tool for managing and organizing recipes.</Text>
          </View>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 0.30,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
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
  whiteBackground: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabel: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: '#08A045',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  overlayLabelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ideasContainer: {
    position: 'absolute',
    top: 200,
    left: 25, // Position the container on the left side
    right: 25,
  },
  overlayLabelideas: {
    backgroundColor: '#08A045',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: 243,
    marginBottom: 10, // Add margin bottom to separate it from the carousel
  },
  overlayLabelTextideas: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutContainer: {
    position: 'absolute',
    top: 465,
    left: 25, // Position the container on the left side
    right: 25,
  },
  overlayLabelabout: {
    backgroundColor: '#08A045',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 145,
    marginRight: 0,
    marginBottom: 10, // Add margin bottom to separate it from the carousel
  },
  overlayLabelTextabout: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutsection: {
    backgroundColor: '#08A045',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 0,
    marginBottom: 10, // Add margin bottom to separate it from the carousel
  },
  aboutsectiontext: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },


   carouselItem: {
    height: 200, // Adjust the height based on your design
  },

  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10, // Add border radius if needed
  },
  scrollContainer: {
    flex: 1,
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 10, // Add border radius to all corners
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
    paddingVertical: 3,
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 45,
    right: 25,
    backgroundColor: '#08A045',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
