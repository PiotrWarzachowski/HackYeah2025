import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

interface GarminLogoProps {
    width?: number;
    height?: number;
    color?: string;
}

const GarminLogo: React.FC<GarminLogoProps> = ({ 
    width = 120, 
    height = 40, 
    color = '#fff' 
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 120 40">
            <SvgText
                x="60"
                y="25"
                fontSize="18"
                fontWeight="bold"
                letterSpacing="2"
                fill={color}
                textAnchor="middle"
            >
                GARMIN
            </SvgText>
        </Svg>
    );
};

export default GarminLogo;

