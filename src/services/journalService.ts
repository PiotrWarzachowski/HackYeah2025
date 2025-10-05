// Simple in-memory store for journal questions
// In production, this should use AsyncStorage or a state management solution

interface JournalQuestion {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    isActive: boolean;
}

class JournalService {
    private questions: JournalQuestion[] = [
        // CIRCADIAN HEALTH
        { id: '1', title: 'Acupuncture', subtitle: 'Receive acupuncture therapy?', category: 'CIRCADIAN HEALTH', isActive: false },
        { id: '2', title: 'Added Sugar', subtitle: 'Consume added sugar?', category: 'CIRCADIAN HEALTH', isActive: true },
        { id: '6', title: 'Artificial Light', subtitle: 'See artificial light upon waking up?', category: 'CIRCADIAN HEALTH', isActive: false },
        { id: '9', title: 'Blue-Light Blocking Glasses', subtitle: 'Wear blue-light blocking glasses before bed', category: 'CIRCADIAN HEALTH', isActive: true },
        { id: '12', title: 'Device in Bed', subtitle: 'View a screened device while in bed?', category: 'CIRCADIAN HEALTH', isActive: true },
        { id: '13', title: 'Eat in Bedroom', subtitle: 'Consume food in bedroom?', category: 'CIRCADIAN HEALTH', isActive: false },
        { id: '18', title: 'Read in Bed', subtitle: 'Read (physical book) in bed?', category: 'CIRCADIAN HEALTH', isActive: false },
        { id: '19', title: 'Sleep Performance', subtitle: 'Achieve 81%+ sleep performance?', category: 'CIRCADIAN HEALTH', isActive: true },
        
        // HEALTH STATUS
        { id: '3', title: 'AD(H)D Medication', subtitle: 'Take AD(H)D medication?', category: 'HEALTH STATUS', isActive: false },
        { id: '5', title: 'Anti-anxiety Medication', subtitle: 'Take anti-anxiety medication?', category: 'HEALTH STATUS', isActive: false },
        { id: '7', title: 'Bloating', subtitle: 'Experience bloating?', category: 'HEALTH STATUS', isActive: true },
        { id: '8', title: 'Blood Pressure Medication', subtitle: 'Take blood pressure medication?', category: 'HEALTH STATUS', isActive: false },
        
        // LIFESTYLE
        { id: '4', title: 'Alcohol', subtitle: 'Have any alcoholic drinks?', category: 'LIFESTYLE', isActive: false },
        { id: '11', title: 'Cold Shower', subtitle: 'Take a cold shower?', category: 'LIFESTYLE', isActive: false },
        { id: '14', title: 'Exercise', subtitle: 'Work out or exercise?', category: 'LIFESTYLE', isActive: false },
        { id: '20', title: 'Tobacco', subtitle: 'Use tobacco of any form?', category: 'LIFESTYLE', isActive: false },
        { id: '21', title: 'Work Late', subtitle: 'Work after 8 PM?', category: 'LIFESTYLE', isActive: false },
        
        // DIET
        { id: '10', title: 'Caffeine', subtitle: 'Have any caffeine?', category: 'DIET', isActive: true },
        { id: '16', title: 'Hydration', subtitle: 'Hydrate sufficiently?', category: 'DIET', isActive: true },
        
        // MENTAL HEALTH
        { id: '15', title: 'Feel Stressed', subtitle: 'Experience any stress?', category: 'MENTAL HEALTH', isActive: true },
        { id: '17', title: 'Meditation', subtitle: 'Meditate today?', category: 'MENTAL HEALTH', isActive: false },
    ];

    private listeners: Array<() => void> = [];

    getAllQuestions(): JournalQuestion[] {
        return this.questions;
    }

    getActiveQuestions(): JournalQuestion[] {
        return this.questions.filter(q => q.isActive);
    }

    toggleQuestion(id: string): void {
        const question = this.questions.find(q => q.id === id);
        if (question) {
            question.isActive = !question.isActive;
            this.notifyListeners();
        }
    }

    subscribe(listener: () => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }
}

export const journalService = new JournalService();

