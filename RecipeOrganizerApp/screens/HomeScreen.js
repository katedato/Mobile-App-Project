import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();

  const goToInitialRoute = () => {
    navigation.navigate('Splash');
  };

  const whiteBackgroundHeight = window.height * 0.7; // 70% of the screen height

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
    bottom: 50,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10, // Adjust the vertical padding as needed
    paddingHorizontal: 35, // Adjust the horizontal padding as needed
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
    bottom: 35,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
