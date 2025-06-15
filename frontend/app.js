const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
