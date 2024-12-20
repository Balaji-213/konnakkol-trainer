import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Container Styles
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E3F2FD',
    },

    // Gradient Background
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Title Styles
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#1E88E5',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 3,
    },

    // Label Styles
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#424242', 
    },

    // Input Styles
    input: {
        height: 50,
        borderColor: '#90CAF9',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: '80%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },

    // Information Text
    infoText: {
        fontSize: 16,
        marginTop: 15,
        color: '#455A64',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    // Button Containers
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    toggleButtonContainer: {
        marginTop: 10,
    },

    // Button Styles
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42A5F5', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Loading Overlay Container
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // Blur Effect
    blur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    // Loading Popup Styles
    loadingPopup: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },

    // Loading Text
    loadingText: {
        color: '#1E88E5',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;



