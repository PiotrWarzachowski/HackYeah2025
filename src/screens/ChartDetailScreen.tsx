import React, { useState, useEffect } from 'react';
import randomDataService from '../services/randomDataService';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Polyline, Circle, Line, Text as SvgText, G } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 40;

interface ChartDetailScreenProps {
    route: {
        params: {
            title: string;
            value: string;
            unit: string;
        };
    };
    navigation: any;
}

const ChartDetailScreen: React.FC<ChartDetailScreenProps> = ({ route, navigation }) => {
    const { title, value, unit } = route.params;
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [hourlyData, setHourlyData] = useState<any[]>([]);

    // Load random chart data on mount
    useEffect(() => {
        const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
            '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
        const data = randomDataService.getChartData(title);
        const formatted = data.map((d, i) => ({
            hour: hours[d.time] || `${d.time}:00`,
            value: d.value
        }));
        setHourlyData(formatted);
    }, [title]);

    // Return early if data hasn't loaded yet
    if (hourlyData.length === 0) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={styles.placeholder} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#9ca3af' }}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const maxValue = Math.max(...hourlyData.map(d => d.value));
    const minValue = Math.min(...hourlyData.filter(d => d.value > 0).map(d => d.value));

    // Calculate points for the chart
    const chartHeight = 200;
    const chartPadding = 50;
    const points = hourlyData
        .map((data, index) => {
            if (data.value === 0) return null;
            const x = (index / (hourlyData.length - 1)) * (CHART_WIDTH - chartPadding * 2) + chartPadding;
            const y = chartHeight - ((data.value - minValue) / (maxValue - minValue)) * (chartHeight - 40) - 20;
            return { x, y, ...data, index };
        })
        .filter(p => p !== null);

    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p!.x},${p!.y}`).join(' ');

    const handleChartPress = (index: number) => {
        setSelectedPoint(index);
    };

    const selectedData = selectedPoint !== null && points[selectedPoint]
        ? points[selectedPoint]
        : points.length > 0
            ? points[points.length - 1]
            : null;

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
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Current Value Card */}
                <View style={styles.valueCard}>
                    <Text style={styles.valueLabel}>Current Value</Text>
                    <Text style={styles.valueMain}>{value}</Text>
                    <Text style={styles.valueTime}>As of today</Text>
                </View>

                {/* Chart Section */}
                <View style={styles.chartSection}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartHeaderTag}>24-HOUR TRACKING</Text>
                        <Text style={styles.chartTitle}>Today's Timeline</Text>
                        <Text style={styles.chartSubtitle}>
                            Y-axis shows {title.toLowerCase()} values, X-axis shows time of day
                        </Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <Svg width={CHART_WIDTH} height={chartHeight + 60}>
                            {/* Y-axis grid lines and labels */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                                const yPos = chartHeight - ratio * (chartHeight - 40) - 20;
                                const value = Math.round(minValue + ratio * (maxValue - minValue));
                                return (
                                    <G key={index}>
                                        {/* Grid line */}
                                        <Line
                                            x1={chartPadding}
                                            y1={yPos}
                                            x2={CHART_WIDTH - chartPadding}
                                            y2={yPos}
                                            stroke="#333"
                                            strokeWidth="1"
                                            strokeDasharray={index === 0 ? "0" : "4,4"}
                                        />
                                        {/* Y-axis label */}
                                        <SvgText
                                            x={chartPadding - 8}
                                            y={yPos + 4}
                                            fill="#9ca3af"
                                            fontSize="11"
                                            textAnchor="end"
                                        >
                                            {value}
                                        </SvgText>
                                    </G>
                                );
                            })}

                            {/* Chart path */}
                            <Path
                                d={pathData}
                                fill="none"
                                stroke="#7EE3A0"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Area fill */}
                            <Path
                                d={`${pathData} L${points[points.length - 1]!.x},${chartHeight} L${points[0]!.x},${chartHeight} Z`}
                                fill="#7EE3A0"
                                opacity="0.15"
                            />

                            {/* Data points */}
                            {points.map((point, index) => (
                                <Circle
                                    key={index}
                                    cx={point!.x}
                                    cy={point!.y}
                                    r={selectedPoint === index ? 6 : 4}
                                    fill={selectedPoint === index ? '#7EE3A0' : '#fff'}
                                    stroke="#7EE3A0"
                                    strokeWidth="2"
                                    onPress={() => handleChartPress(index)}
                                />
                            ))}

                            {/* Time labels */}
                            {hourlyData.filter((_, i) => i % 6 === 0).map((data, index) => {
                                const xPos = (hourlyData.indexOf(data) / (hourlyData.length - 1)) * (CHART_WIDTH - chartPadding * 2) + chartPadding;
                                return (
                                    <SvgText
                                        key={index}
                                        x={xPos}
                                        y={chartHeight + 20}
                                        fill="#666"
                                        fontSize="10"
                                        textAnchor="middle"
                                    >
                                        {data.hour}
                                    </SvgText>
                                );
                            })}
                        </Svg>
                    </View>

                    {/* Selected Point Info */}
                    {selectedData && (
                        <View style={styles.selectedInfo}>
                            <Text style={styles.selectedLabel}>Selected Time</Text>
                            <View style={styles.selectedRow}>
                                <Text style={styles.selectedTime}>{selectedData?.hour}</Text>
                                <Text style={styles.selectedValue}>
                                    {selectedData?.value} {unit}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Hourly Breakdown */}
                <View style={styles.breakdownSection}>
                    <Text style={styles.breakdownTitle}>Hourly Breakdown</Text>
                    <View style={styles.breakdownList}>
                        {hourlyData.map((data, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.breakdownItem,
                                    selectedPoint === index && styles.breakdownItemSelected,
                                ]}
                                onPress={() => handleChartPress(index)}
                            >
                                <Text style={styles.breakdownHour}>{data.hour}</Text>
                                <Text style={[
                                    styles.breakdownValue,
                                    data.value === 0 && styles.breakdownValueInactive,
                                ]}>
                                    {data.value === 0 ? '—' : `${data.value} ${unit}`}
                                </Text>
                            </TouchableOpacity>
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
    valueCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    valueLabel: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 10,
    },
    valueMain: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#7EE3A0',
        marginBottom: 8,
    },
    valueTime: {
        fontSize: 12,
        color: '#666',
    },
    chartSection: {
        marginBottom: 30,
    },
    chartHeader: {
        marginBottom: 20,
    },
    chartHeaderTag: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
        marginBottom: 12,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    chartSubtitle: {
        fontSize: 12,
        color: '#9ca3af',
        lineHeight: 18,
    },
    chartContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    selectedInfo: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
    },
    selectedLabel: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 8,
    },
    selectedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedTime: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    selectedValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    breakdownSection: {
        marginBottom: 30,
    },
    breakdownTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    breakdownList: {
        gap: 8,
    },
    breakdownItem: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    breakdownItemSelected: {
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#7EE3A0',
    },
    breakdownHour: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    breakdownValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7EE3A0',
    },
    breakdownValueInactive: {
        color: '#666',
    },
});

export default ChartDetailScreen;

