import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { journalService } from '../services/journalService';

const JournalCustomizeScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('ALL');
    const [questions, setQuestions] = useState(journalService.getAllQuestions());

    useEffect(() => {
        // Subscribe to changes
        const unsubscribe = journalService.subscribe(() => {
            setQuestions([...journalService.getAllQuestions()]);
        });

        return unsubscribe;
    }, []);

    const tabs = ['ALL', 'CIRCADIAN HEALTH', 'HEALTH STATUS', 'LIFESTYLE', 'DIET', 'MENTAL HEALTH'];

    const toggleQuestion = (id: string) => {
        journalService.toggleQuestion(id);
    };

    const filteredQuestions = questions.filter((q) => {
        const matchesSearch =
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = selectedTab === 'ALL' || q.category === selectedTab;
        return matchesSearch && matchesTab;
    });

    const activeCount = questions.filter((q) => q.isActive).length;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.title}>CUSTOMIZE JOURNAL</Text>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.doneIcon}>✓</Text>
                </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Select questions to add or remove from your daily journal.
                </Text>
            </View>

            {/* Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabsContainer}
                contentContainerStyle={styles.tabsContent}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.tabActive]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                        {selectedTab === tab && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
                    <Path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                </Svg>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search questions..."
                    placeholderTextColor="#9ca3af"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Active Count */}
            <View style={styles.countContainer}>
                <Text style={styles.countText}>
                    {activeCount} questions active in your journal
                </Text>
            </View>

            {/* Questions List */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {filteredQuestions.map((question) => (
                    <View key={question.id} style={styles.questionCard}>
                        <View style={styles.questionInfo}>
                            <Text style={styles.questionTitle}>{question.title}</Text>
                            <Text style={styles.questionSubtitle}>{question.subtitle}</Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                question.isActive && styles.toggleButtonActive,
                            ]}
                            onPress={() => toggleQuestion(question.id)}
                        >
                            {question.isActive ? (
                                <Text style={styles.toggleIconActive}>✓</Text>
                            ) : (
                                <Text style={styles.toggleIcon}>+</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ))}

                {filteredQuestions.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No questions found</Text>
                        <Text style={styles.emptySubtext}>Try a different search or category</Text>
                    </View>
                )}

                <View style={{ height: 120 }} />
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
    closeButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '300',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
    },
    doneButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneIcon: {
        fontSize: 24,
        color: '#7EE3A0',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 12,
    },
    descriptionText: {
        fontSize: 13,
        color: '#9ca3af',
        lineHeight: 18,
    },
    tabsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
        marginTop: 4,
        marginBottom: 0,
        paddingBottom: 0,
        maxHeight: 45,
    },
    tabsContent: {
        paddingHorizontal: 24,
        paddingVertical: 0,
        gap: 24,
    },
    tab: {
        paddingTop: 12,
        paddingBottom: 10,
        position: 'relative',
    },
    tabActive: {},
    tabText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#fff',
    },
    tabUnderline: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 24,
        marginTop: 12,
        marginBottom: 0,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    countContainer: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    countText: {
        fontSize: 14,
        color: '#7EE3A0',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    questionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    questionInfo: {
        flex: 1,
        marginRight: 16,
    },
    questionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    questionSubtitle: {
        fontSize: 13,
        color: '#9ca3af',
    },
    toggleButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    toggleButtonActive: {
        backgroundColor: '#7EE3A0',
        borderColor: '#7EE3A0',
    },
    toggleIcon: {
        fontSize: 24,
        color: '#666',
        fontWeight: '300',
    },
    toggleIconActive: {
        fontSize: 20,
        color: '#0a0a0a',
        fontWeight: 'bold',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
    },
});

export default JournalCustomizeScreen;

