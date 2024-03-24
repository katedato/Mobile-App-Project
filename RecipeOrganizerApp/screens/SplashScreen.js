import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      <Text>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
