import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileDemo = () => {
  // --- FILL IN THE BLANKS BELOW ---
  const info = {
    courseSection: "BSIS - 2B", 
    name: "Jeremy S. Ortega",
    age: "21 Years Old",
    hobby: "Drawing and Walking",
    petPeeves: [
      "Classmates who points at other classmates. ",
      "Noisy classmates during lectures.",
      "Classmates who invade personal space."
    ]
  };


  
  // --------------------------------

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.header}>Profile</Text>
        
        <Text style={styles.label}>Course & Section:</Text>
        <Text style={styles.value}>{info.courseSection}</Text>

        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{info.name}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{info.age}</Text>

        <Text style={styles.label}>Favorite Hobby:</Text>
        <Text style={styles.value}>{info.hobby}</Text>


        <View style={styles.peeveSection}>
          <Text style={styles.label}>Class / Classmate Pet Peeves:</Text>
          {info.petPeeves.map((peeve, index) => (
            <Text key={index} style={styles.value}>• {peeve}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3997fb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    color: '#222',
    marginBottom: 5,
  },
  peeveSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});

export default ProfileDemo;