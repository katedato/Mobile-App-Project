import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.greyBackground}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditRecipe')}>
            <Icon name="edit" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>(Fetch Title)</Text>
          </View>
          <Text style={styles.greyText}>(Fetch Recipe Image Here)</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.previewOverlay}>
            <Text style={styles.overlayText}>(Fetch Preview data here)</Text>
          </View>
          <View style={styles.ingredientsOverlay}>
            <Text style={styles.overlayText}>Ingredients</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {[1, 2, 3, 4, 5].map((index) => (
              <View key={index} style={styles.greyBackgroundSquare}>
                <Text style={styles.greyBackgroundText}>Fetch Ingredients here</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.additionalSection}>
            <Text style={styles.additionalSectionText}>(Fetch Procedure here)</Text>
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
  greyBackground: {
    backgroundColor: 'grey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 10,
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 10,
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
  greyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 0.7,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 25,
    marginTop: -20, 
    paddingTop: 20, 
  },
  scrollViewContent: {
    margin: 5,
    paddingBottom: 20, 
  },
  previewOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 40,
    height: 100,
    width: '100%',
    marginBottom: 10,
  },
  ingredientsOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 125,
    borderRadius: 30,
    marginBottom: 10,
  },
  horizontalScrollView: {
    marginHorizontal: -4,
  },
  greyBackgroundSquare: {
    backgroundColor: 'grey',
    width: 120,
    height: 120,
    borderRadius: 30,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyBackgroundText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  additionalSection: {
    backgroundColor: '#08A045',
    padding: 20,
    height: 500,
    marginTop: 20,
    marginBottom: 10,
  },
  additionalSectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});

export default RecipeScreen;