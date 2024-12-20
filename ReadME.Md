# KONNAKKOL-TRAINER-APP

In this React Native application, I’ve structured the app around two key screens: Tempo Selection Screen and Practice Mode Screen, both working together to provide a seamless practice experience for the user.

## Features

**`Countdown Timer`**: Before starting the practice, a countdown is shown to prepare the user.

**`Lesson Sounds`**: The screen dynamically loads lesson sounds based on a selected folder.

**`Metronome`**: The metronome sound is played in sync with the lessons to help users keep time.

**`Random Mode`**: Toggle between playing lessons in a random order or a fixed order.

**`Tempo Control`**: Users can practice at a user-defined tempo (BPM).

**`Sound Management`**: Sounds are dynamically loaded and unloaded, preventing memory leaks.

**`Prevents Navigation`**: If music is playing, the user is prompted to stop the music before navigating away from the screen.

**`Graceful Cleanup`**: Ensures all audio resources are stopped and cleaned up when the screen is left or the practice is stopped.

## Requirements

React Native

Expo SDK (for audio and blur effects)

Navigation: @react-navigation/native

Picker: @react-native-picker/picker

Audio: expo-av

BlurView: expo-blur

Linear Gradient: expo-linear-gradient

## Installation

Clone the repository.

Install dependencies:
    `'npm install'`

Make sure you have the necessary environment for React Native development and Expo.

## Run

Run the following command:
    `'npm start'`

Note that it will generate an QR code which we have to scan in the EXPO GO App in tha mobile, this will load the app on the users device.

Else run
    `'npm run web'`

This will start app on temporary web mode.

## Approach:

### Tempo Selection Screen:

**`Folder Selection`**: Users can choose from a list of predefined lesson folders using a dropdown (Picker). This selection is stored in the state (selectedFolder) for use in the next screen.

**`Tempo Input`**: Users can enter a tempo (beats per minute) using a TextInput field. The tempo is sanitized to ensure only numeric values are entered.

**`Validation & Navigation`**: Once the user selects a folder and enters a valid tempo, they can proceed by pressing the "Start Practice" button. This action validates the input and navigates the user to the Practice Mode Screen, passing along the selected folder and tempo.

### Practice Mode Screen:

**`Lesson Playback`**: Based on the selected folder, the app dynamically loads the lesson and metronome sounds and syncs their playback to the tempo.

**`Countdown and Playback`**: Before the practice session starts, a countdown is triggered. Afterward, the app plays the lesson along with the metronome in either ordered or random mode. The tempo directly controls the speed of both the lesson and metronome.

**`Control Features`**: The app includes a stop button to end the practice session and prevents navigation away from the screen while the music is playing to ensure the user can focus.

### Concepts:

**`State Management`**: State is used to store the selected folder and tempo, which are passed between the screens using React Navigation.

**`Dynamic Sound Loading`**: The app dynamically loads lesson and metronome sounds based on the user’s folder selection, allowing flexibility in practice content.

**`User-Friendly Interface`**: Clear input fields and dropdowns, combined with a gradient background and clean button styles, ensure a pleasant user experience.

By separating the user interface into two distinct screens, I ensured that the user can select their preferences in a dedicated area (Tempo Selection), while the main practice features are handled on a separate screen (Practice Mode). This modular approach keeps the app’s logic organized and focused, allowing each screen to manage specific tasks
