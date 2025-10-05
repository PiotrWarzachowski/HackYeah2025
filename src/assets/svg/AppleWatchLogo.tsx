import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface AppleWatchLogoProps {
    width?: number;
    height?: number;
    color?: string;
}

const AppleWatchLogo: React.FC<AppleWatchLogoProps> = ({ 
    width = 40, 
    height = 40, 
    color = '#fff' 
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 40 40">
            {/* Apple Watch icon shape */}
            <Rect 
                x="10" 
                y="8" 
                width="20" 
                height="24" 
                rx="5" 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
            />
            <Circle cx="20" cy="20" r="6" fill="none" stroke={color} strokeWidth="2" />
        </Svg>
    );
};

export default AppleWatchLogo;

