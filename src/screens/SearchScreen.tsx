import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

interface User {
    id: string;
    name: string;
    username: string;
    location: string;
    avatarColor: string;
    isFollowing: boolean;
    followers: number;
    following: number;
    streak: number;
    healthScore: number;
}

const SearchScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'Jan Burdzicki',
            username: '@janb',
            location: 'el Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#6B9FE8',
            isFollowing: false,
            followers: 1240,
            following: 345,
            streak: 167,
            healthScore: 8234,
        },
        {
            id: '2',
            name: 'Paul Kojma',
            username: '@paulk',
            location: 'Wu Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#7EE3A0',
            isFollowing: false,
            followers: 890,
            following: 234,
            streak: 124,
            healthScore: 7890,
        },
        {
            id: '3',
            name: 'Peter Zielynsky',
            username: '@peterz',
            location: 'el Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#E89FE8',
            isFollowing: false,
            followers: 2340,
            following: 567,
            streak: 203,
            healthScore: 9123,
        },
        {
            id: '4',
            name: 'Greg Coderycky',
            username: '@gregc',
            location: 'el Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#E8D89F',
            isFollowing: false,
            followers: 567,
            following: 123,
            streak: 89,
            healthScore: 7234,
        },
        {
            id: '5',
            name: 'Wojtek Sunflower',
            username: '@wojteks',
            location: 'el Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#C8E89F',
            isFollowing: false,
            followers: 1890,
            following: 456,
            streak: 178,
            healthScore: 8456,
        },
        {
            id: '6',
            name: 'Pete Achtung',
            username: '@petea',
            location: 'el Master, Wrocław, Dolnośląskie, Poland',
            avatarColor: '#E89F9F',
            isFollowing: false,
            followers: 934,
            following: 189,
            streak: 145,
            healthScore: 7678,
        },
    ]);

    const toggleFollow = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
            )
        );
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
                <Text style={styles.title}>Search</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </Svg>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for people"
                    placeholderTextColor="#9ca3af"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Users List */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {users
                    .filter((user) =>
                        user.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((user) => (
                        <TouchableOpacity
                            key={user.id}
                            style={styles.userItem}
                            onPress={() => navigation.navigate('UserProfile', { user })}
                        >
                            <View
                                style={[
                                    styles.avatar,
                                    { backgroundColor: user.avatarColor },
                                ]}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userLocation}>{user.location}</Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.followButton,
                                    user.isFollowing && styles.followingButton,
                                ]}
                                onPress={() => toggleFollow(user.id)}
                            >
                                <Text
                                    style={[
                                        styles.followButtonText,
                                        user.isFollowing && styles.followingButtonText,
                                    ]}
                                >
                                    {user.isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}

                {/* Share Invite Button */}
                <TouchableOpacity style={styles.shareButton}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 5v14M5 12h14"
                            stroke="#0a0a0a"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <Path
                            d="M12 2L8 6h8l-4-4z"
                            fill="#0a0a0a"
                        />
                    </Svg>
                    <Text style={styles.shareButtonText}>Share invite</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4a4a4a',
        marginHorizontal: 24,
        marginBottom: 24,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 16,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    userLocation: {
        fontSize: 13,
        color: '#9ca3af',
    },
    followButton: {
        backgroundColor: '#7EE3A0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    followingButton: {
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#7EE3A0',
    },
    followButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    followingButtonText: {
        color: '#7EE3A0',
    },
    shareButton: {
        backgroundColor: '#7EE3A0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 18,
        borderRadius: 16,
        marginTop: 24,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
});

export default SearchScreen;

