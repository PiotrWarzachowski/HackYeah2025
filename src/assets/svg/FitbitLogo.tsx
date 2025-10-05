import React from 'react';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface FitbitLogoProps {
    width?: number;
    height?: number;
    color?: string;
}

const FitbitLogo: React.FC<FitbitLogoProps> = ({ 
    width = 100, 
    height = 40, 
    color = '#fff' 
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 100 40">
            {/* Three dots representing Fitbit logo */}
            <Circle cx="15" cy="20" r="4" fill={color} />
            <Circle cx="28" cy="20" r="4" fill={color} />
            <Circle cx="41" cy="20" r="4" fill={color} />
            
            {/* "fitbit" text */}
            <SvgText
                x="50"
                y="25"
                fontSize="16"
                fontWeight="600"
                fill={color}
            >
                fitbit
            </SvgText>
        </Svg>
    );
};

export default FitbitLogo;

