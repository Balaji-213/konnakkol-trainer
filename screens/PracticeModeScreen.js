import React, { useEffect, useState, useRef } from 'react';
import { View, Button, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/styles'; 
import audioFiles from '../data/data';

const PracticeModeScreen = ({ route }) => {

    // Set all necessary variables
    const { folder, tempo } = route.params;
    const [lessonSounds, setLessonSounds] = useState([]);
    const [metronomeSounds, setMetronomeSounds] = useState([]); 
    const [beatsCount, setBeatsCount] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState(3); 
    const [cycleCount, setCycleCount] = useState(0); 
    const [randomLessonIndex, setRandomLessonIndex] = useState(null);  
    const [isRandom, setIsRandom] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 

    const intervalRef = useRef(null); // Ref for interval to manage the countdown and cycles
    let timeoutRefs = []; // Ref to manage all the timeouts

    const originalTempo = 60;
    const navigation = useNavigation();

    // To prevent the user to go back to Home Screen while audio is playing
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (isPlaying) {
                e.preventDefault(); // Prevent navigation
                Alert.alert(
                    "Music Playing",
                    "Stop the music before going back.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Stop Music", onPress: stopPractice },
                    ]
                );
            }
        });

        return unsubscribe; // Cleanup listener on unmount
    }, [navigation, isPlaying]);

    // Load lesson and metronome sounds dynamically
    const loadSounds = async () => {
        const selectedFolder = audioFiles[folder]; // Get the data for the selected folder

        if (!selectedFolder) {
            console.error('Folder not found:', folder);
            return;
        }

        // Get the lesson and metronome files for the selected folder
        const lessonFileNames = selectedFolder.lesson;
        const metronomeFileNames = selectedFolder.metronome;
        const beatsNumebers = selectedFolder.beats;

        const lessonFiles = [];
        const metronomeFiles = [];

        // Loop through lesson and metronome files and load them
        for (let i = 0; i < lessonFileNames.length; i++) {
            const lessonFile = new Audio.Sound();
            const metronomeFile = new Audio.Sound();

            try {
                // Dynamically load the lesson and metronome files
                await lessonFile.loadAsync(lessonFileNames[i]);
                await metronomeFile.loadAsync(metronomeFileNames[i]);

                lessonFiles.push(lessonFile);
                metronomeFiles.push(metronomeFile);
            } catch (error) {
                console.error(`Error loading ${lessonFileNames[i]}:`, error);
            }
        }

        setLessonSounds(lessonFiles);
        setMetronomeSounds(metronomeFiles);
        setBeatsCount(beatsNumebers);
    };

    // Countdown timer before playback starts
    const startCountdown = () => {
        setIsLoading(true); // Show loading overlay
        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(intervalRef.current);
                    setIsPlaying(true);
                    setIsLoading(false);
                }
                return prev - 1;
            });
        }, 1000); // Countdown every second

    };

    // Play LessonAndMetronome for every cycle
    useEffect(() => {
        if (isPlaying) {
            playLessonAndMetronome(cycleCount);
        }
    }, [isPlaying, cycleCount]);


    // Main file to play audio
    const playLessonAndMetronome = async (cycle) => {
        if (!isPlaying || lessonSounds.length === 0 || metronomeSounds.length === 0 || (isRandom && randomLessonIndex === null)) return;
    
        var fileIndex = Math.floor(cycle / 2);
        
        // If Random Mode enabled this will override the fileIndex
        if(isRandom){
            fileIndex = randomLessonIndex;
        }

        // Stop the code after lessons complete
        if (fileIndex >= lessonSounds.length) {
            stopPractice();
            return;
        }
    
        const rate = tempo / originalTempo;
        const numBeat = beatsCount[fileIndex];
        const duration = numBeat * (60 / tempo) * 1000;
    
        // await for all the Promise to set, play and stop get completed 
        // Lesson, Metronome both on even cycle and only Metronome on odd cycle will be played
        try {
            if (cycle % 2 === 0) {
                await Promise.all([
                    metronomeSounds[fileIndex].setRateAsync(rate, true),
                    lessonSounds[fileIndex].setRateAsync(rate, true),
                ]);
    
                await Promise.all([
                    metronomeSounds[fileIndex].playAsync(),
                    lessonSounds[fileIndex].playAsync(),
                ]);
    
                const timeoutId = setTimeout(async () => {
                    if (!isPlaying) return; // Exit if practice has been stopped
                    await Promise.all([
                        metronomeSounds[fileIndex].stopAsync(),
                        lessonSounds[fileIndex].stopAsync(),
                    ]);
                    setCycleCount(cycle + 1);
                }, duration);
                timeoutRefs.push(timeoutId); // Track this timeout
            } else {
                await metronomeSounds[fileIndex].setRateAsync(rate, true);
                await metronomeSounds[fileIndex].playAsync();
    
                const timeoutId = setTimeout(async () => {
                    if (!isPlaying) return; // Exit if practice has been stopped
                    await metronomeSounds[fileIndex].stopAsync();
                    setCycleCount(cycle + 1);
                    setRandomLessonIndex(Math.floor(Math.random() * lessonSounds.length));
                }, duration);
                timeoutRefs.push(timeoutId); // Track this timeout
            }
        } catch (error) {
            console.error("Error during playback:", error);
        }
    };
    
    // Stop all sounds
    const stopPractice = async () => {
        // Reset state
        setCountdown(3);
        setCycleCount(0);
        setIsPlaying(false);

        // Clear countdown interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Clear all pending timeouts
        timeoutRefs.forEach(clearTimeout);
        timeoutRefs = [];

        // Stop all sounds
        try {
            await Promise.all(
                lessonSounds.map((sound) => sound.stopAsync())
            );
            await Promise.all(
                metronomeSounds.map((sound) => sound.stopAsync())
            );
        } catch (error) {
            console.error("Error stopping practice:", error);
        }
    };

    // Load and Unload sounds on enty and exit from the screen
    useEffect(() => {
        loadSounds();

        return () => {
            // Unload sounds when the component unmounts
            lessonSounds.forEach((sound) => sound.unloadAsync());
            metronomeSounds.forEach((sound) => sound.unloadAsync());
            clearInterval(intervalRef.current); // Clear countdown interval on unmount
        };
    }, [folder]); // Reload sounds if folder changes

    // To toggle between Random and Ordered Mode
    const togglePlaybackMode = () => {
        setIsRandom((prev) => !prev);
        if (!isRandom) {
            // Reset to play from the beginning
            setCycleCount(0);
            setRandomLessonIndex(Math.floor(Math.random() * lessonSounds.length));
        }
    };

    // Stoppractice when backgroung is blur or leaving
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                stopPractice(); // Stop music when leaving the screen
            };
        }, [])
    );

    return (
        <LinearGradient
            colors={['#F1F1F1', '#E0E0E0', '#C8C8C8', '#A9A9A9']}
            style={styles.container}
        >
            <Text style={styles.title}>Practice Mode</Text>

            {!isLoading && (
                <>
                    <Text style={styles.infoText}>Folder: {folder}</Text>
                    <Text style={styles.infoText}>Tempo: {tempo} BPM</Text>
                </>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    title={isPlaying ? 'Stop Practice' : 'Start Practice'}
                    onPress={() => {
                        if (isPlaying) {
                            stopPractice();
                        } else {
                            startCountdown(); // Start the countdown
                        }
                    }}
                    color={isPlaying ? '#FF3B30' : '#4CAF50'}
                />
            </View>

            <View style={[styles.buttonContainer, styles.toggleButtonContainer]}>
                <Button
                    title={isRandom ? "Switch to Ordered Mode" : "Switch to Random Mode"}
                    onPress={togglePlaybackMode}
                    color="#4CAF50"
                />
            </View>

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <BlurView style={styles.blur} blurType="light" intensity={50} experimentalBlurMethod="blur" />

                    <View style={styles.loadingPopup}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text style={styles.loadingText}>Starting in: {countdown}</Text>
                    </View>
                </View>
            )}
        </LinearGradient>
    );
};

export default PracticeModeScreen;
