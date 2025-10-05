import React, { useState, useEffect } from 'react';
import randomDataService from '../services/randomDataService';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

type ExperimentStatus = 'not_started' | 'in_progress' | 'completed';
type ExperimentImpact = 'positive' | 'negative' | null;

interface Experiment {
    id: string;
    title: string;
    description: string;
    duration: string;
    category: 'Sleep' | 'Nutrition' | 'Fitness' | 'Wellness' | 'Mindfulness';
    aiPrediction: string;
    confidence: number;
    status: ExperimentStatus;
    impact: ExperimentImpact;
    daysCompleted?: number;
    totalDays: number;
}

const ExperimentsScreen = () => {
    const [experiments, setExperiments] = useState<Experiment[]>([]);

    // Load random experiment data on mount
    useEffect(() => {
        setExperiments(randomDataService.getExperiments() as Experiment[]);
    }, []);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Sleep':
                return (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"
                            fill="#7EE3A0"
                        />
                    </Svg>
                );
            case 'Nutrition':
                return (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"
                            fill="#7EE3A0"
                        />
                    </Svg>
                );
            case 'Fitness':
                return (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
                            fill="#7EE3A0"
                        />
                    </Svg>
                );
            case 'Wellness':
                return (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M4.5 3.88l4.432 4.14-1.364 1.46L3.136 5.34 4.5 3.88zM12 1l1.364 1.46-1.364 1.46-1.364-1.46L12 1zm7.5 2.88L18.136 5.34l-4.432 4.14-1.364-1.46 4.432-4.14zM12 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm-5 3.5h10v3H7v-3z"
                            fill="#7EE3A0"
                        />
                    </Svg>
                );
            case 'Mindfulness':
                return (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Circle cx="12" cy="12" r="3" fill="#7EE3A0" />
                        <Path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            fill="#7EE3A0"
                        />
                    </Svg>
                );
            default:
                return null;
        }
    };

    const handleStartExperiment = (id: string) => {
        setExperiments(prevExperiments =>
            prevExperiments.map(exp =>
                exp.id === id && exp.status === 'not_started'
                    ? { ...exp, status: 'in_progress' as ExperimentStatus, daysCompleted: 0 }
                    : exp
            )
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Experiments</Text>
                <View style={styles.aiExplanationCard}>
                    <View style={styles.aiIconContainer}>
                        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <Path
                                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                                fill="#7EE3A0"
                            />
                        </Svg>
                    </View>
                    <View style={styles.aiTextContainer}>
                        <Text style={styles.aiTitle}>AI-Powered Predictions</Text>
                        <Text style={styles.aiDescription}>
                            These experiments are personalized recommendations based on data from users with similar health profiles and goals.
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {experiments.map((experiment) => (
                    <View
                        key={experiment.id}
                        style={styles.experimentCard}
                    >
                        <View style={styles.cardHeader}>
                            <View style={styles.categoryBadge}>
                                {getCategoryIcon(experiment.category)}
                                <Text style={styles.categoryText}>
                                    {experiment.category}
                                </Text>
                            </View>
                            <View style={styles.confidenceBadge}>
                                <Text style={styles.confidenceText}>{experiment.confidence}% match</Text>
                            </View>
                        </View>

                        <Text style={styles.experimentTitle}>
                            {experiment.title}
                        </Text>
                        <Text style={styles.experimentDescription}>
                            {experiment.description}
                        </Text>

                        {/* AI Prediction */}
                        <View style={styles.predictionContainer}>
                            <Text style={styles.predictionLabel}>Predicted Impact</Text>
                            <Text style={styles.predictionValue}>{experiment.aiPrediction}</Text>
                        </View>

                        {/* Progress Bar for In Progress */}
                        {experiment.status === 'in_progress' && (
                            <View style={styles.progressSection}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressText}>
                                        Day {experiment.daysCompleted} of {experiment.totalDays}
                                    </Text>
                                    <Text style={styles.progressPercentage}>
                                        {Math.round(((experiment.daysCompleted || 0) / experiment.totalDays) * 100)}%
                                    </Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${((experiment.daysCompleted || 0) / experiment.totalDays) * 100}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.journalNote}>Questions added to your daily journal</Text>
                            </View>
                        )}

                        {/* Impact Result for Completed */}
                        {experiment.status === 'completed' && experiment.impact && (
                            <View style={[
                                styles.impactContainer,
                                experiment.impact === 'positive' ? styles.impactPositive : styles.impactNegative
                            ]}>
                                <View style={styles.impactHeader}>
                                    {experiment.impact === 'positive' ? (
                                        <Svg width="20" height="20" viewBox="0 0 24 24">
                                            <Path d="M7 14l5-5 5 5H7z" fill="#7EE3A0" />
                                        </Svg>
                                    ) : (
                                        <Svg width="20" height="20" viewBox="0 0 24 24">
                                            <Path d="M7 10l5 5 5-5H7z" fill="#E8A87C" />
                                        </Svg>
                                    )}
                                    <Text style={[
                                        styles.impactText,
                                        experiment.impact === 'positive' ? styles.impactTextPositive : styles.impactTextNegative
                                    ]}>
                                        {experiment.impact === 'positive' ? 'Positive Impact' : 'Negative Impact'}
                                    </Text>
                                </View>
                                <Text style={styles.impactDescription}>
                                    {experiment.impact === 'positive'
                                        ? 'This experiment improved your health metrics'
                                        : 'This experiment did not improve your health metrics'}
                                </Text>
                            </View>
                        )}

                        {/* Action Button */}
                        <View style={styles.cardFooter}>
                            <View style={styles.durationContainer}>
                                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <Circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2" />
                                    <Path d="M12 6v6l4 2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                                </Svg>
                                <Text style={styles.durationText}>
                                    {experiment.duration}
                                </Text>
                            </View>
                            {experiment.status === 'not_started' && (
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={() => handleStartExperiment(experiment.id)}
                                >
                                    <Text style={styles.startButtonText}>
                                        Start Experiment
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {experiment.status === 'in_progress' && (
                                <View style={styles.inProgressBadge}>
                                    <Text style={styles.inProgressText}>In Progress</Text>
                                </View>
                            )}
                            {experiment.status === 'completed' && (
                                <View style={styles.completedBadge}>
                                    <Text style={styles.completedText}>Completed</Text>
                                </View>
                            )}
                        </View>
                    </View>
                ))}

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
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    aiExplanationCard: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        gap: 12,
    },
    aiIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(126, 227, 160, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aiTextContainer: {
        flex: 1,
    },
    aiTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7EE3A0',
        marginBottom: 4,
    },
    aiDescription: {
        fontSize: 13,
        color: '#9ca3af',
        lineHeight: 18,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    experimentCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    confidenceBadge: {
        backgroundColor: 'rgba(126, 227, 160, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    confidenceText: {
        color: '#7EE3A0',
        fontSize: 11,
        fontWeight: 'bold',
    },
    experimentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    experimentDescription: {
        fontSize: 14,
        color: '#9ca3af',
        lineHeight: 20,
        marginBottom: 16,
    },
    predictionContainer: {
        backgroundColor: '#0a0a0a',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    predictionLabel: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    predictionValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    progressSection: {
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: 13,
        color: '#7EE3A0',
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#7EE3A0',
        borderRadius: 4,
    },
    journalNote: {
        fontSize: 12,
        color: '#9ca3af',
        fontStyle: 'italic',
    },
    impactContainer: {
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    impactPositive: {
        backgroundColor: 'rgba(126, 227, 160, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(126, 227, 160, 0.3)',
    },
    impactNegative: {
        backgroundColor: 'rgba(232, 168, 124, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(232, 168, 124, 0.3)',
    },
    impactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    impactText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    impactTextPositive: {
        color: '#7EE3A0',
    },
    impactTextNegative: {
        color: '#E8A87C',
    },
    impactDescription: {
        fontSize: 13,
        color: '#9ca3af',
        lineHeight: 18,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    durationText: {
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: '600',
    },
    startButton: {
        backgroundColor: '#7EE3A0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    startButtonText: {
        color: '#0a0a0a',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inProgressBadge: {
        backgroundColor: 'rgba(107, 197, 232, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    inProgressText: {
        color: '#6BC5E8',
        fontSize: 14,
        fontWeight: 'bold',
    },
    completedBadge: {
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    completedText: {
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ExperimentsScreen;

