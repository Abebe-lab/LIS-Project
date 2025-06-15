import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));


const LayerVisibilityControl = ({ layers, onToggleVisibility }) => {
    return (
        <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>Layers</Typography>
            <ul>
                {layers.map((layer, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
                        <Typography>{layer.get('title') || 'Layer ' + (index + 1)}</Typography>
                        <Button
                            size="small"
                            onClick={() => onToggleVisibility(layer)}
                            startIcon={layer.getVisible() ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        >
                            {layer.getVisible() ? 'Hide' : 'Show'}
                        </Button>
                    </li>
                ))}
            </ul>
        </StyledPaper>
    );
};

export default LayerVisibilityControl;