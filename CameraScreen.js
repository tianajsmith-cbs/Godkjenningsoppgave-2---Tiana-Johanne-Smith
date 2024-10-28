// Vi bruger Legacy Camera API, da den ny Camera API kun virker med TypeScript
import { Camera, CameraType } from 'expo-camera/legacy';  
import { useState, useRef } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Button, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importerer AsyncStorage for å lagre bilder

export default function CameraTest({ navigation }) {
    const [permission, requestPermission] = Camera.useCameraPermissions();// Kameratilgang
    const [loading, setLoading] = useState(false);// Lastestatus
    const [imagesArr, setImagesArr] = useState([]);// Array med bilder som er tatt
    const [type, setType] = useState(CameraType.back);// Bruker kameraet bak som standard
    const cameraRef = useRef();// Referanse til kameraet


    const permissionGranted = permission && permission.granted; // Sjekker om brukeren har gitt tillatelse til kameraet

    const snap = async () => {
        if (!cameraRef.current) {
            console.log("No camera ref");
            return;
        }
        setLoading(true);
        const result = await cameraRef.current.takePictureAsync();
        setImagesArr([...imagesArr, result]);

        // Lagre bildet i AsyncStorage
        const updatedImages = [...imagesArr, result]; // Oppdater bildearrayen
        await AsyncStorage.setItem('visitedImages', JSON.stringify(updatedImages));

        setLoading(false);
        navigation.navigate('Historikk', { image: result.uri }); // Naviger til Historikk med bildet som parameter
    };

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    };

    if (!permissionGranted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Vi har brug for din tilladelse til at vise kameraet</Text>
                <Button onPress={requestPermission} title="Giv tilladelse" />
            </View>
        );
    }// Returnerer en beskjed og en knapp, hvis brukeren ikke har gitt tilladelse til kameraet

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <TouchableOpacity style={styles.flipbtn} onPress={toggleCameraType}>
                                <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.snapContainer}>
                            <TouchableOpacity style={styles.snapbtn} onPress={snap}>
                                <Text style={styles.text}>{loading ? "Loading..." : "Scan"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        overflow: 'hidden',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 32,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: 'white',
        alignSelf: 'center',
    },
    safeview: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    snapbtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        height: 80,
        width: 80,
        borderRadius: 100,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
    },
    flipbtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 100,
        padding: 5,
        alignSelf: 'baseline',
        justifyContent: 'center',
    },
    snapContainer: {
        flex: 1,
        justifyContent: 'center', // Sentere knappen vertikalt
        alignItems: 'center', // Sentere knappen horisontalt
        position: 'absolute', // Endret til absolutt posisjonering
        top: '50%', // Plassere den i midten vertikalt
        left: '50%', // Plassere den i midten horisontalt
        transform: [{ translateX: -40 }, { translateY: -40 }], // Justere plasseringen av knappen
    },
});
