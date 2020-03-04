import React, {useState, useEffect} from 'react';
import { View, 
        StyleSheet, 
        Text, 
        ActivityIndicator, 
        Alert, 
        FlatList } from 'react-native';
import footballApi from '../api/footballApi';
import moment from 'moment';

const MatchesOfTheDayScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [arrayMatchesOfTheDay, setArrayMatchesOfTheDay] = useState([]);
    const competition = navigation.getParam('competition');

    const getMatchesOfTheDay = async () => {
        setArrayMatchesOfTheDay(() => arrayMatchesOfTheDay.splice());
        setLoading(true);

        try {
            await footballApi.get(`/competitions/${competition.id}/matches`).then( value => {
                if(value){
                    value.data.matches.forEach(match => {
                        setArrayMatchesOfTheDay((arrayMatchesOfTheDay) => arrayMatchesOfTheDay.concat(match));
                    });
                    setLoading(false);
                }
            });
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    useEffect(() => {
        getMatchesOfTheDay();

        const listener = navigation.addListener('didFocus', () => {
            getMatchesOfTheDay();
        });

        return () => {
            listener.remove();
        }
    }, []);


    return (
        <View style={styles.container}> 

            <View style={styles.cardStyle}>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>Competicion:</Text> &nbsp; {competition.name}
                </Text>
            </View>
            
            { loading && <ActivityIndicator size="large" color="#59ADE7" style={styles.loader} /> }

            { !loading && arrayMatchesOfTheDay && <FlatList 
                data={arrayMatchesOfTheDay}
                keyExtractor={(match, index) => match.id.toString()}
                renderItem={({item}) => {
                    return(
                        <View style={item.status === 'FINISHED' ? styles.cardFinishedMatchStyle : styles.cardScheduledMatchStyle}>
                            <View style={styles.cardContentStyle}>


                                {/* ESTADO DEL PARTIDO Y FECHA */}
                                <View style={styles.headerCard}>
                                    {item.status === 'FINISHED' && 
                                        <Text style={styles.finishedMatch}>
                                            FINALIZADO
                                        </Text>
                                    }
                                    {item.status === 'SCHEDULED' && 
                                        <Text style={styles.scheduledMatch}>
                                            POR DEFINIRSE
                                        </Text>
                                    }
                                    <Text style={{padding: 5}}>
                                        {moment(item.utcDate).format('DD/MM/YYYY')}
                                    </Text>
                                </View>

                                {/* NOMBRE DE LOS EQUIPOS */}
                                <View style={styles.contentCard}>
                                    { item.score.winner === 'HOME_TEAM' || item.score.winner === 'DRAW' ? 
                                        <Text style={{fontWeight: 'bold'}}>
                                            {item.homeTeam.name}
                                        </Text> : 
                                        <Text>
                                            {item.homeTeam.name}
                                        </Text>
                                    }

                                    { item.score.winner === 'AWAY_TEAM' || item.score.winner === 'DRAW' ? 
                                        <Text style={{fontWeight: 'bold'}}>
                                            {item.awayTeam.name}
                                        </Text> :
                                        <Text>
                                            {item.awayTeam.name}
                                        </Text>
                                    }
                                </View>

                                {/* SCORE DEL PARTIDO */}
                                <View style={styles.footerCard}>
                                    <Text>
                                        {item.score.fullTime.homeTeam}
                                    </Text>
                                    <Text>
                                        {item.score.fullTime.awayTeam}
                                    </Text>
                                </View>
                                
                            </View>
                        </View>
                    )
                }} 
            />}



        </View>
    );
};


MatchesOfTheDayScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: 'Partidos de la jornada',
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FAFE',
        flex: 1,
        padding: 10,
    },
    cardStyle: {
        backgroundColor: 'white',
        padding: 25,
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 4,
        elevation: 2,
    },
    cardContentStyle: {
        flexDirection: 'column',
        flex: 1    
    },
    loader: {
        flex: 1
    },
    headerCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    footerCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },
    scheduledMatch: {
        backgroundColor: 'rgba(0, 151, 254, 0.3)',
        padding: 5,
        borderRadius: 4
    },
    finishedMatch: {
        backgroundColor: 'rgba(254, 0, 0, 0.3)',
        padding: 5,
        borderRadius: 4
    },
    cardFinishedMatchStyle: {
        backgroundColor: 'white',
        padding: 25,
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 4,
        borderColor: 'rgba(254, 0, 0, 0.5)',
        borderLeftWidth: 4,
        elevation: 2,
    },
    cardScheduledMatchStyle: {
        backgroundColor: 'white',
        padding: 25,
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 4,
        borderColor: 'rgba(0, 151, 254, 0.5)',
        borderLeftWidth: 4,
        elevation: 2,
    },
});

export default MatchesOfTheDayScreen;