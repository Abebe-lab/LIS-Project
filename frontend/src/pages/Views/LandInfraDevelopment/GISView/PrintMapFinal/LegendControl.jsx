import { useState, useEffect, useRef } from "react";
import TileLayer from 'ol/layer/Tile';
import { Box, Typography,Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
//import { getPointResolution } from 'ol/proj';
// Styled Paper (can be moved to a common styles file if needed)
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }));

const LegendControl = ({ map, layers }) => {
    const legendRef = useRef(null);
    const [legendItems, setLegendItems] = useState([]);

    useEffect(() => {
        if (!map) return;

        const updateLegend = () => {
            const items = layers.map(layer => {
                if (!layer.getVisible()) return null;
                const layerTitle = layer.get('title') || 'Layer';
                const layerSource = layer.getSource();

                let color = 'black'; // Default color
                let symbol = 'line'; // Default symbol

                if (layer instanceof TileLayer) {
                    symbol = 'image';
                } else {
                    // Example for Vector layers - Customize as needed based on your layer styles
                    const layerStyle = layer.getStyle();
                    if (layerStyle && layerStyle.getFill) {
                        color = layerStyle.getFill().getColor() || color;
                        symbol = 'polygon';
                    } else if (layerStyle && layerStyle.getStroke) {
                        color = layerStyle.getStroke().getColor() || color;
                        symbol = 'line';
                    } else if (layerStyle && layerStyle.getImage) {
                        color = layerStyle.getImage().getFill ? layerStyle.getImage().getFill().getColor() : color;
                        symbol = 'point';
                    }
                }

                return { title: layerTitle, color, symbol };
            }).filter(item => item !== null);
            setLegendItems(items);
        };

        updateLegend();
        map.getLayers().on('change:visible', updateLegend);

        return () => {
            map.getLayers().un('change:visible', updateLegend);
        };
    }, [map, layers]);


    return (
        <StyledPaper elevation={3} className="ol-legend" ref={legendRef} style={{ position: 'absolute', bottom: '10px', left: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h6" gutterBottom>Legend</Typography>
            {legendItems.length > 0 ? (
                <ul>
                    {legendItems.map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            {item.symbol === 'polygon' && <Box component="span" sx={{ display: 'inline-block', width: '15px', height: '15px', backgroundColor: item.color, border: '1px solid black', marginRight: '8px' }} />}
                            {item.symbol === 'line' && <Box component="span" sx={{ display: 'inline-block', width: '20px', borderBottom: `3px solid ${item.color}`, marginRight: '8px' }} />}
                            {item.symbol === 'point' && <Box component="span" sx={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid black', marginRight: '8px' }} />}
                            {item.symbol === 'image' && <Box component="span" sx={{ display: 'inline-block', width: '15px', height: '15px', backgroundColor: '#eee', border: '1px solid black', marginRight: '8px', textAlign: 'center', lineHeight: '15px' }}> <Typography variant="caption">Tile</Typography></Box>}

                            <Typography>{item.title}</Typography>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography variant="body2">No active layers in legend.</Typography>
            )}
        </StyledPaper>
    );
};

export default LegendControl;