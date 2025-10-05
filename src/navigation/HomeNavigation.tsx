import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import StatsScreen from '../screens/StatsScreen';
import JournalScreen from '../screens/JournalScreen';
import JournalCustomizeScreen from '../screens/JournalCustomizeScreen';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChartDetailScreen from '../screens/ChartDetailScreen';
import HealthScoreDetailScreen from '../screens/HealthScoreDetailScreen';
import DailyCheckScreen from '../screens/DailyCheckScreen';
import ExperimentsScreen from '../screens/ExperimentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Icons
const StatsIcon = ({ focused }: { focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M3 3v18h18"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M18 9l-5 5-4-4-4 4"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const CheckListIcon = ({ focused }: { focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 11l3 3L22 4"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const ExperimentIcon = ({ focused }: { focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle
            cx="12"
            cy="12"
            r="10"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
        />
        <Path
            d="M12 8v4l3 3"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
        />
    </Svg>
);

const ProfileIcon = ({ focused }: { focused: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle
            cx="12"
            cy="7"
            r="4"
            stroke={focused ? '#7EE3A0' : '#9ca3af'}
            strokeWidth="2"
        />
    </Svg>
);

// Stats Stack Navigator (includes Journal, Search, UserProfile, ChartDetail, HealthScoreDetail)
function StatsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StatsHome" component={StatsScreen} />
            <Stack.Screen
                name="Journal"
                component={JournalScreen}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
            />
            <Stack.Screen
                name="ChartDetail"
                component={ChartDetailScreen}
            />
            <Stack.Screen
                name="HealthScoreDetail"
                component={HealthScoreDetailScreen}
            />
        </Stack.Navigator>
    );
}

// Daily Check Stack Navigator (starts directly with JournalCustomize)
function DailyCheckStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DailyCheckHome" component={JournalCustomizeScreen} />
        </Stack.Navigator>
    );
}

interface HomeNavigationProps {
    onLogout: () => void;
}

export default function HomeNavigation({ onLogout }: HomeNavigationProps) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#7EE3A0',
                tabBarInactiveTintColor: '#9ca3af',
            }}
        >
            <Tab.Screen
                name="Stats"
                component={StatsStack}
                options={{
                    tabBarIcon: ({ focused }) => <StatsIcon focused={focused} />,
                }}
            />
            <Tab.Screen
                name="DailyCheck"
                component={DailyCheckStack}
                options={{
                    tabBarIcon: ({ focused }) => <CheckListIcon focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Experiments"
                component={ExperimentsScreen}
                options={{
                    tabBarIcon: ({ focused }) => <ExperimentIcon focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
                }}
            >
                {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#1a1a1a',
        borderRadius: 24,
        height: 70,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
});

