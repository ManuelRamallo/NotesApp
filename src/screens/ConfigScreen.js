import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  AsyncStorage, 
  Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const ConfigScreen = ({ navigation }) => {

    const [toggleLocalNotes, setToggleLocalNotes] = useState(null);

    AsyncStorage.getItem('toggleLocalNotes').then(value => {
      if(value !== null){
        setToggleLocalNotes(JSON.parse(value));
      }
    });


    clearAsyncStorageLocalNotes = async () => {
      Alert.alert(
        'Cuidado',
        '¿Estás seguro que deseas borrar todas las notas locales?',
        [ 
          {
            text: 'No',
            style: 'cancel',
          },
          {text: 'Si', onPress: () => {
            AsyncStorage.removeItem('localNotesData').then(() => {
              navigation.navigate('Index');
            })
          }},
        ],
        {cancelable: false},
      );
      
    };

    return (
      <View style={styles.container}>
        <View style={styles.toggle}>
            <Text style={styles.textToggle}>{toggleLocalNotes ? 'Notas Locales activadas' : 'Notas Locales desactivadas'}</Text>
            <Switch
                style={styles.switch}
                onValueChange={() => { 
                  setToggleLocalNotes(!toggleLocalNotes);

                  if(toggleLocalNotes){
                    AsyncStorage.setItem('toggleLocalNotes', JSON.stringify(!toggleLocalNotes));
                  } else {
                    AsyncStorage.setItem('toggleLocalNotes', JSON.stringify(!toggleLocalNotes));
                  }
                }} 
                value={toggleLocalNotes}
                thumbColor={'#59ADE7'}
            />   
        </View>             
        <View style={styles.lineSeparator} />

        <TouchableOpacity onPress={() => clearAsyncStorageLocalNotes()} style={styles.buttonDelete}>
            <Text style={styles.textButton}>Eliminar notas locales</Text>
        </TouchableOpacity>
        
      </View>
    );
}

ConfigScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Configuracion',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" style={styles.iconMenu} />
        </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: '#FAFAFA'
  },
  lineSeparator: {
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    width: '95%',
    marginVertical: 10
  },
  toggle: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  textToggle: {
      textAlign: 'left',
      marginRight: 5,
      marginTop: 3,
      fontWeight: 'bold'
  },
  switch: {
      alignSelf: 'flex-end'
  },

  buttonDelete: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 30,
    width: '90%',
    backgroundColor: '#59ADE7',
    padding: 13, 
    borderRadius: 8,
    elevation: 4
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  iconMenu: {
      fontSize: 25,
      marginLeft: 10
  },
});

export default ConfigScreen;