import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { countries, cities } from '../data/const'; 
import { useNavigation } from '@react-navigation/native';

export default function CountryCitySelectScreen() {
    const navigation = useNavigation();
    const [selectedCountry, setSelectedCountry] = useState(null);
    
    const handleCountrySelect = (country) => {
        setSelectedCountry(country); // Setter det valgte landet//
    };

    const handleCitySelect = (city) => {
        navigation.navigate('Kart', { selectedCity: city }); // Navigerer til kartet med valgt by//
    };

    // Lager en knapp for hvert land    
    const renderCountryItem = ({ item }) => ( 
        <TouchableOpacity onPress={() => handleCountrySelect(item)} style={styles.countryItem}> 
            <Text style={styles.countryText}>{item}</Text>
        </TouchableOpacity>
    );
    // Lager en knapp for hver by
    const renderCityItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCitySelect(item)} style={styles.cityItem}> 
            <Text style={styles.cityText}>{item}</Text>
        </TouchableOpacity>
    );

    const citiesList = selectedCountry ? cities[selectedCountry] : []; // Hent byer basert på valgt land//

    return (
        <View style={styles.container}>
            {!selectedCountry ? (
                <>
                    <Text style={styles.title}>Hvilket land er du i?</Text>
                    <FlatList
                        data={countries}
                        renderItem={renderCountryItem}
                        keyExtractor={(item) => item}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.title}>Byer i {selectedCountry}</Text>
                    <FlatList
                        data={citiesList}
                        renderItem={renderCityItem}
                        keyExtractor={(item) => item}
                    />
                    <TouchableOpacity onPress={() => setSelectedCountry(null)} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Tilbake til landvalg</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4caf7a',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    countryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    countryText: {
        fontSize: 18,
    },
    cityItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cityText: {
        fontSize: 18,
    },
    backButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
