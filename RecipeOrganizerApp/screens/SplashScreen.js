import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [resetTimeout, setResetTimeout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);

    // Cleanup function to clear the timeout if the component unmounts or the effect is re-triggered
    return () => {
      clearTimeout(timeout);
    };
  }, [navigation, resetTimeout]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setResetTimeout(prevState => !prevState);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={175} color="#08A045" style={styles.activityIndicator} />
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/cooking.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100, // Set the width of the image as needed
    height: 100, // Set the height of the image as needed
  },
});

export default SplashScreen;
