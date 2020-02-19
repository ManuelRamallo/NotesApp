import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from './src/screens/IndexScreen';
import DetailNoteScreen from './src/screens/DetailNoteScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import EditNoteScreen from './src/screens/EditNoteScreen';

import { Provider } from './src/context/noteContext';


const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Detail: DetailNoteScreen,
    Create: CreateNoteScreen,
    Edit: EditNoteScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Notes'
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
