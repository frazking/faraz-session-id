const express = require('express');
const app = express();
const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const pino = require("pino");

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>FRAZ-KING-SESSION</title></head>
            <body style="background:#0f0f0f; color:white; text-align:center; font-family:sans-serif; padding:50px;">
                <h1 style="color:#25d366;">FRAZ-KING-MD SESSION</h1>
                <p>Enter number with country code (e.g. 923xxxxxxxxx)</p>
                <input type="text" id="num" placeholder="923..." style="padding:10px; border-radius:5px; border:none;">
                <button onclick="getCode()" style="padding:10px; background:#25d366; color:white; border:none; cursor:pointer; border-radius:5px;">GET CODE</button>
                <div id="result" style="margin-top:20px; font-weight:bold; color:#ffeb3b;"></div>
                <script>
                    async function getCode() {
                        const n = document.getElementById('num').value;
                        if(!n) return alert('Number dalo bhai!');
                        document.getElementById('result').innerText = 'Generating code... Please wait';
                        const res = await fetch('/code?number=' + n);
                        const data = await res.json();
                        document.getElementById('result').innerText = 'YOUR CODE: ' + data.code;
                    }
                </script>
            </body>
        </html>
    `);
});

app.get('/code', async (req, res) => {
    let num = req.query.number;
    const { state } = await useMultiFileAuthState('./session');
    const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) });
    
    if (!sock.authState.creds.registered) {
        let code = await sock.requestPairingCode(num);
        res.json({ code: code });
    }
});

app.listen(3000, () => console.log('Server Live!'));
