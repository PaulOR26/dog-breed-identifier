import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import HistoryScreen from './components/HistoryScreen';
import GalleryScreen from './components/GalleryScreen';
import Nav from './components/nav';
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [camera, setCamera] = useState(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props, setParams) => {
            return (
              <Nav
                {...props}
                camera={camera}
                setCurrentDog={setCurrentDog}
                {...setParams}
              />
            );
          }}
        >
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} setCamera={setCamera} />}
          </Tab.Screen>
          <Tab.Screen name="History">
            {(props) => (
              <HistoryScreen
                {...props}
                currentDog={currentDog}
                setCurrentDog={setCurrentDog}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Gallery" component={GalleryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
