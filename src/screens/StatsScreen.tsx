import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Polyline } from 'react-native-svg';
import randomDataService from '../services/randomDataService';

const StatsScreen = ({ navigation }: any) => {
    const [healthScore, setHealthScore] = useState(7820);
    const [streak, setStreak] = useState(23);
    const [metrics, setMetrics] = useState<any[]>([]);
    const [journalImpacts, setJournalImpacts] = useState<any[]>([]);
    const [followingUsers, setFollowingUsers] = useState<any[]>([]);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedDays = [true, true, true, false, false, false, false];

    // Load random data on mount
    useEffect(() => {
        setHealthScore(randomDataService.getHealthScore());
        setStreak(randomDataService.getStreak());
        setMetrics(randomDataService.getMetrics());
        setJournalImpacts(randomDataService.getJournalImpacts());
        setFollowingUsers(randomDataService.getFollowingUsers());
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menuButton}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => navigation.navigate('Search')}
                        >
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </Svg>
                        </TouchableOpacity>
                        <View style={styles.avatarButton} />
                    </View>
                </View>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingTitle}>Hello Peter</Text>
                    <Text style={styles.greetingSubtitle}>
                        Welcome back to your home
                    </Text>
                </View>

                {/* Following Section */}
                <View style={styles.followingSection}>
                    <View style={styles.followingHeader}>
                        <Text style={styles.followingTitle}>Following</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.followingList}
                    >
                        {/* Add Button */}
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('Search')}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>

                        {/* Following Users */}
                        {followingUsers.map((user) => (
                            <TouchableOpacity
                                key={user.id}
                                style={styles.followingAvatar}
                                onPress={() => navigation.navigate('UserProfile', { user })}
                            >
                                <View style={[styles.avatarCircle, { backgroundColor: user.avatarColor }]} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Current Streak */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Streak</Text>
                    <View style={styles.streakCard}>
                        <View style={styles.streakLeft}>
                            <View style={styles.fireIcon}>
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
                            <Text style={styles.streakDays}>{streak} Days</Text>
                            <Text style={styles.streakLabel}>App streak</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.streakRight}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('HealthScoreDetail', { score: healthScore })}
                        >
                            <View style={styles.healthScoreHeader}>
                                <Text style={styles.healthScore}>{healthScore}</Text>
                                <View style={styles.tapIndicator}>
                                    <Text style={styles.tapIndicatorText}>Tap</Text>
                                </View>
                            </View>
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
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Charts */}
                <View style={styles.section}>
                    <View style={styles.statsHeader}>
                        <Text style={styles.statsHeaderTag}>7-DAY OVERVIEW</Text>
                        <Text style={styles.statsHeaderTitle}>Health Metrics</Text>
                        <Text style={styles.statsHeaderSubtitle}>
                            Track your health trends over the past week
                        </Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.chartsScroll}
                        snapToInterval={172}
                        decelerationRate="fast"
                    >
                        {metrics.map((metric) => {
                            // Generate random chart points
                            const points = [0, 30, 60, 90, 120, 150].map((x, i) => {
                                const baseY = 100 - (metric.value / (metric.unit === 'steps' ? 150 : 1.2));
                                const y = Math.max(30, Math.min(90, baseY + (Math.random() - 0.5) * 20));
                                return `${x},${y}`;
                            }).join(' ');

                            const pathD = points.split(' ').map((point, i) => {
                                return i === 0 ? `M${point}` : `L${point}`;
                            }).join(' ') + ' L150,120 L0,120 Z';

                            return (
                                <TouchableOpacity
                                    key={metric.id}
                                    style={styles.chartCard}
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate('ChartDetail', {
                                        title: metric.name,
                                        value: metric.value.toString(),
                                        unit: metric.unit
                                    })}
                                >
                                    <Svg width="100%" height="120" viewBox="0 0 150 120">
                                        <Polyline
                                            points={points}
                                            fill="none"
                                            stroke="#7EE3A0"
                                            strokeWidth="3"
                                        />
                                        <Path
                                            d={pathD}
                                            fill="#7EE3A0"
                                            opacity="0.2"
                                        />
                                    </Svg>
                                    <Text style={styles.chartLabel}>{metric.name}</Text>
                                    <Text style={styles.chartValue}>{metric.value} {metric.unit}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.swipeIndicatorBottom}>
                        <Text style={styles.swipeText}>← Swipe for more →</Text>
                    </View>

                    <Text style={styles.statsFooter}>
                        👆 Tap any metric to view detailed charts and history
                    </Text>
                </View>

                {/* Journal Section */}
                <View style={styles.section}>
                    <View style={styles.journalHeader}>
                        <Text style={styles.journalHeaderTag}>REFRESHED DAILY</Text>
                        <Text style={styles.journalHeaderTitle}>Recovery Impact Analysis</Text>
                        <Text style={styles.journalHeaderSubtitle}>
                            Record at least 5 yes's and no's in your journal to see how behaviors impact your Recovery.
                        </Text>
                    </View>

                    {/* Impact Header */}
                    <View style={styles.impactHeader}>
                        <View style={styles.impactLabel}>
                            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                                    fill="#FF6B6B"
                                />
                            </Svg>
                            <Text style={styles.hurtsText}>HURTS</Text>
                        </View>
                        <Text style={styles.impactTitle}>% IMPACT</Text>
                        <View style={styles.impactLabel}>
                            <Text style={styles.helpsText}>HELPS</Text>
                            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                                    fill="#7EE3A0"
                                />
                            </Svg>
                        </View>
                    </View>

                    {/* Journal Impact Items */}
                    <View style={styles.journalItems}>
                        {journalImpacts
                            .sort((a, b) => b.value - a.value) // Sort by value descending
                            .map((impact, index) => {
                                const isPositive = impact.value >= 0;
                                const absValue = Math.abs(impact.value);
                                const percentage = Math.min(50, absValue / 2); // Scale to max 50%

                                return (
                                    <View key={index} style={styles.journalImpactCard}>
                                        <View style={styles.factorRow}>
                                            <Text style={styles.factorName}>{impact.factor.toUpperCase()}</Text>
                                            <Text style={[styles.factorValue, !isPositive && styles.negativeValue]}>
                                                {isPositive ? '+' : ''}{impact.value}%
                                            </Text>
                                        </View>
                                        <View style={styles.sliderTrack}>
                                            {isPositive ? (
                                                <>
                                                    <View style={[styles.sliderFillGray, { width: '50%' }]} />
                                                    <View style={styles.sliderThumb} />
                                                    <View style={[styles.sliderFillGreen, { width: `${percentage}%` }]} />
                                                    <View style={[styles.sliderFillGray, { width: `${50 - percentage}%` }]} />
                                                </>
                                            ) : (
                                                <>
                                                    <View style={[styles.sliderFillGray, { width: `${50 - percentage}%` }]} />
                                                    <View style={[styles.sliderFillRed, { width: `${percentage}%` }]} />
                                                    <View style={styles.sliderThumb} />
                                                    <View style={[styles.sliderFillGray, { width: '50%' }]} />
                                                </>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                    </View>

                    {/* Complete Daily Journal Button */}
                    <TouchableOpacity
                        style={styles.completeJournalButton}
                        onPress={() => navigation.navigate('Journal')}
                    >
                        <Text style={styles.completeJournalText}>Complete Daily Journal</Text>
                    </TouchableOpacity>
                </View>

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    menuButton: {
        width: 28,
        gap: 6,
    },
    menuLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    searchButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7EE3A0',
    },
    greetingSection: {
        paddingHorizontal: 24,
        marginTop: 8,
        marginBottom: 24,
    },
    greetingTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    greetingSubtitle: {
        fontSize: 16,
        color: '#9ca3af',
    },
    followingSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    followingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    followingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    seeAllText: {
        fontSize: 14,
        color: '#7EE3A0',
        fontWeight: '600',
    },
    followingList: {
        gap: 12,
        paddingRight: 20,
    },
    addButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#7EE3A0',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 28,
        color: '#7EE3A0',
        fontWeight: '300',
    },
    followingAvatar: {
        width: 64,
        height: 64,
    },
    avatarCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    avatarWithInitials: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#7EE3A0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    streakCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        gap: 20,
    },
    streakLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    fireIcon: {
        width: 90,
        height: 90,
        borderRadius: 20,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    streakDays: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    streakLabel: {
        fontSize: 12,
        color: '#9ca3af',
    },
    streakRight: {
        flex: 1,
        borderRadius: 12,
        padding: 4,
    },
    healthScoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 4,
    },
    healthScore: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    tapIndicator: {
        backgroundColor: 'rgba(126, 227, 160, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#7EE3A0',
    },
    tapIndicatorText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    healthLabel: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressFill: {
        width: '75%',
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
        gap: 6,
    },
    dayCheck: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCheckCompleted: {
        backgroundColor: '#7EE3A0',
    },
    checkmark: {
        color: '#0a0a0a',
        fontSize: 14,
        fontWeight: 'bold',
    },
    dayLabel: {
        fontSize: 10,
        color: '#9ca3af',
    },
    statsHeader: {
        marginBottom: 20,
    },
    statsHeaderTag: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
        marginBottom: 12,
    },
    statsHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    statsHeaderSubtitle: {
        fontSize: 13,
        color: '#9ca3af',
        lineHeight: 18,
    },
    swipeIndicatorBottom: {
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 8,
    },
    swipeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    chartsScroll: {
        paddingRight: 24,
        gap: 12,
    },
    chartCard: {
        width: 160,
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 16,
        paddingTop: 20,
    },
    chartLabel: {
        fontSize: 13,
        color: '#9ca3af',
        marginTop: 12,
        fontWeight: '600',
    },
    chartValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 4,
    },
    statsFooter: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
        fontStyle: 'italic',
    },
    journalHeader: {
        marginBottom: 20,
    },
    journalHeaderTag: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
        marginBottom: 12,
    },
    journalHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    journalHeaderSubtitle: {
        fontSize: 13,
        color: '#9ca3af',
        lineHeight: 18,
    },
    impactHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    impactLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    hurtsText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FF6B6B',
        letterSpacing: 0.5,
    },
    impactTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#9ca3af',
        letterSpacing: 0.5,
    },
    helpsText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#7EE3A0',
        letterSpacing: 0.5,
    },
    journalItems: {
        gap: 12,
        marginBottom: 20,
    },
    journalImpactCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
    },
    factorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    factorName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 0.5,
    },
    factorValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    negativeValue: {
        color: '#FF6B6B',
    },
    sliderTrack: {
        height: 12,
        backgroundColor: 'transparent',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    sliderFillGray: {
        height: 12,
        backgroundColor: '#2a2a2a',
    },
    sliderFillGreen: {
        height: 12,
        backgroundColor: '#7EE3A0',
    },
    sliderFillRed: {
        height: 12,
        backgroundColor: '#FF6B6B',
    },
    sliderThumb: {
        width: 4,
        height: 12,
        backgroundColor: '#0a0a0a',
    },
    completeJournalButton: {
        backgroundColor: '#7EE3A0',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    completeJournalText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
});

export default StatsScreen;

