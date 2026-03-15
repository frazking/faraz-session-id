const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>FRAZ-KING SESSION</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: #00ff00; font-family: 'Courier New', monospace; text-align: center; padding: 20px; }
                .box { border: 2px solid #00ff00; padding: 20px; display: inline-block; border-radius: 10px; box-shadow: 0 0 15px #00ff00; }
                input { background: #111; border: 1px solid #00ff00; color: #fff; padding: 10px; margin: 10px; width: 80%; }
                button { background: #00ff00; color: #000; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; }
                #loader { display: none; color: #ffeb3b; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>⚡ FRAZ-KING-MD ⚡</h1>
                <p>OWNER: ALI AHMED</p>
                <hr>
                <p>Enter Number with Country Code</p>
                <input type="text" id="number" placeholder="923001234567">
                <br>
                <button onclick="pair()">GET PAIRING CODE</button>
                <p id="loader">Processing... Please wait 30-60 seconds</p>
                <h2 id="pairCode" style="color:white; letter-spacing: 5px;"></h2>
            </div>
            <script>
                async function pair() {
                    const num = document.getElementById('number').value;
                    if(!num) return alert('Number dalo!');
                    document.getElementById('loader').style.display = 'block';
                    document.getElementById('pairCode').innerText = '';
                    try {
                        const res = await fetch('/code?number=' + num);
                        const data = await res.json();
                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('pairCode').innerText = data.code;
                    } catch (e) {
                        alert('Error! Refresh and try again.');
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/code', async (req, res) => {
    let num = req.query.number;
    const { state, saveCreds } = await useMultiFileAuthState('./temp_session');
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Chrome (Linux)", "", ""]
    });

    if (!sock.authState.creds.registered) {
        await delay(1500);
        const code = await sock.requestPairingCode(num);
        res.json({ code: code });
    }
});

app.listen(PORT, () => console.log('Server started on ' + PORT));
