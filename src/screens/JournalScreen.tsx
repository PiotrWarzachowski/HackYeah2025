import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalService } from '../services/journalService';

interface Question {
    id: string;
    text: string;
    category: string;
    answer: boolean | null;
}

const JournalScreen = ({ navigation }: any) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Load active questions from service
        const activeQuestions = journalService.getActiveQuestions();
        const formattedQuestions: Question[] = activeQuestions.map(q => ({
            id: q.id,
            text: q.subtitle,
            category: q.category,
            answer: null,
        }));
        setQuestions(formattedQuestions);

        // Subscribe to changes
        const unsubscribe = journalService.subscribe(() => {
            const updatedQuestions = journalService.getActiveQuestions();
            const formatted: Question[] = updatedQuestions.map(q => ({
                id: q.id,
                text: q.subtitle,
                category: q.category,
                answer: null,
            }));
            setQuestions(formatted);
        });

        return unsubscribe;
    }, []);

    const handleAnswer = (id: string, answer: boolean) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, answer } : q))
        );
    };

    const handleConfirm = () => {
        // Save journal entry
        const unanswered = questions.filter((q) => q.answer === null).length;
        if (unanswered > 0) {
            // Could show alert here
            console.log('Please answer all questions');
        } else {
            console.log('Journal saved:', questions);
            setIsCompleted(true);
            // Navigate back after a short delay
            setTimeout(() => {
                if (navigation) {
                    navigation.goBack();
                }
            }, 1500);
        }
    };

    const allAnswered = questions.every((q) => q.answer !== null);

    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.category]) {
            acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
    }, {} as Record<string, Question[]>);

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
                <Text style={styles.title}>Journal</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.mainQuestion}>What happened yesterday?</Text>

                {questions.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No questions in your journal</Text>
                        <Text style={styles.emptySubtext}>
                            Go to Daily Check to add questions
                        </Text>
                    </View>
                ) : null}

                {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
                    <View key={category} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <View style={styles.divider} />

                        {categoryQuestions.map((question) => (
                            <View key={question.id} style={styles.questionRow}>
                                <Text style={styles.questionText}>{question.text}</Text>
                                <View style={styles.answerButtons}>
                                    <TouchableOpacity
                                        style={[
                                            styles.answerButton,
                                            question.answer === true && styles.answerButtonYes,
                                        ]}
                                        onPress={() => handleAnswer(question.id, true)}
                                    >
                                        <Text
                                            style={[
                                                styles.answerIcon,
                                                question.answer === true &&
                                                styles.answerIconSelected,
                                            ]}
                                        >
                                            ✓
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.answerButton,
                                            question.answer === false && styles.answerButtonNo,
                                        ]}
                                        onPress={() => handleAnswer(question.id, false)}
                                    >
                                        <Text
                                            style={[
                                                styles.answerIcon,
                                                question.answer === false &&
                                                styles.answerIconSelected,
                                            ]}
                                        >
                                            ✕
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !allAnswered && styles.confirmButtonDisabled,
                        isCompleted && styles.confirmButtonCompleted,
                    ]}
                    onPress={handleConfirm}
                    disabled={!allAnswered || isCompleted}
                >
                    <Text style={styles.confirmButtonText}>
                        {isCompleted ? '✓ Journal Completed!' : 'Confirm'}
                    </Text>
                </TouchableOpacity>

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
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    mainQuestion: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 32,
    },
    categorySection: {
        marginBottom: 32,
    },
    categoryTitle: {
        fontSize: 16,
        color: '#9ca3af',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2a2a',
        marginBottom: 16,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        marginRight: 16,
    },
    answerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    answerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4a4a4a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerButtonYes: {
        backgroundColor: '#7EE3A0',
    },
    answerButtonNo: {
        backgroundColor: '#fff',
    },
    answerIcon: {
        fontSize: 18,
        color: '#9ca3af',
        fontWeight: 'bold',
    },
    answerIconSelected: {
        color: '#0a0a0a',
    },
    confirmButton: {
        backgroundColor: '#7EE3A0',
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: 'center',
        marginTop: 16,
    },
    confirmButtonDisabled: {
        backgroundColor: '#4a4a4a',
        opacity: 0.5,
    },
    confirmButtonCompleted: {
        backgroundColor: '#7EE3A0',
        opacity: 1,
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0a0a0a',
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

export default JournalScreen;

