const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>🔥 FRAZ-KING SESSION GENERATOR IS LIVE! 🔥</h1><p>Bhai, 404 khatam ho gaya hai. Ab hum isme logic dalenge.</p>');
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
