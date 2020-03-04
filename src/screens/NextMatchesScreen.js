import React, { useContext, useEffect, useState } from 'react';
import { View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Picker, 
    ActivityIndicator, 
    Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import footballApi from '../api/footballApi';
import EmptyState from '../components/emptyState';
import moment from 'moment';


const NextMatchesScreen = ({ navigation }) => {
    const [arrayTeams, setArrayTeams] = useState([]);
    const [arrayNextMatches, setArrayNextMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currencyTeam, setCurrencyTeam] = useState(-1);

    const getTeams = async () => {

        setArrayTeams(() => arrayTeams.splice());
        setArrayTeams((arrayTeams) => arrayTeams.concat({id: -1, name: 'Selecciona un equipo'}));

        try {
            await footballApi.get('/competitions/2014/teams').then( value => {
                if(value){
                    value.data.teams.forEach(team => {
                        setArrayTeams((arrayTeams) => arrayTeams.concat(team));
                    });
                }
            }); 
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }


    }

    const getNextMatchesTeam = async (idTeam) => {

        setArrayNextMatches(() => arrayNextMatches.splice());
        setLoading(true);
        
        try {
            await footballApi.get(`teams/${idTeam}/matches?status=SCHEDULED`).then( value => {
                if(value){
                    value.data.matches.forEach(nextMatch => {
                        setArrayNextMatches((arrayNextMatches) => arrayNextMatches.concat(nextMatch));
                    });
                    setLoading(false);
                }
            });
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    }

    useEffect(() => {
        getTeams();

        const listener = navigation.addListener('didFocus', () => {
            getTeams();
        });

        return () => {
            listener.remove();
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <View style={{height: '100%'}}> 
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
                        { arrayTeams.map((item, key)=>  (
                            <Picker.Item label={item.name} value={item.id} key={key} />
                            )
                        )}
                    </Picker>

                    <View style={styles.lineSeparator} />

                    { loading && <ActivityIndicator size="large" color="#59ADE7" style={styles.loader} /> }

                    { !loading && arrayNextMatches && <FlatList 
                            data={arrayNextMatches}
                            keyExtractor={(team, index) => team.id.toString()}
                            renderItem={({ item }) => {
                                return(
                                    <TouchableOpacity onPress={() => navigation.navigate('MatchesDay', { 'competition': item.competition })}>
                                        <View>
                                            <Text style={styles.textMatch}>
                                                {item.awayTeam.id !== currencyTeam ? item.awayTeam.name : item.homeTeam.name}
                                            </Text>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text>
                                                    {item.competition.name} 
                                                </Text>
                                                <Text>
                                                    {moment(item.utcDate).format('DD/MM/YYYY')}
                                                </Text>
                                            </View>
                                            
                                            <View style={styles.lineSeparatorList} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    } 

                    { !loading && arrayNextMatches.length === 0 && <EmptyState/>}

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
        marginBottom: 30
    },
    lineSeparatorList: {
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 3,
        marginBottom: 20
    },
    textMatch: {
        fontWeight: 'bold',
        fontSize: 16
    },
    loader: {
        flex: 1
    },
});

export default NextMatchesScreen;