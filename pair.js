const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore, Browsers } = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startPairing() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const sock = makeWASocket({
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: Browsers.macOS("Desktop"), 
    });

    if (!sock.authState.creds.registered) {
        console.log("\n\n==========================================");
        console.log("   🔥 FRAZ-KING-MD PRO GENERATOR 🔥");
        console.log("      (International Number Support)");
        console.log("==========================================\n");
        
        let num = await question("Number dalo (Country Code ke sath, maslan: 263775664225): ");
        num = num.replace(/[^0-9]/g, '');
        
        console.log("\n[SYSTEM]: Code mangwa raha hoon... Thora sabar karein...");
        await delay(5000); // Wait for socket stabilization
        
        try {
            let code = await sock.requestPairingCode(num);
            console.log("\n✅ AAPKA CODE: \x1b[32m" + code + "\x1b[0m");
            console.log("\n[!] Ab WhatsApp > Linked Devices mein ja kar ye code dalo.");
        } catch (err) {
            console.log("\n❌ Error: Code nahi mila. Check karen ke number WhatsApp par active hai?");
            process.exit(1);
        }
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log("\n🎉 SUCCESS! WhatsApp Connect ho gaya.");
            console.log("Check your WhatsApp, Session ID wahan bhej di gayi hai.");
            process.exit(0);
        }
        if (connection === 'close') {
            console.log("\n[!] Connection close ho gaya. Dobara try karen.");
        }
    });
}

startPairing();
