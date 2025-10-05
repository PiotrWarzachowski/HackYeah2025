import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import HomeNavigation from './src/navigation/HomeNavigation';
import { garminApi } from './src/services/garminApi';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleGarminLogin = async () => {
        try {
            const result = await garminApi.authenticate();

            if (result.success) {
                setIsAuthenticated(true);

                // Fetch some sample data
                const userData = await garminApi.getUserData();
                const activities = await garminApi.getActivities(5);
                const healthData = await garminApi.getHealthData();

                console.log('User Data:', userData);
                console.log('Activities:', activities);
                console.log('Health Data:', healthData);
            }
        } catch (error) {
            console.error('Garmin login error:', error);
        }
    };

    const handleLogout = () => {
        // Clear authentication state
        setIsAuthenticated(false);
        
        // Clear any stored tokens or data
        console.log('User logged out');
    };

    if (isAuthenticated) {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <HomeNavigation onLogout={handleLogout} />
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <LoginScreen onGarminLogin={handleGarminLogin} />
        </SafeAreaProvider>
    );
}


