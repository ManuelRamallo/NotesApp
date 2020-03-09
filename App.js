import React, { Component }  from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator,
} from "react-navigation";

import {  createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from './src/screens/IndexScreen';
import DetailNoteScreen from './src/screens/DetailNoteScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import EditNoteScreen from './src/screens/EditNoteScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import MapScreen from './src/screens/MapScreen';

import { Provider } from './src/context/noteContext';
import NextMatchesScreen from './src/screens/NextMatchesScreen';
import MatchesOfTheDayScreen from './src/screens/MatchesOfTheDayScreen';



const MainNavigator = createStackNavigator({
    Index: IndexScreen,
    Create: CreateNoteScreen,
    Detail: DetailNoteScreen,
    Edit: EditNoteScreen
  },
  {
    initialRouteName: 'Index',
  }
);

const ConfigNavigator = createStackNavigator (
  {
    Config: ConfigScreen
  },
  {
    initialRouteName: 'Config',
  }
);

const MapNavigator = createStackNavigator (
  {
    Map: MapScreen
  },
  {
    initialRouteName: 'Map',
  }
);

const NextMatchesNavigator = createStackNavigator (
  {
    NextMatches: NextMatchesScreen,
    MatchesDay: MatchesOfTheDayScreen
  },
  {
    initialRouteName: 'NextMatches',
  }
);

const Drawer = {
  'Inicio': MainNavigator,
  'Configuración': ConfigNavigator,
  'Donde estoy': MapNavigator,
  'Buscar prox partidos': NextMatchesNavigator
};

const Index = createDrawerNavigator(
  {
    ...Drawer
  },
  {
    initialRouteName: 'Inicio'
  }

)


export const AppNavigator = createSwitchNavigator(
  {
    Index
  },
  {
    initialRouteName: 'Index'
  }
)

const App = createAppContainer(AppNavigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};





