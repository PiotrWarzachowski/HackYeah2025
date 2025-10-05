import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import randomDataService from '../services/randomDataService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HealthScoreDetailScreenProps {
    route: {
        params: {
            score: number;
        };
    };
    navigation: any;
}

const HealthScoreDetailScreen: React.FC<HealthScoreDetailScreenProps> = ({ route, navigation }) => {
    const { score } = route.params;
    const [factorItems, setFactorItems] = useState<any[]>([]);

    // Load random factor data on mount
    useEffect(() => {
        setFactorItems(randomDataService.getHealthFactors());
    }, []);

    // Determine status based on score
    const getStatus = () => {
        if (score >= 8000) return 'Elite';
        if (score >= 6000) return 'Advanced';
        if (score >= 4000) return 'Intermediate';
        if (score >= 2000) return 'Beginner';
        return 'Starting';
    };

    const getStatusColor = () => {
        if (score >= 8000) return '#7EE3A0';
        if (score >= 6000) return '#6BC5E8';
        if (score >= 4000) return '#E8C87C';
        if (score >= 2000) return '#E8A87C';
        return '#9ca3af';
    };

    const status = getStatus();
    const statusColor = getStatusColor();

    const improvementTips = [
        {
            title: 'Optimize Your Sleep',
            description: 'Aim for 7-9 hours of quality sleep. Maintain a consistent sleep schedule and avoid screens 1 hour before bed.',
            impact: 'High',
        },
        {
            title: 'Interval Training Weekly',
            description: 'Training with intervals once a week can significantly boost your endurance score and overall fitness.',
            impact: 'High',
        },
        {
            title: 'Monitor Recovery',
            description: 'Take rest days seriously. Your body needs time to adapt and grow stronger between workouts.',
            impact: 'Medium',
        },
        {
            title: 'Stay Hydrated',
            description: 'Proper hydration supports heart rate variability and overall cardiovascular function.',
            impact: 'Medium',
        },
        {
            title: 'Reduce Stress',
            description: 'Practice mindfulness, meditation, or breathing exercises to lower daily stress levels.',
            impact: 'Medium',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Your Score</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Hero Score Display */}
                <View style={styles.scoreHeroContainer}>
                    {/* Animated background rays */}
                    <View style={styles.raysContainer}>
                        {[...Array(8)].map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.ray,
                                    {
                                        transform: [{ rotate: `${i * 45}deg` }],
                                        opacity: 0.03,
                                    },
                                ]}
                            />
                        ))}
                    </View>

                    {/* Floating particles */}
                    <View style={styles.particlesContainer}>
                        <View style={[styles.particle, { top: 20, left: 30, width: 4, height: 4 }]} />
                        <View style={[styles.particle, { top: 60, right: 40, width: 6, height: 6 }]} />
                        <View style={[styles.particle, { bottom: 80, left: 50, width: 3, height: 3 }]} />
                        <View style={[styles.particle, { top: 100, right: 60, width: 5, height: 5 }]} />
                        <View style={[styles.particle, { bottom: 40, right: 30, width: 4, height: 4 }]} />
                    </View>

                    {/* Main score card */}
                    <View style={styles.scoreMainCard}>
                        {/* Glow effects */}
                        <View style={[styles.glowTop, { backgroundColor: statusColor }]} />
                        <View style={[styles.glowBottom, { backgroundColor: statusColor }]} />

                        <Text style={styles.scoreLabel}>YOUR HEALTH SCORE</Text>

                        {/* Massive score display */}
                        <View style={styles.scoreDisplay}>
                            <Text style={styles.scoreValueLarge}>{score.toLocaleString()}</Text>
                            <View style={styles.scoreUnderline} />
                        </View>

                        {/* Status badge */}
                        <View style={[styles.statusBadgeLarge, { backgroundColor: statusColor + '20' }]}>
                            <View style={[styles.statusDotLarge, { backgroundColor: statusColor }]} />
                            <Text style={[styles.statusTextLarge, { color: statusColor }]}>{status} Status</Text>
                        </View>

                        {/* Score tier indicator */}
                        <View style={styles.tierContainer}>
                            <View style={styles.tierRow}>
                                <Text style={styles.tierLabel}>Level</Text>
                                <Text style={[styles.tierValue, { color: statusColor }]}>{Math.floor(score / 1000)}</Text>
                            </View>
                            <View style={styles.tierProgressContainer}>
                                <View style={styles.tierProgressTrack}>
                                    <View
                                        style={[
                                            styles.tierProgressFill,
                                            {
                                                width: `${((score % 1000) / 1000) * 100}%`,
                                                backgroundColor: statusColor
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.tierProgressText}>
                                    {score % 1000} / 1000 to Level {Math.floor(score / 1000) + 1}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Quick stats cards */}
                    <View style={styles.quickStatsRow}>
                        <View style={styles.quickStatCard}>
                            <Text style={styles.quickStatValue}>Top 15%</Text>
                            <Text style={styles.quickStatLabel}>Ranking</Text>
                        </View>
                        <View style={styles.quickStatCard}>
                            <Text style={styles.quickStatValue}>+142</Text>
                            <Text style={styles.quickStatLabel}>This Week</Text>
                        </View>
                        <View style={styles.quickStatCard}>
                            <Text style={styles.quickStatValue}>23</Text>
                            <Text style={styles.quickStatLabel}>Day Streak</Text>
                        </View>
                    </View>
                </View>

                {/* Achievement Card */}
                <View style={styles.congratsCard}>
                    <Text style={styles.congratsTitle}>Outstanding Progress!</Text>
                    <Text style={styles.congratsText}>
                        You're outperforming 85% of users with similar goals. Your consistency is paying off—keep building those healthy habits!
                    </Text>
                    <View style={styles.percentileBar}>
                        <View style={styles.percentileFill} />
                        <View style={styles.percentileMarker}>
                            <Text style={styles.percentileText}>You</Text>
                        </View>
                    </View>
                </View>

                {/* How It's Calculated */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTag}>METHODOLOGY</Text>
                        <Text style={styles.sectionTitle}>How Your Score is Calculated</Text>
                        <Text style={styles.sectionSubtitle}>
                            Your health score is a comprehensive metric based on multiple factors from your daily activities and biometrics.
                        </Text>
                    </View>

                    <View style={styles.factorsList}>
                        {factorItems.map((factor, index) => (
                            <View key={index} style={styles.factorCard}>
                                <View style={styles.factorHeader}>
                                    <Text style={styles.factorName}>{factor.name}</Text>
                                    <Text style={styles.factorContribution}>{factor.contribution}%</Text>
                                </View>
                                <View style={styles.factorDetails}>
                                    <Text style={styles.factorCurrent}>
                                        Current: <Text style={styles.factorValue}>{factor.current}</Text>
                                    </Text>
                                    <Text style={styles.factorOptimal}>Optimal: {factor.optimal}</Text>
                                </View>
                                {/* Progress bar */}
                                <View style={styles.factorProgress}>
                                    <View style={[styles.factorProgressFill, { width: `${factor.contribution}%` }]} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Improvement Tips */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTag}>RECOMMENDATIONS</Text>
                        <Text style={styles.sectionTitle}>How to Improve</Text>
                        <Text style={styles.sectionSubtitle}>
                            Actionable steps to boost your health score and overall wellness.
                        </Text>
                    </View>

                    <View style={styles.tipsList}>
                        {improvementTips.map((tip, index) => (
                            <View key={index} style={styles.tipCard}>
                                <View style={styles.tipHeader}>
                                    <Text style={styles.tipTitle}>{tip.title}</Text>
                                    <View style={[
                                        styles.impactBadge,
                                        tip.impact === 'High' ? styles.impactHigh : styles.impactMedium
                                    ]}>
                                        <Text style={styles.impactText}>{tip.impact}</Text>
                                    </View>
                                </View>
                                <Text style={styles.tipDescription}>{tip.description}</Text>
                            </View>
                        ))}
                    </View>
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
    scrollContent: {
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    scoreHeroContainer: {
        marginBottom: 30,
        position: 'relative',
        minHeight: 400,
    },
    raysContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ray: {
        position: 'absolute',
        width: 2,
        height: '100%',
        backgroundColor: '#7EE3A0',
    },
    particlesContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    particle: {
        position: 'absolute',
        backgroundColor: '#7EE3A0',
        borderRadius: 10,
        opacity: 0.4,
    },
    scoreMainCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 24,
        padding: 32,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 16,
    },
    glowTop: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.1,
    },
    glowBottom: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.1,
    },
    scoreLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 2,
        marginBottom: 16,
    },
    scoreDisplay: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreValueLarge: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: -2,
    },
    scoreUnderline: {
        width: 60,
        height: 4,
        backgroundColor: '#7EE3A0',
        borderRadius: 2,
        marginTop: 8,
    },
    statusBadgeLarge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 16,
        marginBottom: 24,
    },
    statusDotLarge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    statusTextLarge: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    tierContainer: {
        width: '100%',
        backgroundColor: '#0a0a0a',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    tierRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tierLabel: {
        fontSize: 13,
        color: '#9ca3af',
        fontWeight: '600',
    },
    tierValue: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    tierProgressContainer: {
        gap: 8,
    },
    tierProgressTrack: {
        height: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        overflow: 'hidden',
    },
    tierProgressFill: {
        height: '100%',
        borderRadius: 4,
    },
    tierProgressText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    quickStatsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    quickStatCard: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickStatValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 6,
        textAlign: 'center',
    },
    quickStatLabel: {
        fontSize: 11,
        color: '#9ca3af',
        textAlign: 'center',
    },
    congratsCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    congratsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    congratsText: {
        fontSize: 15,
        color: '#9ca3af',
        lineHeight: 22,
        marginBottom: 20,
    },
    percentileBar: {
        height: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        position: 'relative',
        overflow: 'visible',
    },
    percentileFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '85%',
        backgroundColor: '#7EE3A0',
        borderRadius: 4,
    },
    percentileMarker: {
        position: 'absolute',
        left: '85%',
        top: -18,
        transform: [{ translateX: -20 }],
        backgroundColor: '#7EE3A0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    percentileText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        marginBottom: 20,
    },
    sectionTag: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 20,
    },
    factorsList: {
        gap: 12,
    },
    factorCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    factorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    factorName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    factorContribution: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    factorDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    factorCurrent: {
        fontSize: 13,
        color: '#9ca3af',
    },
    factorValue: {
        color: '#fff',
        fontWeight: '600',
    },
    factorOptimal: {
        fontSize: 13,
        color: '#666',
    },
    factorProgress: {
        height: 6,
        backgroundColor: '#2a2a2a',
        borderRadius: 3,
        overflow: 'hidden',
    },
    factorProgressFill: {
        height: '100%',
        backgroundColor: '#7EE3A0',
        borderRadius: 3,
    },
    tipsList: {
        gap: 12,
    },
    tipCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    tipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        marginRight: 12,
    },
    impactBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    impactHigh: {
        backgroundColor: 'rgba(126, 227, 160, 0.2)',
    },
    impactMedium: {
        backgroundColor: 'rgba(232, 200, 124, 0.2)',
    },
    impactText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    tipDescription: {
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 20,
    },
});

export default HealthScoreDetailScreen;

