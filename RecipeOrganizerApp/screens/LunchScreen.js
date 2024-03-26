import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LunchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Lunch Screen</Text>
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

export default LunchScreen;