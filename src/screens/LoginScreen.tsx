import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StatusBar,
    Alert,
    StyleSheet,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GarminLogo, AppleWatchLogo, FitbitLogo } from '../assets/svg';
import garminOAuth from '../services/garminOAuth';

interface LoginScreenProps {
    onGarminLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGarminLogin }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+48');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    /**
     * Handle Garmin OAuth login
     * Opens browser for user to log in with their Garmin account
     */
    const handleGarminLogin = async () => {
        try {
            setIsAuthenticating(true);
            
            // Start OAuth flow - opens Garmin login in browser
            const result = await garminOAuth.authenticate();
            
            if (result.success) {
                Alert.alert(
                    'Success!',
                    'Successfully logged in with Garmin Connect',
                    [
                        {
                            text: 'Continue',
                            onPress: () => {
                                if (onGarminLogin) {
                                    onGarminLogin();
                                }
                            }
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Login Failed',
                    result.error || 'Failed to authenticate with Garmin. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Garmin login error:', error);
            Alert.alert(
                'Error',
                'An unexpected error occurred. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsAuthenticating(false);
        }
    };

    const handleDisabledButton = (provider: string) => {
        Alert.alert('Coming Soon', `${provider} integration is not available yet.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Get Started With Your{'\n'}Fitness Journey
                        </Text>
                        <Text style={styles.subtitle}>
                            Log in or sign up
                        </Text>
                    </View>

                    {/* Phone Input Section */}
                    <View style={styles.phoneSection}>
                        <View style={styles.phoneRow}>
                            {/* Country Code Selector */}
                            <TouchableOpacity
                                style={styles.countryButton}
                                onPress={() => handleDisabledButton('Country selector')}
                            >
                                <Text style={styles.flag}>🇵🇱</Text>
                                <Text style={styles.arrow}>▼</Text>
                            </TouchableOpacity>

                            {/* Phone Number Input */}
                            <View style={styles.phoneInputContainer}>
                                <Text style={styles.countryCode}>{countryCode}</Text>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="Enter Mobile Number"
                                    placeholderTextColor="#666"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </View>

                        {/* Continue Button */}
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => handleDisabledButton('Phone login')}
                        >
                            <Text style={styles.continueButtonText}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Integration Buttons */}
                    <View style={styles.integrationButtons}>
                        {/* Apple Watch Button */}
                        <TouchableOpacity
                            style={[styles.integrationButton, styles.disabledButton]}
                            onPress={() => handleDisabledButton('Apple Watch')}
                        >
                            <AppleWatchLogo width={40} height={40} color="#fff" />
                        </TouchableOpacity>

                        {/* Garmin Button - OAuth SSO */}
                        <TouchableOpacity
                            style={[styles.integrationButton, isAuthenticating && styles.authenticatingButton]}
                            onPress={handleGarminLogin}
                            activeOpacity={0.7}
                            disabled={isAuthenticating}
                        >
                            {isAuthenticating ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <GarminLogo width={120} height={40} color="#fff" />
                            )}
                        </TouchableOpacity>

                        {/* Fitbit Button */}
                        <TouchableOpacity
                            style={[styles.integrationButton, styles.disabledButton]}
                            onPress={() => handleDisabledButton('Fitbit')}
                        >
                            <FitbitLogo width={100} height={40} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            by continuing, you agree to our
                        </Text>
                        <View style={styles.footerLinks}>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>
                                    terms of service
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>
                                    privacy policy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>
                                    content policies
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 48,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
    },
    subtitle: {
        color: '#9ca3af',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },
    phoneSection: {
        marginBottom: 24,
    },
    phoneRow: {
        flexDirection: 'row',
        gap: 12,
    },
    countryButton: {
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    flag: {
        fontSize: 24,
    },
    arrow: {
        color: 'white',
        fontSize: 16,
    },
    phoneInputContainer: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        color: 'white',
        fontSize: 16,
        marginRight: 8,
    },
    phoneInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    continueButton: {
        backgroundColor: '#7EE3A0',
        borderRadius: 999,
        paddingVertical: 20,
        marginTop: 16,
    },
    continueButtonText: {
        color: '#1a1a1a',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    dividerText: {
        color: '#9ca3af',
        fontSize: 16,
        marginHorizontal: 16,
    },
    integrationButtons: {
        gap: 16,
    },
    integrationButton: {
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    authenticatingButton: {
        opacity: 0.6,
    },
    integrationButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 32,
    },
    footerText: {
        color: '#9ca3af',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
    },
    footerLink: {
        color: '#9ca3af',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
