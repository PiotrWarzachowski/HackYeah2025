// Mock Garmin API Service
// Replace these with your actual API endpoints

export interface GarminUserData {
    userId: string;
    displayName: string;
    email: string;
}

export interface GarminActivityData {
    activityId: string;
    activityName: string;
    startTime: string;
    duration: number; // in seconds
    distance: number; // in meters
    calories: number;
    averageHeartRate?: number;
    steps?: number;
}

export interface GarminHealthData {
    date: string;
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
    heartRate?: {
        resting: number;
        average: number;
        max: number;
    };
    sleep?: {
        totalSleepTime: number; // in minutes
        deepSleep: number;
        lightSleep: number;
        remSleep: number;
    };
}

class GarminApiService {
    private baseUrl = 'https://api.garmin.com'; // Replace with your actual API
    private accessToken: string | null = null;

    /**
     * Authenticate with email and password
     * In production, replace this with your backend API that handles Garmin OAuth
     */
    async loginWithCredentials(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
        try {
            // TODO: Replace this with actual API call to your backend
            // Your backend should:
            // 1. Validate credentials
            // 2. Exchange them for Garmin OAuth tokens
            // 3. Return access token to your app

            // Example real implementation:
            // const response = await fetch(`${this.baseUrl}/auth/garmin/login`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password }),
            // });
            // const data = await response.json();
            // if (data.success) {
            //     this.accessToken = data.token;
            //     return { success: true, token: data.token };
            // }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation (for development only)
            if (email && password) {
                const mockToken = 'garmin_token_' + Date.now();
                this.accessToken = mockToken;

                return {
                    success: true,
                    token: mockToken,
                };
            }

            return {
                success: false,
                error: 'Invalid credentials',
            };
        } catch (error) {
            return {
                success: false,
                error: 'Network error. Please try again.',
            };
        }
    }

    /**
     * Mock OAuth authentication with Garmin
     * In a real implementation, this would redirect to Garmin's OAuth page
     */
    async authenticate(): Promise<{ success: boolean; token?: string }> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful authentication
        const mockToken = 'mock_garmin_token_' + Date.now();
        this.accessToken = mockToken;

        return {
            success: true,
            token: mockToken,
        };
    }

    /**
     * Fetch user profile data from Garmin
     */
    async getUserData(): Promise<GarminUserData> {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Please call authenticate() first.');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return mock data
        return {
            userId: 'mock_user_123',
            displayName: 'John Athlete',
            email: 'john@example.com',
        };
    }

    /**
     * Fetch recent activities from Garmin
     */
    async getActivities(limit: number = 10): Promise<GarminActivityData[]> {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Please call authenticate() first.');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return mock data
        const mockActivities: GarminActivityData[] = [
            {
                activityId: 'act_1',
                activityName: 'Morning Run',
                startTime: new Date(Date.now() - 86400000).toISOString(),
                duration: 2400,
                distance: 5000,
                calories: 350,
                averageHeartRate: 145,
                steps: 6500,
            },
            {
                activityId: 'act_2',
                activityName: 'Cycling',
                startTime: new Date(Date.now() - 172800000).toISOString(),
                duration: 3600,
                distance: 15000,
                calories: 450,
                averageHeartRate: 130,
            },
            {
                activityId: 'act_3',
                activityName: 'Evening Walk',
                startTime: new Date(Date.now() - 259200000).toISOString(),
                duration: 1800,
                distance: 2500,
                calories: 120,
                steps: 3200,
            },
        ];

        return mockActivities.slice(0, limit);
    }

    /**
     * Fetch daily health metrics from Garmin
     */
    async getHealthData(date: string = new Date().toISOString().split('T')[0]): Promise<GarminHealthData> {
        if (!this.accessToken) {
            throw new Error('Not authenticated. Please call authenticate() first.');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return mock data
        return {
            date,
            steps: 8547,
            calories: 2240,
            distance: 6200,
            activeMinutes: 45,
            heartRate: {
                resting: 58,
                average: 72,
                max: 165,
            },
            sleep: {
                totalSleepTime: 450,
                deepSleep: 120,
                lightSleep: 280,
                remSleep: 50,
            },
        };
    }

    /**
     * Clear authentication token
     */
    logout(): void {
        this.accessToken = null;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.accessToken !== null;
    }
}

export const garminApi = new GarminApiService();

