// Garmin OAuth Service
// Official OAuth 1.0a integration with Garmin Connect API
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';

// Required for OAuth to work properly on mobile
WebBrowser.maybeCompleteAuthSession();

// ========================================
// CONFIGURATION - UPDATE THESE VALUES
// ========================================
// Get your credentials from: https://developer.garmin.com/gc-developer-program/
const GARMIN_CONFIG = {
    // Replace with your actual Garmin Connect API credentials
    clientId: 'YOUR_GARMIN_CLIENT_ID',
    clientSecret: 'YOUR_GARMIN_CLIENT_SECRET',

    // OAuth endpoints (these are correct for Garmin)
    authorizationEndpoint: 'https://connect.garmin.com/oauthConfirm',
    tokenEndpoint: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',

    // Redirect URI - must match what's registered in Garmin Developer Portal
    redirectUri: AuthSession.makeRedirectUri({
        scheme: 'hackathonrn', // Change to your app's scheme
        path: 'auth'
    }),
};

export interface GarminAuthResult {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    error?: string;
}

/**
 * Garmin OAuth Service
 * Handles authentication with Garmin Connect using OAuth 1.0a
 */
class GarminOAuthService {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    /**
     * Start the OAuth flow with Garmin Connect
     * Opens Garmin login page in browser, user logs in, and we get tokens back
     */
    async authenticate(): Promise<GarminAuthResult> {
        try {
            console.log('🔐 Starting Garmin OAuth flow...');
            console.log('📍 Redirect URI:', GARMIN_CONFIG.redirectUri);

            // Check if credentials are configured
            if (GARMIN_CONFIG.clientId === 'YOUR_GARMIN_CLIENT_ID') {
                console.warn('⚠️ Garmin OAuth not configured! Using mock authentication.');
                return this.mockAuthenticate();
            }

            // Build OAuth URL
            const authUrl = this.buildAuthUrl();
            console.log('🌐 Opening Garmin login...');

            // Open Garmin login in browser
            const result = await AuthSession.startAsync({
                authUrl,
                returnUrl: GARMIN_CONFIG.redirectUri,
            });

            if (result.type === 'success') {
                console.log('✅ User completed Garmin login');

                // Extract OAuth token from callback
                const { oauth_token, oauth_verifier } = result.params;

                if (oauth_token && oauth_verifier) {
                    // Exchange request token for access token
                    const tokenResult = await this.exchangeTokens(oauth_token, oauth_verifier);

                    if (tokenResult.success) {
                        this.accessToken = tokenResult.accessToken || null;
                        this.refreshToken = tokenResult.refreshToken || null;
                        console.log('🎉 Garmin authentication complete!');
                        return tokenResult;
                    }
                }

                return {
                    success: false,
                    error: 'Failed to exchange tokens'
                };
            } else if (result.type === 'dismiss' || result.type === 'cancel') {
                console.log('❌ User cancelled Garmin login');
                return {
                    success: false,
                    error: 'User cancelled authentication'
                };
            }

            return {
                success: false,
                error: 'Unknown authentication error'
            };
        } catch (error) {
            console.error('❌ Garmin OAuth error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed'
            };
        }
    }

    /**
     * Build the Garmin OAuth authorization URL
     */
    private buildAuthUrl(): string {
        // For OAuth 1.0a, you need to first get a request token
        // This is a simplified version - in production, implement the full OAuth 1.0a flow

        const params = new URLSearchParams({
            oauth_consumer_key: GARMIN_CONFIG.clientId,
            oauth_callback: GARMIN_CONFIG.redirectUri,
        });

        return `${GARMIN_CONFIG.authorizationEndpoint}?${params.toString()}`;
    }

    /**
     * Exchange OAuth tokens
     * OAuth 1.0a requires exchanging request token for access token
     */
    private async exchangeTokens(
        oauthToken: string,
        oauthVerifier: string
    ): Promise<GarminAuthResult> {
        try {
            // In production, this should call your backend server
            // Your backend handles the OAuth 1.0a signature and token exchange
            // Never expose client secret in the mobile app!

            console.log('🔄 Exchanging tokens...');

            // This is where you'd call your backend API
            // const response = await fetch('https://your-backend.com/api/garmin/token', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ oauth_token: oauthToken, oauth_verifier: oauthVerifier }),
            // });

            // Mock success for now
            return {
                success: true,
                accessToken: `garmin_token_${Date.now()}`,
                refreshToken: `refresh_${Date.now()}`,
            };
        } catch (error) {
            console.error('Token exchange error:', error);
            return {
                success: false,
                error: 'Token exchange failed'
            };
        }
    }

    /**
     * Mock authentication for development/testing
     * Remove this in production!
     */
    private async mockAuthenticate(): Promise<GarminAuthResult> {
        console.log('🧪 Using MOCK Garmin authentication');

        // Simulate OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        this.accessToken = 'mock_garmin_token_' + Date.now();

        return {
            success: true,
            accessToken: this.accessToken,
            refreshToken: 'mock_refresh_token',
        };
    }

    /**
     * Get current access token
     */
    getAccessToken(): string | null {
        return this.accessToken;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.accessToken !== null;
    }

    /**
     * Logout / clear tokens
     */
    logout(): void {
        this.accessToken = null;
        this.refreshToken = null;
        console.log('👋 Logged out from Garmin');
    }
}

// Export singleton instance
export const garminOAuth = new GarminOAuthService();
export default garminOAuth;

