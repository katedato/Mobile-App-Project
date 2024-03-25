import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, useWindowDimensions, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();

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

  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/MainBackground.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Recipe Organizer</Text>
        </View>
      </ImageBackground>
      <View style={[styles.whiteBackground, { height: whiteBackgroundHeight }]}>
        <View style={styles.overlayLabel}>
          <Text style={styles.overlayLabelText}>Categories</Text>
        </View>
        
      <ScrollView horizontal={true} style={styles.scrollContainer}>
        {Object.keys(images).map((key, index) => (
          <View key={index} style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={images[key]}
              style={styles.image}
            />
            <View style={styles.overlayImage}>
              <Text style={styles.overlayImageText}>{key}</Text>
            </View>
          </View>
        </View>
        
        
        ))}
      </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="Go to Initial Route" onPress={goToInitialRoute} />
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
    right: 20,
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
  scrollContainer: {
    flex: 1,
    marginTop: 80,
    marginLeft: 20,
    marginRight:20,
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
});

export default HomeScreen;
