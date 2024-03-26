import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import BreakfastScreen from './screens/BreakfastScreen'; // Import BreakfastScreen and other screens
import LunchScreen from './screens/LunchScreen';
import SnacksScreen from './screens/SnacksScreen';
import DinnerScreen from './screens/DinnerScreen';
import DessertsScreen from './screens/DessertsScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import EditRecipeScreen from './screens/EditRecipeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BreakfastScreen" component={BreakfastScreen} />
        <Stack.Screen name="LunchScreen" component={LunchScreen} />
        <Stack.Screen name="SnacksScreen" component={SnacksScreen} />
        <Stack.Screen name="DinnerScreen" component={DinnerScreen} />
        <Stack.Screen name="DessertsScreen" component={DessertsScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
