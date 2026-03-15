const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>FRAZ-KING SESSION</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px; background: #1a1a1a; color: white;">
                <h1>🔥 FRAZ-KING SESSION GENERATOR 🔥</h1>
                <p>Bhai, server bilkul sahi chal raha hai!</p>
                <div style="background: #333; padding: 20px; border-radius: 10px; display: inline-block;">
                    <p>Enter WhatsApp Number:</p>
                    <input type="text" id="number" placeholder="923xxxxxxxxx" style="padding: 10px; border-radius: 5px;">
                    <button onclick="alert('Pairing system loading... Please wait')" style="padding: 10px; background: #25d366; color: white; border: none; border-radius: 5px; cursor: pointer;">Get Pair Code</button>
                </div>
                <p style="margin-top: 20px; color: #888;">Powered by FRAZ-KING-MD</p>
            </body>
        </html>
    `);
});

app.listen(port, () => console.log('Server is running on port ' + port));
