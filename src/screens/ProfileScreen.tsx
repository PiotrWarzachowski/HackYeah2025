import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import garminOAuth from '../services/garminOAuth';

interface ProfileScreenProps {
    navigation?: any;
    onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        // Clear Garmin OAuth tokens
                        garminOAuth.logout();

                        // Call the logout handler from App.tsx
                        onLogout();
                    },
                },
            ]
        );
    };
    const menuItems = [
        {
            id: '1',
            icon: '👤',
            title: 'Personal Information',
            subtitle: 'Update your profile details',
        },
        {
            id: '2',
            icon: '🎯',
            title: 'Goals & Targets',
            subtitle: 'Set your health and fitness goals',
        },
        {
            id: '3',
            icon: '📊',
            title: 'Data & Privacy',
            subtitle: 'Manage your data and privacy settings',
        },
        {
            id: '4',
            icon: '🔔',
            title: 'Notifications',
            subtitle: 'Customize your notification preferences',
        },
        {
            id: '5',
            icon: '🔗',
            title: 'Connected Devices',
            subtitle: 'Manage Garmin and other integrations',
        },
        {
            id: '6',
            icon: '💳',
            title: 'Subscription',
            subtitle: 'Manage your premium subscription',
        },
        {
            id: '7',
            icon: '❓',
            title: 'Help & Support',
            subtitle: 'Get help and contact support',
        },
        {
            id: '8',
            icon: '⚙️',
            title: 'Settings',
            subtitle: 'App preferences and settings',
        },
    ];

    const stats = [
        { label: 'Total Workouts', value: '142' },
        { label: 'Streak Days', value: '28' },
        { label: 'Experiments', value: '6' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>P</Text>
                    </View>
                    <Text style={styles.name}>Peter</Text>
                    <Text style={styles.email}>peter@example.com</Text>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statItem}>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuIcon}>
                                <Text style={styles.menuIconText}>{item.icon}</Text>
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>
                                    {item.subtitle}
                                </Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Version 1.0.0</Text>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#7EE3A0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#9ca3af',
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        gap: 32,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7EE3A0',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#9ca3af',
    },
    menuSection: {
        marginTop: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        gap: 16,
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIconText: {
        fontSize: 24,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#9ca3af',
    },
    menuArrow: {
        fontSize: 28,
        color: '#9ca3af',
        fontWeight: '300',
    },
    logoutButton: {
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 24,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    version: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 24,
    },
});

export default ProfileScreen;

