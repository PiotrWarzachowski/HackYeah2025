import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const DailyCheckScreen = ({ navigation }: any) => {
    useEffect(() => {
        // Immediately navigate to Journal Customization
        navigation.navigate('JournalCustomize');
    }, [navigation]);

    return <View style={styles.container} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
});

export default DailyCheckScreen;

