import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Share,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const UserProfileScreen = ({ route, navigation }: any) => {
    // Get user from params or create mock user from userId
    const paramsUser = route.params?.user;
    const userId = route.params?.userId;
    
    // Mock user data if only userId is provided
    const mockUsers: any = {
        '1': { name: 'Sarah Johnson', username: '@sarahj', followers: 890, following: 156, streak: 89, healthScore: 7234, avatarColor: '#E8A87C' },
        '2': { name: 'Mike Chen', username: '@mikechen', followers: 1240, following: 203, streak: 156, healthScore: 8120, avatarColor: '#6BC5E8' },
        '3': { name: 'Anna Smith', username: '@annas', followers: 2100, following: 340, streak: 210, healthScore: 8956, avatarColor: '#7EE3A0' },
        '4': { name: 'David Lee', username: '@davidlee', followers: 567, following: 123, streak: 45, healthScore: 6543, avatarColor: '#E8C87C' },
        '5': { name: 'Emma Wilson', username: '@emmaw', followers: 1890, following: 278, streak: 178, healthScore: 8234, avatarColor: '#7EE3A0' },
        '6': { name: 'James Brown', username: '@jamesbrown', followers: 934, following: 189, streak: 134, healthScore: 7689, avatarColor: '#A87CE8' },
    };
    
    const user = paramsUser || mockUsers[userId] || mockUsers['1'];
    const [isFollowing, setIsFollowing] = useState(false);

    /**
     * Share user profile to other apps
     */
    const handleShareProfile = async () => {
        try {
            const shareMessage = `Check out ${user.name}'s fitness journey!\n\n` +
                `🏆 Health Score: ${user.healthScore}\n` +
                `🔥 Streak: ${user.streak} days\n` +
                `👥 ${user.followers} followers\n\n` +
                `Join me on Fitness Journey app!`;

            const result = await Share.share({
                message: shareMessage,
                title: `${user.name}'s Profile`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
                } else {
                    console.log('Profile shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing profile:', error);
            Alert.alert('Error', 'Failed to share profile. Please try again.');
        }
    };

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedDays = [true, true, true, false, false, false, false];

    const trophies = [
        { id: '1', type: 'run', label: 'First Run', unlocked: true },
        { id: '2', type: 'count', label: '50 Workouts', count: '50', unlocked: true },
        { id: '3', type: 'journal', label: 'Journal Master', unlocked: true },
        { id: '4', type: 'trophy', label: 'Gold Tier', unlocked: true },
        { id: '5', type: 'star', label: 'Star Performer', unlocked: true },
        { id: '6', type: 'strength', label: 'Strength King', unlocked: true },
    ];

    const renderTrophyIcon = (type: string, count?: string) => {
        switch (type) {
            case 'run':
                return (
                    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
                            fill="#fff"
                        />
                    </Svg>
                );
            case 'count':
                return <Text style={styles.trophyCountText}>{count}</Text>;
            case 'journal':
                return (
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                            fill="#fff"
                        />
                    </Svg>
                );
            case 'trophy':
                return (
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"
                            fill="#fff"
                        />
                    </Svg>
                );
            case 'star':
                return (
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="#fff"
                        />
                    </Svg>
                );
            case 'strength':
                return (
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
                            fill="#fff"
                        />
                    </Svg>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M15 18l-6-6 6-6"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={handleShareProfile}
                        activeOpacity={0.7}
                    >
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path
                                d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.moreIcon}>⋯</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View
                        style={[styles.avatar, { backgroundColor: user.avatarColor }]}
                    />
                    <View style={styles.profileInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.flag}>🇵🇱</Text>
                        </View>
                        <Text style={styles.followers}>{user.followers} followers • {user.following} following</Text>
                        <View style={styles.badges}>
                            <View style={styles.topBadge}>
                                <Text style={styles.topBadgeIcon}>⚡</Text>
                                <Text style={styles.topBadgeText}>TOP 8</Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.followBtn,
                                    isFollowing && styles.followingBtn,
                                ]}
                                onPress={() => setIsFollowing(!isFollowing)}
                            >
                                <Text
                                    style={[
                                        styles.followBtnText,
                                        isFollowing && styles.followingBtnText,
                                    ]}
                                >
                                    {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        {/* Share Profile Button */}
                        <TouchableOpacity 
                            style={styles.shareButton}
                            onPress={handleShareProfile}
                            activeOpacity={0.7}
                        >
                            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                                <Path
                                    d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                                    stroke="#7EE3A0"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                            <Text style={styles.shareButtonText}>Share Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Streak Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Streak</Text>
                        <Text style={styles.sectionValue}>{user.streak}</Text>
                    </View>
                    <View style={styles.streakCard}>
                        <View style={styles.fireIconContainer}>
                            <View style={styles.fireIconBg}>
                                <Svg width="56" height="72" viewBox="0 0 56 72">
                                    {/* Green outer flame */}
                                    <Path
                                        d="M28 8 C26 12, 22 18, 18 24 C16 28, 14 32, 14 38 C14 50, 20 58, 28 62 C36 58, 42 50, 42 38 C42 32, 40 28, 38 24 C34 18, 30 12, 28 8 Z"
                                        fill="#7EE3A0"
                                    />
                                    {/* White inner flame */}
                                    <Path
                                        d="M28 18 C27 22, 25 26, 24 30 C23 33, 22 36, 22 40 C22 46, 24 50, 28 52 C32 50, 34 46, 34 40 C34 36, 33 33, 32 30 C31 26, 29 22, 28 18 Z"
                                        fill="#fff"
                                    />
                                </Svg>
                            </View>
                            <Text style={styles.streakDays}>{user.streak} Days</Text>
                            <Text style={styles.streakLabel}>App streak</Text>
                        </View>
                        <View style={styles.healthScoreContainer}>
                            <Text style={styles.healthScore}>{user.healthScore}</Text>
                            <Text style={styles.healthLabel}>Health Score</Text>
                            <View style={styles.progressBar}>
                                <View style={styles.progressFill} />
                            </View>
                            <View style={styles.weekDays}>
                                {weekDays.map((day, index) => (
                                    <View key={day} style={styles.dayItem}>
                                        <View
                                            style={[
                                                styles.dayCheck,
                                                completedDays[index] && styles.dayCheckCompleted,
                                            ]}
                                        >
                                            {completedDays[index] && (
                                                <Text style={styles.checkmark}>✓</Text>
                                            )}
                                        </View>
                                        <Text style={styles.dayLabel}>{day}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                {/* More Button */}
                <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreText}>More</Text>
                    <Text style={styles.moreArrow}>›</Text>
                </TouchableOpacity>

                {/* Trophies Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Trophy Cases</Text>
                        <Text style={styles.sectionValue}>16</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.trophiesContainer}
                    >
                        {trophies.map((trophy) => (
                            <View key={trophy.id} style={styles.trophyItem}>
                                <View style={styles.trophyShield}>
                                    <Svg width="90" height="100" viewBox="0 0 90 100" style={{ position: 'absolute' }}>
                                        <Path
                                            d="M45 5 L80 20 L80 60 C80 75 65 90 45 95 C25 90 10 75 10 60 L10 20 Z"
                                            fill="none"
                                            stroke="#7EE3A0"
                                            strokeWidth="2"
                                        />
                                    </Svg>
                                    <View style={styles.trophyIconContainer}>
                                        {renderTrophyIcon(trophy.type, trophy.count)}
                                    </View>
                                </View>
                                <Text style={styles.trophyLabel}>{trophy.label}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* All Trophies Button */}
                <TouchableOpacity style={styles.allTrophiesButton}>
                    <Text style={styles.allTrophiesText}>All trophies</Text>
                    <Text style={styles.allTrophiesArrow}>›</Text>
                </TouchableOpacity>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreIcon: {
        fontSize: 24,
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 24,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    flag: {
        fontSize: 20,
    },
    followers: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 12,
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    topBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 4,
    },
    topBadgeIcon: {
        fontSize: 14,
    },
    topBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    followBtn: {
        backgroundColor: '#7EE3A0',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 12,
    },
    followingBtn: {
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#7EE3A0',
    },
    followBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    followingBtnText: {
        color: '#7EE3A0',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    shareButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7EE3A0',
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2a2a',
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    sectionValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    streakCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        gap: 20,
    },
    fireIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    fireIconBg: {
        width: 90,
        height: 90,
        borderRadius: 20,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    streakDays: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    streakLabel: {
        fontSize: 12,
        color: '#9ca3af',
    },
    healthScoreContainer: {
        flex: 1,
    },
    healthScore: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    healthLabel: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressFill: {
        width: '60%',
        height: '100%',
        backgroundColor: '#7EE3A0',
        borderRadius: 4,
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayItem: {
        alignItems: 'center',
        gap: 4,
    },
    dayCheck: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCheckCompleted: {
        backgroundColor: '#7EE3A0',
    },
    checkmark: {
        color: '#0a0a0a',
        fontSize: 12,
        fontWeight: 'bold',
    },
    dayLabel: {
        fontSize: 9,
        color: '#9ca3af',
    },
    moreButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    moreText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    moreArrow: {
        fontSize: 24,
        color: '#fff',
    },
    trophiesContainer: {
        flexDirection: 'row',
        gap: 20,
        paddingRight: 24,
    },
    trophyItem: {
        alignItems: 'center',
    },
    trophyShield: {
        width: 90,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    trophyIconContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trophyCountText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    trophyLabel: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
    },
    allTrophiesButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    allTrophiesText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    allTrophiesArrow: {
        fontSize: 24,
        color: '#fff',
    },
});

export default UserProfileScreen;

