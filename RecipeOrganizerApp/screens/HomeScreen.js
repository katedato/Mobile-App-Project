import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToInitialRoute = () => {
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Initial Route" onPress={goToInitialRoute} />
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

export default HomeScreen;
