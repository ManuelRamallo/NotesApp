import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Picker } from 'react-native';
import { Feather } from '@expo/vector-icons';
import footballApi from '../api/footballApi';

const NextMatchesScreen = ({ navigation }) => {
    const [arrayTeams, setArrayTeams] = useState([]);
    const [arrayNextMatches, setArrayNextMatches] = useState([]);

    const [currencyTeam, setCurrencyTeam] = useState(-1);

    const getTeams = async () => {

        setArrayTeams(() => arrayTeams.splice());
        setArrayTeams((arrayTeams) => arrayTeams.concat({id: -1, name: 'Selecciona un equipo'}));

        await footballApi.get('/competitions/2014/teams').then( value => {
            if(value){
                value.data.teams.forEach(team => {
                    setArrayTeams((arrayTeams) => arrayTeams.concat(team));
                });
            } else {
                console.log('WARNING, VALUE VACIO');
            }
        });

        // console.log('array teams', arrayTeams);
    }

    const getNextMatchesTeam = async (idTeam) => {

        setArrayNextMatches(() => arrayNextMatches.splice());

        await footballApi.get(`teams/${idTeam}/matches?status=SCHEDULED`).then( value => {
            if(value){
                value.data.matches.forEach(nextMatch => {
                    setArrayNextMatches((arrayNextMatches) => arrayNextMatches.concat(nextMatch));
                });
            } else {
                console.log('WARNING, VALUE VACIO');
            }
        });
    }

    useEffect(() => {
        getTeams();
        // getNextMatchesTeam();

        const listener = navigation.addListener('didFocus', () => {
            getTeams();
            // getNextMatchesTeam();
        });

        return () => {
            listener.remove();
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <View> 
                    <Picker
                        selectedValue={currencyTeam}
                        onValueChange={currency => {
                            setCurrencyTeam(currency);

                            if(currency !== -1){
                                getNextMatchesTeam(currency);
                            } else {
                                setArrayNextMatches(() => arrayNextMatches.splice());
                            }
                        }} 
                        mode="dropdown"
                    >
                        { arrayTeams.map((item, key)=>(
                            <Picker.Item label={item.name} value={item.id} key={key} />)
                        )}
                    </Picker>

                    <View style={styles.lineSeparator} />

                    { arrayNextMatches && <FlatList 
                            data={arrayNextMatches}
                            keyExtractor={(team, index) => team.id.toString()}
                            renderItem={({ item }) => {
                                return(
                                    <Text>
                                        {item.awayTeam.id !== currencyTeam ? item.awayTeam.name : item.homeTeam.name}
                                    </Text>
                                )
                            }}
                        />
                    } 

                    {arrayNextMatches.length === 0 && <Text style={styles.emptyState}>Choose a team...</Text>}

                </View>
                
            
            </View>
            
        
        </View>
    )
};

NextMatchesScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: 'Buscar próximos partidos',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" style={styles.iconMenu} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    iconMenu: {
        fontSize: 25,
        marginLeft: 10
    },
    container: {
        backgroundColor: '#F9FAFE',
        flex: 1,
        padding: 10,
    },
    cardStyle: {
        backgroundColor: 'white',
        padding: 25,
        flex: 1,
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 15,
        elevation: 3,
    },
    lineSeparator: {
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        width: '95%',
        marginTop: 3,
        marginBottom: 15
      },
});

export default NextMatchesScreen;