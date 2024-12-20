import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/styles'; 


const TempoSelectionScreen = () => {

    // Define the Folder Names
    const folderNames = [
        "1. Tha Dhi Thom Nam",
        "2. Tha Tha Dhi Dhi",
        "3. Tha Tha Tha Dhi Dhi Dhi",
        "4. Tha Tha Tha Tha Dhi Dhi Dhi Dhi",
        "5. Tha Dhi Thom Nam Nam Thom Dhi Tha",
        "6. Tha Tha Dhi Dhi Thom Thom",
        "7. Tha Tha Tha Dhi Dhi Dhi Thom Thom Thom",
        "8. Tha Tha Tha Tha Dhi Dhi Dhi Dhi",
    ];

    // Set all necessary variables
    const [selectedFolder, setSelectedFolder] = useState(folderNames[0]);
    const [tempo, setTempo] = useState("60");
    const navigation = useNavigation();

    // To detect change in tempo and verify its numeric
    const handleTempoChange = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        setTempo(numericValue);
    };

    // Navigate to next Screen
    const proceedToPractice = () => {
        if (!selectedFolder || !tempo) {
            Alert.alert("Error", "Please select a folder and enter a valid tempo.");
            return;
        }

        navigation.navigate("PracticeMode", {
            folder: selectedFolder,
            tempo: parseInt(tempo),
        });
    };

    return (
        <LinearGradient
            colors={['#F1F1F1', '#E0E0E0', '#C8C8C8', '#A9A9A9']}
            style={styles.container}
        >
            <Text style={styles.title}>Select Folder</Text>
            <View style={{ width: "80%", borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 20 }}>
                <Picker
                    selectedValue={selectedFolder}
                    onValueChange={(itemValue) => setSelectedFolder(itemValue)}
                    style={{ height: 50, width: "100%" }}
                >
                    <Picker.Item label="Select a folder" value="" />
                    {folderNames.map((folder, index) => (
                        <Picker.Item key={index} label={folder} value={folder} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Enter Tempo (in BPM):</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter tempo (e.g., 60)"
                keyboardType="numeric"
                value={tempo}
                onChangeText={handleTempoChange}
            />

            <Button title="Start Practice" onPress={proceedToPractice} color="#4CAF50"/>
        </LinearGradient>
    );
};

export default TempoSelectionScreen;
