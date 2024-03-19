import { admin } from './app.js';
import { dataBot } from './values.js';
import { getData } from './filter.js';

export const sendInfo = () => {
    admin.on('message', async (msg) => {
        const chatId = msg.chat.id;
        if (msg.text == 'send') {
            try {
                const info = await getData(dataBot.googleSheetId, 'lilia');
                
                // Start the iteration from the second element of the info array
                for (let i = 1; i < info.length; i++) {
                    const row = info[i];
                    const message = row.join('\n');
                    await admin.sendMessage(dataBot.channelId, message);
                }
            } catch (error) {
                console.error("Error fetching data from Google Sheet:", error);
            }
        }
    });
};
