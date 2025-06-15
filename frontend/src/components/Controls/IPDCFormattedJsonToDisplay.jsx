import { Paper, Typography } from '@mui/material';
function IPDCFormattedJsonToDisplay({ data, height = '220px' }) {
    return (
      <Paper elevation={3} sx={{ overflowY: 'auto', height: height, p: 2 }}>
        {Object.entries(data).map(([key, value]) => (
          <Typography key={key} variant="body1" component="div">
            <strong>{key}:</strong> {value}
          </Typography>
        ))}
      </Paper>
    );
  }
  export default IPDCFormattedJsonToDisplay;