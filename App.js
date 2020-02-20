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

import { Provider } from './src/context/noteContext';


const MainNavigator = createStackNavigator({
    Index: IndexScreen,
    Create: CreateNoteScreen,
    Detail: DetailNoteScreen,
    Edit: EditNoteScreen
  },
  {
    initialRouteName: 'Index',
  }
)

const ConfigNavigator = createStackNavigator (
  {
    Config: ConfigScreen
  },
  {
    initialRouteName: 'Config',
  }
)

const Drawer = {
  Index: MainNavigator,
  Config: ConfigNavigator,
};

const Index = createDrawerNavigator(
  {
    ...Drawer
  },
  {
    initialRouteName: 'Index'
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





