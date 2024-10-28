import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { cityCoordinates } from '../data/const'; // Importerer bykoordinater

export default function FetchListScreen() { 
    const route = useRoute(); // Henter ruten som FetchListScreen er på
    const { selectedCity } = route.params || {}; // Henter valgt by fra ruten
    const country = selectedCity ? Object.keys(cityCoordinates).find((key) => // Henter landet byen er i
        cityCoordinates[key].hasOwnProperty(selectedCity) // Sjekker om byen er i landet
    ) : null;

    const coordinates = country ? cityCoordinates[country][selectedCity] : { latitude: 0, longitude: 0 }; // Henter koordinater for byen

    // Funksjon for å generere tilfeldige koordinater rundt et gitt punkt
    const generateRandomPins = (center, numberOfPins) => {
        const pins = [];
        const radius = 0.005; // Radius for å generere tilfeldige pins (5 km omtrent)

        for (let i = 0; i < numberOfPins; i++) {
            const randomLat = center.latitude + (Math.random() - 0.5) * radius;
            const randomLng = center.longitude + (Math.random() - 0.5) * radius;
            pins.push({ latitude: randomLat, longitude: randomLng });
        }

        return pins;
    };

    // Generer tilfeldige pins rundt valgt by, som skal simulere pantemaskiner i området
    const randomPins = generateRandomPins(coordinates, 5); // Generer 5 tilfeldige pins

    return (
        <View style={styles.container}>
            {selectedCity ? (
                <>
                    <Text style={styles.title}>Map of {selectedCity}</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={coordinates} title={selectedCity} />
                        {randomPins.map((pin, index) => (
                            <Marker
                                key={index}
                                coordinate={pin}
                                title={`Pantemaskin ${index + 1}`} 
                                pinColor="blue" // Pantemaskinene er blå
                            />
                        ))}
                    </MapView>
                </>
            ) : (
                <Text style={styles.errorText}>Vennligst velg landet du er i først.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: '90%',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});
