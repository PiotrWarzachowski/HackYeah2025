import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { garminApi } from '../services/garminApi';

interface GarminLoginModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const GarminLoginModal: React.FC<GarminLoginModalProps> = ({
    visible,
    onClose,
    onSuccess,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);

        try {
            // Call Garmin API service
            const result = await garminApi.loginWithCredentials(email, password);

            if (result.success) {
                // Success - clear form and call success callback
                setLoading(false);
                setEmail('');
                setPassword('');
                onSuccess();
            } else {
                // Failed authentication
                setLoading(false);
                setError(result.error || 'Invalid email or password. Please try again.');
            }
        } catch (err) {
            setLoading(false);
            setError('Network error. Please check your connection and try again.');
        }
    };

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <SafeAreaView style={styles.safeArea}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Connect to Garmin</Text>
                                <TouchableOpacity
                                    onPress={handleClose}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.subtitle}>
                                Sign in with your Garmin Connect account
                            </Text>

                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="your.email@example.com"
                                    placeholderTextColor="#666"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!loading}
                                />
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#666"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!loading}
                                />
                            </View>

                            {/* Error Message */}
                            {error ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            {/* Login Button */}
                            <TouchableOpacity
                                style={[
                                    styles.loginButton,
                                    loading && styles.loginButtonDisabled,
                                ]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#1a1a1a" />
                                ) : (
                                    <Text style={styles.loginButtonText}>
                                        Sign In
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer Links */}
                            <View style={styles.footer}>
                                <TouchableOpacity>
                                    <Text style={styles.footerLink}>
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.footerDivider}>•</Text>
                                <TouchableOpacity>
                                    <Text style={styles.footerLink}>
                                        Create account
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Info Text */}
                            <Text style={styles.infoText}>
                                By signing in, you allow this app to access your Garmin
                                Connect activity and health data.
                            </Text>
                        </SafeAreaView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        minHeight: '75%',
    },
    safeArea: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    closeButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#2a2a2a',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 20,
    },
    subtitle: {
        color: '#9ca3af',
        fontSize: 16,
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 16,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    errorContainer: {
        backgroundColor: '#ff4444',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#7EE3A0',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        gap: 12,
    },
    footerLink: {
        color: '#7EE3A0',
        fontSize: 14,
    },
    footerDivider: {
        color: '#666',
        fontSize: 14,
    },
    infoText: {
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 18,
    },
});

export default GarminLoginModal;

