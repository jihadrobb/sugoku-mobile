import React from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from './src/screens/Home';
import Game from './src/screens/Game';
import Finish from './src/screens/Finish';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
