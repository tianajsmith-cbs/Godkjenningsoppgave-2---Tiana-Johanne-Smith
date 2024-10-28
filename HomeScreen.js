import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Velkommen til PantApp!</Text>
      <Text style={styles.infoText}>
        Visste du at panting er en effektiv måte å redusere avfall på? Mange land har pantesystemer som gjør det enkelt for deg å returnere flasker og bokser for å få tilbake penger. Dette bidrar ikke bare til å holde miljøet rent, men gir deg også muligheten til å tjene noen kroner!
      </Text>
      <Text style={styles.instructionsText}>Hvordan fungerer PantApp?</Text>
      <Text style={styles.infoText}>
        1. <Text style={styles.boldText}>Velg Land:</Text> Start med å velge hvilket land du befinner deg i, og vi hjelper deg med å navigere til den nærmeste.
      </Text>
      <Text style={styles.infoText}>
        2. <Text style={styles.boldText}>Finn Pantemaskiner:</Text> Når du har valgt landet ditt, kan du enkelt se de nærmeste maskinene (blå pins). 
      </Text>
      <Text style={styles.infoText}>
        3. <Text style={styles.boldText}>Skann Pantemaskinen:</Text> Når du har funnet en pantemaskin, kan du skanne QR-koden for å koble deg til den for å få penger direkte på telefonen din eller samle informasjon om pantehistorikken din
      </Text>
      <Text style={styles.infoText}>
        4. <Text style={styles.boldText}>Se hvor og hvor mye du har pantet:</Text> Her kan se en oversikt over alle pantemaskinene du har besøkt og hvor mye du har pantet.</Text>
      <Text style={styles.footerText}>
        Bli med på å gjøre en forskjell for miljøet, og la oss gjøre panting enklere og mer tilgjengelig for alle!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#4caf7a', 
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 15,
    lineHeight: 22,
  },
  instructionsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    marginTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
