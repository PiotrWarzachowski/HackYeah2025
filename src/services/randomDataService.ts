// Service to generate random data for the app

export const randomDataService = {
    // Generate random health score between 4000-9500
    getHealthScore: (): number => {
        return Math.floor(Math.random() * (9500 - 4000 + 1)) + 4000;
    },

    // Generate random streak between 5-100
    getStreak: (): number => {
        return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    },

    // Generate random journal impact data
    getJournalImpacts: () => {
        const factors = [
            'Hydration',
            'Sleep Performance',
            'Read in Bed',
            'Device in Bed',
            'Work Late',
            'Caffeine',
            'Eat in Bedroom',
        ];

        return factors.map(factor => ({
            factor,
            value: Math.floor(Math.random() * 201) - 100, // -100 to +100
        }));
    },

    // Generate random chart data for 24 hours
    getChartData: (metricName: string) => {
        const baseValue = Math.random() * 50 + 50; // Base between 50-100
        const data = [];

        for (let hour = 0; hour < 24; hour++) {
            const variation = (Math.random() - 0.5) * 30; // Variation of ±15
            const value = Math.max(0, baseValue + variation);
            data.push({
                time: hour,
                value: Math.round(value * 10) / 10, // Round to 1 decimal
            });
        }

        return data;
    },

    // Generate random metrics
    getMetrics: () => {
        return [
            {
                id: '1',
                name: 'Heart Rate',
                value: Math.floor(Math.random() * (80 - 55 + 1)) + 55,
                unit: 'bpm',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
            {
                id: '2',
                name: 'Sleep Quality',
                value: Math.floor(Math.random() * (100 - 70 + 1)) + 70,
                unit: '%',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
            {
                id: '3',
                name: 'Steps',
                value: Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000,
                unit: 'steps',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
            {
                id: '4',
                name: 'Calories',
                value: Math.floor(Math.random() * (2800 - 1800 + 1)) + 1800,
                unit: 'kcal',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
            {
                id: '5',
                name: 'HRV',
                value: Math.floor(Math.random() * (80 - 40 + 1)) + 40,
                unit: 'ms',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
            {
                id: '6',
                name: 'Recovery',
                value: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
                unit: '%',
                trend: Math.random() > 0.5 ? 'up' : 'down',
            },
        ];
    },

    // Generate random experiment data
    getExperiments: () => {
        const experiments = [
            {
                id: '1',
                title: 'Morning Cold Shower',
                description: 'Start your day with a 2-minute cold shower',
                duration: '7 days',
                category: 'Wellness' as const,
                totalDays: 7,
            },
            {
                id: '2',
                title: 'Intermittent Fasting 16:8',
                description: 'Fast for 16 hours, eat within 8-hour window',
                duration: '14 days',
                category: 'Nutrition' as const,
                totalDays: 14,
            },
            {
                id: '3',
                title: 'Digital Detox Evening',
                description: 'No screens 2 hours before bedtime',
                duration: '10 days',
                category: 'Sleep' as const,
                totalDays: 10,
            },
            {
                id: '4',
                title: '10,000 Steps Daily',
                description: 'Walk at least 10,000 steps every day',
                duration: '21 days',
                category: 'Fitness' as const,
                totalDays: 21,
            },
            {
                id: '5',
                title: 'Meditation Streak',
                description: '15 minutes of meditation every morning',
                duration: '30 days',
                category: 'Mindfulness' as const,
                totalDays: 30,
            },
            {
                id: '6',
                title: 'No Sugar Challenge',
                description: 'Eliminate added sugars from your diet',
                duration: '14 days',
                category: 'Nutrition' as const,
                totalDays: 14,
            },
        ];

        const statuses = ['not_started', 'in_progress', 'completed'] as const;
        const impacts = [null, 'positive', 'negative'] as const;

        return experiments.map(exp => {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const impact = status === 'completed'
                ? impacts[Math.floor(Math.random() * 2) + 1] // positive or negative
                : null;

            const daysCompleted = status === 'in_progress'
                ? Math.floor(Math.random() * exp.totalDays)
                : status === 'completed'
                    ? exp.totalDays
                    : undefined;

            return {
                ...exp,
                aiPrediction: `+${Math.floor(Math.random() * (550 - 150 + 1)) + 150} pts to Health Score`,
                confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
                status,
                impact,
                daysCompleted,
            };
        });
    },

    // Generate random following users
    getFollowingUsers: () => {
        const names = ['Alex', 'Sam', 'Jordan', 'Casey', 'Morgan', 'Taylor', 'Riley', 'Avery'];
        const count = Math.floor(Math.random() * 3) + 4; // 4-6 users

        return Array.from({ length: count }, (_, i) => ({
            id: `${i + 1}`,
            name: names[i % names.length],
            username: `@${names[i % names.length].toLowerCase()}${Math.floor(Math.random() * 99)}`,
            avatarColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            streak: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
            healthScore: Math.floor(Math.random() * (9500 - 4000 + 1)) + 4000,
            followers: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
            following: Math.floor(Math.random() * (300 - 30 + 1)) + 30,
        }));
    },

    // Generate random factors for health score calculation
    getHealthFactors: () => {
        return [
            { name: 'Sleep Quality', contribution: 25, current: Math.floor(Math.random() * (100 - 70 + 1)) + 70, optimal: '85-100%' },
            { name: 'Resting Heart Rate', contribution: 20, current: Math.floor(Math.random() * (65 - 50 + 1)) + 50, optimal: '50-60 bpm' },
            { name: 'Recovery Time', contribution: 18, current: Math.floor(Math.random() * (100 - 80 + 1)) + 80, optimal: '90-100%' },
            { name: 'HRV (Heart Rate Variability)', contribution: 15, current: Math.floor(Math.random() * (60 - 35 + 1)) + 35, optimal: '40-60 ms' },
            { name: 'Stress Level', contribution: 12, current: Math.floor(Math.random() * (40 - 15 + 1)) + 15, optimal: '<30/100' },
            { name: 'Activity Consistency', contribution: 10, current: Math.floor(Math.random() * (95 - 75 + 1)) + 75, optimal: '>80%' },
        ];
    },
};

export default randomDataService;

