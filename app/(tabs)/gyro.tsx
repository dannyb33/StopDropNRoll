import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';

export default function App() {
    const [gyroData, setGyroData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [accData, setAccData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [gSubscription, setGSubscription] = useState<EventSubscription>(null);
    const [aSubscription, setASubscription] = useState<EventSubscription>(null);


    Gyroscope.setUpdateInterval(60);
    Accelerometer.setUpdateInterval(60);

    const _gsubscribe = () => {
        setGSubscription(
        Gyroscope.addListener(gyroscopeData => {
            setGyroData(gyroscopeData);
        })
        );
    };

    const _asubscribe = () => {
        setASubscription(Accelerometer.addListener(setAccData));
    };

    const _gunsubscribe = () => {
        gSubscription && gSubscription.remove();
        setGSubscription(null);
    };

    const _aunsubscribe = () => {
        aSubscription && aSubscription.remove();
        setASubscription(null);
    };

    useEffect(() => {
        _gsubscribe();
        _asubscribe();
        return () => 
            {
                _gunsubscribe();
                _aunsubscribe();
            }
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Gyroscope:</Text>
        <Text style={styles.text}>x: {gyroData.x}</Text>
        <Text style={styles.text}>y: {gyroData.y}</Text>
        <Text style={styles.text}>z: {gyroData.z}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={gSubscription ? _gunsubscribe : _gsubscribe} style={styles.button}>
            <Text>{gSubscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
        </View>
                <Text style={styles.text}>Accelerometer:</Text>
        <Text style={styles.text}>x: {accData.x}</Text>
        <Text style={styles.text}>y: {accData.y}</Text>
        <Text style={styles.text}>z: {accData.z}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={aSubscription ? _aunsubscribe : _asubscribe} style={styles.button}>
            <Text>{aSubscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f7878786'
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    });