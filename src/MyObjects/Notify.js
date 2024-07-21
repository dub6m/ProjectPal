import authorize from './Gmail/GmailAuth.js';
import sendEmail from './Gmail/GmailServices.js';

async function Notify() {
    let auth = await authorize().then().catch(console.error);

    let message = 'TO: nwokikedubem5@gmail.com\n' +
    'Subject: Test Email\n' +
    'Content-Type: text/html; charset=utf-8\n\n' +
    'Hello World!';

    await sendEmail(auth, message).catch(console.error);
}

Notify().catch(console.error);