import React from 'react';
import { Typography } from '@mui/material';

const MapTitleDisplay = ({ title }) => {
    return title ? (
        <Typography variant="h4" align="center" style={{ position: 'absolute', top: '10px', left: '0', right: '0', zIndex: 100, pointerEvents: 'none', color: 'black', backgroundColor: 'rgba(255,255,255,0.7)' }}>
            {title}
        </Typography>
    ) : null;
};

export default MapTitleDisplay;