import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { getAllWorkout, getWorkout } from '../../actions/WorkoutAction';
import { getAllMakanan, getMakanan } from '../../actions/MakananAction';
import moment from 'moment';
import { Header } from '../../components';

export class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userWorkouts: [],
            userMakanans: [],
            historyData: [],
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            try {
                const [workouts, makanans] = await Promise.all([getAllWorkout(), getAllMakanan()]);

                const combinedData = [...workouts, ...makanans];
                const groupedData = this.groupDataByDate(combinedData);

                this.setState({
                    userWorkouts: workouts,
                    userMakanans: makanans,
                    historyData: groupedData,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error appropriately (e.g., show an error message to the user)
            }
        });
    }


    componentWillUnmount() {
        this._unsubscribe();
    }

    // Fungsi untuk mengelompokkan data berdasarkan tanggal
    groupDataByDate(data) {
        return data.reduce((groupedData, item) => {
            const tanggal = moment(item.tanggal).format('YYYY-MM-DD');

            if (!groupedData[tanggal]) {
                groupedData[tanggal] = {
                    totalKaloriMakanan: 0,
                    totalKaloriDibakar: 0,
                    items: [],
                };
            }

            if ('kalori' in item) {
                groupedData[tanggal].totalKaloriMakanan += item.kalori;
            } else if ('caloriesBurned' in item) {
                groupedData[tanggal].totalKaloriDibakar += item.caloriesBurned;
            }

            groupedData[tanggal].items.push(item);

            return groupedData;
        }, {});
    }


    renderHistoryItem = ({ item }) => {
        return (
            <View style={styles.historyItem}>
                <Text style={styles.dateLabel}>Tanggal: {item.tanggal}</Text>
                <View style={styles.kaloriContainer}>
                    <Text style={styles.kaloriLabel}>Kalori Makanan: </Text>
                    <Text style={styles.kaloriValue}>{item.totalKaloriMakanan} cal</Text>
                </View>
                <View style={styles.kaloriContainer}>
                    <Text style={styles.kaloriLabel}>Kalori Dibakar: </Text>
                    <Text style={styles.kaloriValue}>{item.totalKaloriDibakar} cal</Text>
                </View>
            </View>
        );
    };

    render() {
        const { historyData } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Header title="History" onBackPress={() => this.props.navigation.goBack()} />
                <Text style={styles.header}>History</Text>

                {Object.keys(historyData).length > 0 ? (
                    <FlatList
                        data={Object.keys(historyData).map(date => ({
                            tanggal: date,
                            ...historyData[date],
                        }))}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderHistoryItem}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
    },
    dateLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    kaloriContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    kaloriLabel: {
        fontSize: 16,
        marginRight: 4,
    },
    kaloriValue: {
        fontSize: 16,
        color: '#3498db',
    },
});

export default History;
