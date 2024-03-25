import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToInitialRoute = () => {
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/MainBackground.jpg')}
        style={styles.imageBackground}
      >
      </ImageBackground>
      <View style={styles.buttonContainer}>
      <Text style={styles.text}>Home Screen</Text>
        <Button title="Go to Initial Route" onPress={goToInitialRoute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
