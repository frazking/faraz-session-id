const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'Gifted~lyYSxGjHJXYU',
    OWNER_NUMBER: '263775664225',
    OWNER_NAME: 'FARAZ KING',
    BOT_NAME: 'FRAZ-KING-MD',
    YT_CHANNEL: 'https://youtube.com/@CineOfficial',
    PREFIX: '.',
    MODE: 'public',
};
