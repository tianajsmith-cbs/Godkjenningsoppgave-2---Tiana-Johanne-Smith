import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisitedMachinesScreen = ({ route }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const storedImages = await AsyncStorage.getItem('visitedImages');
                if (storedImages) {
                    setImages(JSON.parse(storedImages));
                }
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (route.params?.image) {
            setImages((prevImages) => [...prevImages, { uri: route.params.image }]);
            // Lagre det nye bildet i AsyncStorage
            const saveImages = async () => {
                await AsyncStorage.setItem('visitedImages', JSON.stringify([...images, { uri: route.params.image }]));
            };
            saveImages();
        }
    }, [route.params?.image]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Her kan du se hvor og hvor mye du har pantet: </Text>
            {images.length > 0 ? (
                <ScrollView>
                    {images.map((image, index) => (
                        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                    ))}
                </ScrollView>
            ) : (
                <Text>No images provided.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        fontSize: 17,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 10,
        borderRadius: 10,
    },
});

export default VisitedMachinesScreen;
