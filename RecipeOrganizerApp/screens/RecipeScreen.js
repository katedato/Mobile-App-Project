import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { Feather } from '@expo/vector-icons'; // Import Feather icons from expo

const db = SQLite.openDatabase('new_recipes.db');

const RecipeScreen = ({ route }) => {
  const navigation = useNavigation(); // Get navigation object
  const { recipeId } = route.params;
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    console.log('Recipe ID:', recipeId); // Debug output
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM recipes WHERE id = ?',
        [recipeId],
        (_, { rows }) => {
          const recipeData = rows.item(0); // Assuming id is unique, so we only take the first result
          console.log('Recipe Data:', recipeData); // Debug output
          setRecipe(recipeData);
        },
        (_, error) => {
          console.error('SQLite error:', error);
        }
      );
    });
  }, [recipeId]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditRecipe', { recipeId: recipeId })}
        >
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{recipe.title}</Text>
        </View>
      </View>
      <View style={styles.bottomSectionOverlay}>
        <ScrollView style={styles.bottomSection}>
          <View style={styles.previewSection}>
            <Text style={styles.previewText}>{recipe.preview}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <ScrollView horizontal={true} style={styles.scrollContainer}>
              {recipe.ingredients.split(',').map((ingredient, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Text style={styles.imageText}>{ingredient.replace(/^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g, '')}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.procedureStep}>
            <Text style={styles.sectionTitleProcedure}>Procedure</Text>
            {recipe.procedure.split(',').map((step, index) => (
              <View key={index} style={styles.procedureStep}>
                <Text style={styles.text}>{index + 1}. {step}</Text>
              </View>
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
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  topSection: {
    flex: 0.45,
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    width: '40%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    top: '50%',
    right: 0,
    transform: [{ translateY: -25 }],
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    padding: 10,
  },
  editButton: {
    position: 'absolute',
    top: 45,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    padding: 10,
  },
  bottomSectionOverlay: {
    position: 'absolute',
    height: '100%',
    top: 240,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 1,
  },
  bottomSection: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleProcedure: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  previewSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },
  previewText: {
    fontSize: 16,
    textAlign: 'left',
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageContainer: {
    backgroundColor: '#08A045',
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  procedureStep: {
    backgroundColor: '#08A045',
    padding: 10,
    marginBottom: 200,
    maxWidth: '100%', // Set the maximum width of the box
  },
  
  
});

export default RecipeScreen;
